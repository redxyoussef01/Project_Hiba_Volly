import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, XCircle, Download } from 'lucide-react';
import Certificate from '../components/Certificate';
import config from '../config';

interface Question {
  id: number;
  qst: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answeris: number;
  quiz: {
    id: number;
  };
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  temps: number;
  note: number;
  questions: Question[];
}

interface ResultState {
  score: number;
  totalQuestions: number;
  passed: boolean;
  timeLeft: number;
  selectedAnswers: number[];
  questions: Question[];
  quizId: number;
  noteId: number;
}

interface NoteResponse {
  id: number;
  message: string;
}

const Result: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [certificateGenerated, setCertificateGenerated] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const state = location.state as ResultState;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        // Get quiz ID from localStorage
        const storedQuizId = state?.quizId;
     
        if (!storedQuizId) {
          setError("No quiz ID found");
          return;
        }

        const response = await axios.get<Quiz>(`${config.apiUrl}/getQuiz/${storedQuizId}`);
        setQuiz(response.data);

       
        
      } catch (err) {
        setError("Failed to load quiz details");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [state]);

  const generateCertificate = async () => {
    try {
      const noteId = state?.noteId;
      if (!noteId) {
        throw new Error("No note ID found");
      }
      
      await axios.put(`${config.apiUrl}/notes/${noteId}/certificate`);
      setCertificateGenerated(true);
    } catch (err) {
      console.error("Error generating certificate:", err);
    }
  };

  const handlePrintCertificate = () => {
    setShowCertificate(true);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!state) {
    return <div className="flex justify-center items-center h-screen">No results found</div>;
  }

  const percentage = (state.score / state.totalQuestions) * 100;
  const passed = state.score >= (quiz?.note || 0);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Result Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
            <div className="flex justify-center mb-4">
              {passed ? (
                <CheckCircle className="h-16 w-16 text-green-500" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <p className="text-xl text-gray-600 mb-2">
              Score: {state.score} out of {state.totalQuestions}
            </p>
            <p className="text-lg text-gray-600 mb-4">
              Percentage: {percentage.toFixed(1)}%
            </p>
            <p className={`text-lg font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
              {passed ? 'Congratulations! You passed!' : 'Sorry, you did not pass.'}
            </p>
            {passed && !certificateGenerated && (
              <button
                onClick={generateCertificate}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate Certificate
              </button>
            )}
            {certificateGenerated && (
              <button
                onClick={handlePrintCertificate}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Certificate
              </button>
            )}
          </div>
        </div>

        {/* Question Review */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Question Review</h2>
          <div className="space-y-6">
            {state.questions.map((question, index) => {
              const selectedAnswer = state.selectedAnswers[index];
              const isCorrect = selectedAnswer === question.answeris;
              const options = [question.option1, question.option2, question.option3, question.option4];

              return (
                <div key={question.id} className="border-b border-gray-200 pb-6 last:border-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Question {index + 1}: {question.qst}
                  </h3>
                  <div className="space-y-2">
                    {options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          optIndex === question.answeris
                            ? 'bg-green-100 border-2 border-green-500'
                            : optIndex === selectedAnswer
                            ? 'bg-red-100 border-2 border-red-500'
                            : 'bg-gray-50'
                        }`}
                      >
                        {option}
                        {optIndex === question.answeris && (
                          <CheckCircle className="inline-block ml-2 h-5 w-5 text-green-500" />
                        )}
                        {optIndex === selectedAnswer && optIndex !== question.answeris && (
                          <XCircle className="inline-block ml-2 h-5 w-5 text-red-500" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              // Clear the stored IDs when returning to home
              localStorage.removeItem('currentQuizId');
              localStorage.removeItem('currentNoteId');
              navigate('/');
            }}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Home
          </button>
        </div>
      </div>

      {/* Certificate */}
      {showCertificate && quiz && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-4xl w-full">
            <Certificate
              quizTitle={quiz.title}
              score={state.score}
              totalQuestions={state.totalQuestions}
              userName={localStorage.getItem('userName') || 'Student Name'}
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

export default Result; 