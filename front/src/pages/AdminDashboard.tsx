import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Award, 
  FileText, 
  Plus, 
  Edit, 
  Trash2,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Search
} from 'lucide-react';
import axios from 'axios';
import Certificate from '../components/Certificate';
import config from '../config';

interface Student {
  id: string;
  name: string;
  email: string;
  course: string;
  enrollmentDate: string;
  progress: number;
}

interface Certificate {
  id: string;
  studentName: string;
  course: string;
  issueDate: string;
  status: 'issued' | 'pending';
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  makerId: number;
  temps: number;
  note: number;
}

interface Enrollment {
  id: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  quiz: {
    id: number;
    title: string;
    description: string;
  };
}

interface Note {
  id: number;
  note: number;
  certificate: boolean;
  totalQuestions: number;
  passingScore: number;
  hasPassed: boolean;
  percentage: number;
  quiz: {
    id: number;
    title: string;
    description: string;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

interface Question {
  qst: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answeris: number;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('enrollments');
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [selectedQuizId, setSelectedQuizId] = useState<number | null>(null);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ASC' | 'DESC' }>({
    key: 'note',
    direction: 'DESC'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [quizForm, setQuizForm] = useState({
    title: '',
    description: '',
    makerId: 1,
    temps: 30,
    note: 100
  });
  const [questions, setQuestions] = useState<Question[]>([{
    qst: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answeris: 1
  }]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'DESC' ? 'ASC' : 'DESC'
    }));
  };

  const handleIssueCertificate = async (noteId: number) => {
    try {
      await axios.put(`${config.apiUrl}/notes/${noteId}/certificate`);
      // Update the local state
      setNotes(notes.map(note => 
        note.id === noteId ? { ...note, certificate: true } : note
      ));
    } catch (err) {
      console.error('Error issuing certificate:', err);
      setError('Failed to issue certificate');
    }
  };

  const handleDeleteEnrollment = async (enrollmentId: number) => {
    try {
      await axios.delete(`${config.apiUrl}/enrollments/${enrollmentId}`);
      // Remove the deleted enrollment from the state
      setEnrollments(enrollments.filter(enrollment => enrollment.id !== enrollmentId));
    } catch (err) {
      console.error('Error deleting enrollment:', err);
      setError('Failed to delete enrollment');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (activeTab === 'enrollments') {
          const response = await axios.get<Enrollment[]>(`${config.apiUrl}/enrollments`);
          setEnrollments(response.data);
        } else if (activeTab === 'certificates') {
          const response = await axios.get<Note[]>(
            `${config.apiUrl}/listNote?sortBy=${sortConfig.key}&sortOrder=${sortConfig.direction}`
          );
          
          setNotes(response.data);
        } else if (activeTab === 'quizzes') {
          const response = await axios.get<Quiz[]>(`${config.apiUrl}/listQuiz`);
          setQuizzes(response.data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, sortConfig]);

  const filteredNotes = notes.filter(note => {
    const searchString = searchTerm.toLowerCase();
    return (
      note.user.firstName.toLowerCase().includes(searchString) ||
      note.user.lastName.toLowerCase().includes(searchString) ||
      note.quiz.title.toLowerCase().includes(searchString)
    );
  });

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Create the quiz
      const quizResponse = await axios.post<{ quizId: number }>(`${config.apiUrl}/quiz`, quizForm);
      const quizId = quizResponse.data.quizId;

      // Refresh quizzes list
      const updatedQuizzes = await axios.get<Quiz[]>(`${config.apiUrl}/listQuiz`);
      setQuizzes(updatedQuizzes.data);

      // Reset form and close modal
      setQuizForm({
        title: '',
        description: '',
        makerId: 1,
        temps: 30,
        note: 100
      });
      setShowQuizModal(false);

      // Open question modal for the newly created quiz
      setSelectedQuizId(quizId);
      setShowQuestionModal(true);
    } catch (error) {
      console.error('Error creating quiz:', error);
      setError('Failed to create quiz');
    }
  };

  const handleAssignQuestions = (quizId: string) => {
    setSelectedQuizId(parseInt(quizId));
    setShowQuestionModal(true);
  };

  const handleQuestionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuizId) return;

    try {
      // Create and assign questions
      const questionsToSubmit = questions.map(q => ({
        qst: q.qst,
        option1: q.option1,
        option2: q.option2,
        option3: q.option3,
        option4: q.option4,
        answeris: q.answeris -1
      }));

      // Send all questions at once to the quiz
      await axios.put(`${config.apiUrl}/quiz/${selectedQuizId}/questions`, {
        questions: questionsToSubmit
      });

      console.log(questionsToSubmit);
      // Reset form and close modal
      setQuestions([{
        qst: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        answeris: 1
      }]);
      setShowQuestionModal(false);
      setSelectedQuizId(null);

      // Refresh quizzes list
      const updatedQuizzes = await axios.get<Quiz[]>(`${config.apiUrl}/listQuiz`);
      setQuizzes(updatedQuizzes.data);
    } catch (error) {
      console.error('Error assigning questions:', error);
      setError('Failed to assign questions');
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      qst: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answeris: 1
    }]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number) => {
    const newQuestions = [...questions];
    newQuestions[index] = {
      ...newQuestions[index],
      [field]: value
    };
    setQuestions(newQuestions);
  };

  const handleViewCertificate = (note: Note) => {
    setSelectedNote(note);
    setShowCertificate(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`${
                activeTab === 'enrollments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Users className="h-5 w-5 mr-2" />
              Enrollments
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`${
                activeTab === 'certificates'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Award className="h-5 w-5 mr-2" />
              Certificates
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`${
                activeTab === 'quizzes'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <FileText className="h-5 w-5 mr-2" />
              Quizzes
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white rounded-lg shadow">
          {/* Enrollments Section */}
          {activeTab === 'enrollments' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Enrolled Students</h2>
                <div className="flex space-x-4">
                  <input
                    type="text"
                    placeholder="Search students..."
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              {loading ? (
                <div className="text-center py-4">Loading enrollments...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-600">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {enrollments.map((enrollment) => (
                        <tr key={enrollment.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {enrollment.user.firstName} {enrollment.user.lastName}
                                </div>
                                <div className="text-sm text-gray-500">ID: {enrollment.user.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{enrollment.quiz.title}</div>
                            <div className="text-sm text-gray-500">{enrollment.quiz.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => handleDeleteEnrollment(enrollment.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Certificates Section */}
          {activeTab === 'certificates' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Certificates</h2>
                <div className="flex space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-2">Loading certificates...</span>
                </div>
              ) : error ? (
                <div className="text-center py-4 text-red-600">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Student Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quiz
                        </th>
                        <th 
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                          onClick={() => handleSort('note')}
                        >
                          <div className="flex items-center">
                            Score
                            <ArrowUpDown className="ml-1 h-4 w-4" />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredNotes.map((note) => (
                        <tr key={note.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {note.user.firstName} {note.user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">ID: {note.user.id}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{note.quiz.title}</div>
                            <div className="text-sm text-gray-500">{note.quiz.description}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {note.note}/{note.totalQuestions}
                            </div>
                            <div className="text-sm text-gray-500">
                              {note.percentage}% (Pass: {note.passingScore})
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Quizzes Section */}
          {activeTab === 'quizzes' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Quizzes</h2>
                <button
                  onClick={() => setShowQuizModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Create Quiz
                </button>
              </div>
              {loading ? (
                <div className="text-center py-4">Loading quizzes...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-600">{error}</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time (min)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {quizzes.map((quiz) => (
                        <tr key={quiz.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{quiz.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.temps}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{quiz.note}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button 
                              onClick={() => handleAssignQuestions(quiz.id.toString())}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              Assign Questions
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              <Edit className="h-5 w-5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Quiz Creation Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full my-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Quiz</h3>
            <form onSubmit={handleQuizSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Quiz Title</label>
                  <input
                    type="text"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({...quizForm, title: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <input
                    type="text"
                    value={quizForm.description}
                    onChange={(e) => setQuizForm({...quizForm, description: e.target.value})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Time (minutes)</label>
                  <input
                    type="number"
                    value={quizForm.temps}
                    onChange={(e) => setQuizForm({...quizForm, temps: parseInt(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Points</label>
                  <input
                    type="number"
                    value={quizForm.note}
                    onChange={(e) => setQuizForm({...quizForm, note: parseInt(e.target.value)})}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Assignment Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full my-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add Questions to Quiz</h3>
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="text-sm font-medium text-gray-700">Question {index + 1}</h5>
                    {questions.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeQuestion(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Question Text</label>
                      <input
                        type="text"
                        value={question.qst}
                        onChange={(e) => updateQuestion(index, 'qst', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((optionNum) => (
                        <div key={optionNum}>
                          <label className="block text-sm font-medium text-gray-700">
                            Option {optionNum}
                          </label>
                          <input
                            type="text"
                            value={question[`option${optionNum}` as keyof Question] as string}
                            onChange={(e) => updateQuestion(index, `option${optionNum}` as keyof Question, e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Correct Answer</label>
                      <select
                        value={question.answeris}
                        onChange={(e) => updateQuestion(index, 'answeris', parseInt(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value={1}>Option 1</option>
                        <option value={2}>Option 2</option>
                        <option value={3}>Option 3</option>
                        <option value={4}>Option 4</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addQuestion}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Question
              </button>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowQuestionModal(false);
                    setSelectedQuizId(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Questions
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate Modal */}
      {showCertificate && selectedNote && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <Certificate
              quizTitle={selectedNote.quiz.title}
              score={selectedNote.note}
              totalQuestions={selectedNote.totalQuestions}
              userName={`${selectedNote.user.firstName} ${selectedNote.user.lastName}`}
              date={new Date()}
            />
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 