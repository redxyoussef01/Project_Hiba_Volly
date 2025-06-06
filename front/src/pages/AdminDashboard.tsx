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
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
  quiz: Quiz;
  certificate?: boolean;
  totalQuestions: number;
  percentage: number;
  passingScore: number;
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
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord Administrateur</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('enrollments')}
              className={`${
                activeTab === 'enrollments'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Inscriptions
            </button>
            <button
              onClick={() => setActiveTab('certificates')}
              className={`${
                activeTab === 'certificates'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Certificats
            </button>
            <button
              onClick={() => setActiveTab('quizzes')}
              className={`${
                activeTab === 'quizzes'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Quiz
            </button>
          </nav>
        </div>

        {/* Content Sections */}
        <div className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          ) : (
            <>
              {/* Enrollments Tab */}
              {activeTab === 'enrollments' && (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Liste des Inscriptions</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Étudiant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quiz
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {enrollments.map((enrollment) => (
                            <tr key={enrollment.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">
                                  {enrollment.user.firstName} {enrollment.user.lastName}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{enrollment.quiz.title}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleDeleteEnrollment(enrollment.id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Certificates Tab */}
              {activeTab === 'certificates' && (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Gestion des Certificats</h3>
                      <div className="flex items-center space-x-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Rechercher..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <button
                          onClick={() => handleSort('note')}
                          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
                        >
                          <span>Trier par Note</span>
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Étudiant
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Quiz
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Note
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Note Requise
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Statut
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {filteredNotes
                            .filter(note => note.note > note.quiz.note)
                            .map((note) => (
                              <tr key={note.id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {note.user.firstName} {note.user.lastName}
                                  </div>
                                </td>
                                <td className="px-6 py-4">
                                  <div className="text-sm text-gray-900">{note.quiz.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{note.note}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-900">{note.quiz.note}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {note.certificate ? (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                      Délivré
                                    </span>
                                  ) : (
                                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                      En attente
                                    </span>
                                  )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                  <div className="flex justify-end space-x-2">
                                    {note.certificate && (
                                      <button
                                        onClick={() => handleIssueCertificate(note.id)}
                                        className="text-green-600 hover:text-green-900"
                                      >
                                        <CheckCircle className="h-5 w-5" />
                                      </button>
                                    )}
                                   
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Quizzes Tab */}
              {activeTab === 'quizzes' && (
                <div className="bg-white shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Gestion des Quiz</h3>
                      <button
                        onClick={() => setShowQuizModal(true)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        <Plus className="h-5 w-5 mr-2" />
                        Nouveau Quiz
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Titre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Description
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Temps (min)
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Note Requise
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {quizzes.map((quiz) => (
                            <tr key={quiz.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{quiz.title}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">{quiz.description}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{quiz.temps}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{quiz.note}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  onClick={() => handleAssignQuestions(quiz.id.toString())}
                                  className="text-indigo-600 hover:text-indigo-900"
                                >
                                  <Edit className="h-5 w-5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Quiz Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Créer un Nouveau Quiz</h2>
            <form onSubmit={handleQuizSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Titre</label>
                  <input
                    type="text"
                    value={quizForm.title}
                    onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={quizForm.description}
                    onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Temps (minutes)</label>
                  <input
                    type="number"
                    value={quizForm.temps}
                    onChange={(e) => setQuizForm({ ...quizForm, temps: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Note Requise</label>
                  <input
                    type="number"
                    value={quizForm.note}
                    onChange={(e) => setQuizForm({ ...quizForm, note: parseInt(e.target.value) })}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowQuizModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Question Modal */}
{showQuestionModal && (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-lg max-w-4xl w-full p-6">
      <h2 className="text-2xl font-bold mb-4">Ajouter des Questions</h2>
      <form onSubmit={handleQuestionSubmit}>
        {/* ADD THIS SCROLLABLE CONTAINER */}
        <div className="max-h-[70vh] overflow-y-auto pr-4"> {/* Added max-h and overflow-y-auto */}
          {questions.map((question, index) => (
            <div key={index} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Question {index + 1}</h3>
                {index > 0 && (
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
                  <label className="block text-sm font-medium text-gray-700">Question</label>
                  <input
                    type="text"
                    value={question.qst}
                    onChange={(e) => updateQuestion(index, 'qst', e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Réponse Correcte</label>
                  <select
                    value={question.answeris}
                    onChange={(e) => updateQuestion(index, 'answeris', parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
        </div> {/* END OF SCROLLABLE CONTAINER */}
        <div className="flex justify-between items-center mt-6">
          <button
            type="button"
            onClick={addQuestion}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Ajouter une Question
          </button>
          <div className="space-x-3">
            <button
              type="button"
              onClick={() => setShowQuestionModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
)}

// ... (rest of your code)

      {/* Certificate Modal */}
      {showCertificate && selectedNote && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="p-6">
              <Certificate
                quizTitle={selectedNote.quiz.title}
                score={selectedNote.note}
                totalQuestions={selectedNote.totalQuestions}
                userName={`${selectedNote.user.firstName} ${selectedNote.user.lastName}`}
                date={new Date()}
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard; 