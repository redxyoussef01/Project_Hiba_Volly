import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import config from '../config';

interface Question {
  id: number;
  qst: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answeris: number;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  temps: number;
  note: number;
  questions: Question[];
  questionCount: number;
}

interface NoteResponse {
  noteId: number;
  message: string;
}

const Test: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug logs
  console.log("All params:", params);
  console.log("Current location:", location);
  
  const quizId = params.id;
  console.log("Quiz ID from params:", quizId);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        setError("Quiz ID is missing. Please select a quiz first.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get<Quiz>(`${config.apiUrl}/getQuiz/${quizId}`);
        
        if (!response.data) {
          throw new Error("No quiz data received");
        }
        
        setQuiz(response.data);
        setTimeLeft(response.data.temps * 60); // Convert minutes to seconds
        setSelectedAnswers(new Array(response.data.questions.length).fill(-1));
      } catch (err: unknown) {
        console.error("Error fetching quiz:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          const axiosError = err as { response?: { status: number } };
          if (axiosError.response?.status === 404) {
            setError("Quiz not found");
          } else if (axiosError.response?.status === 500) {
            setError("Server error. Please try again later.");
          } else {
            setError("Failed to load quiz. Please try again.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers((prev) => {
      const newAnswers = [...prev];
      newAnswers[currentQuestionIndex] = answerIndex;
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < (quiz?.questions.length || 0) - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    try {
      // Calculate score by comparing selected answers with answeris
      const score = selectedAnswers.reduce((total, answer, index) => {
        const question = quiz.questions[index];
        // Check if the selected answer matches the answeris (correct answer)
        return total + (answer === question.answeris ? 1 : 0);
      }, 0);

     
      const passed = score >= quiz.note;

      // Save the result
      const noteResponse = await axios.post<NoteResponse>(`${config.apiUrl}/createNote`, {
        quizId: quiz.id,
        userId:  localStorage.getItem('userID'), // Replace with actual user ID
        note: score
      });
      console.log(noteResponse.data.noteId);
      // Navigate to results page with all necessary data
      navigate('/result', {
        state: {
          score,
          totalQuestions: quiz.questions.length,
          passed,
          timeLeft,
          selectedAnswers,
          questions: quiz.questions,
          quizId: quiz.id,
          noteId: noteResponse.data.noteId
        }
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setError("Failed to submit quiz. Please try again.");
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!quiz) {
    return <div className="flex justify-center items-center h-screen">Quiz not found</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {quiz.title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </div>
            </div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {currentQuestion.qst}
          </h2>
          <div className="space-y-4">
            {[currentQuestion.option1, currentQuestion.option2, currentQuestion.option3, currentQuestion.option4].map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 ${
                  selectedAnswers[currentQuestionIndex] === index
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          {currentQuestionIndex === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          )}
        </div>

        {/* Progress */}
        <div className="mt-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">
              {selectedAnswers.filter((answer) => answer !== undefined).length}/
              {quiz.questions.length} answered
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (selectedAnswers.filter((answer) => answer !== undefined)
                    .length /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test; 