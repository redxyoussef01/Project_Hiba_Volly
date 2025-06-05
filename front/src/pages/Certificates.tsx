import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Download, Award, Trophy, CheckCircle2 } from 'lucide-react';
import Certificate from '../components/Certificate';
import config from '../config';

interface Note {
  id: number;
  note: number;
  certificate: boolean;
  totalQuestions: number;
  passingScore: number;
  hasPassed: boolean;
  
  quiz: {
    id: number;
    title: string;
    description: string;
    note: number;
  };
  user: {
    id: number;
    firstName: string;
    lastName: string;
  };
}

const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState<Note | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError("User not found");
          return;
        }

        const response = await axios.get<Note[]>(`${config.apiUrl}/notes/user/${userId}`);
        const userCertificates = response.data.filter(
          note => note.certificate && note.note > note.quiz.note
        );
        setCertificates(userCertificates);
      } catch (err) {
        setError("Failed to load certificates");
        console.error("Error fetching certificates:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  const handleViewCertificate = (certificate: Note) => {
    setSelectedCertificate(certificate);
    setShowCertificate(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Certificates</h1>
              <p className="mt-1 text-sm text-gray-500">
                View and download your earned certificates
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-8 w-8 text-indigo-600" />
              <span className="text-lg font-semibold text-gray-900">
                {certificates.length} Certificates
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {certificates.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow">
            <Award className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No certificates yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Complete quizzes to earn certificates
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 line-clamp-2">
                      {cert.quiz.title}
                    </h2>
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {cert.quiz.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Score</span>
                      <span className="text-sm font-semibold text-indigo-600">
                        {cert.note}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">Passing Score</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {cert.passingScore}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleViewCertificate(cert)}
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    View Certificate
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certificate Modal */}
      {showCertificate && selectedCertificate && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full overflow-hidden">
            <div className="p-6">
              <Certificate
                quizTitle={selectedCertificate.quiz.title}
                score={selectedCertificate.note}
                totalQuestions={selectedCertificate.totalQuestions}
                userName={`${selectedCertificate.user.firstName} ${selectedCertificate.user.lastName}`}
                date={new Date()}
              />
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-4">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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

export default Certificates; 