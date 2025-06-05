import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Book, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import config from '../config';

interface Enrollment {
  id: number;
  quiz: {
    id: number;
  };
}

const CourseDetails4: React.FC = () => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem('userId');
  const userId = localStorage.getItem('userId');
  const courseId = 4; // Fixed ID for CourseDetails4

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!userId) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get<Enrollment[]>(`${config.apiUrl}/enrollments/${userId}`);
        const enrollments = response.data;
        const isEnrolledInCourse = enrollments.some(
          (enrollment) => enrollment.quiz.id === courseId
        );
        setIsEnrolled(isEnrolledInCourse);
      } catch (error) {
        console.error('Error checking enrollment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkEnrollment();
  }, [userId]);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${config.apiUrl}/enroll`, {
        userId: userId,
        courseId: courseId
      });
      setIsEnrolled(true);
      navigate(`/level${courseId}`);
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  };

  const handleContinue = () => {
    navigate(`/level${courseId}`);
  };

  const getButtonText = () => {
    if (!isLoggedIn) return "S'inscrire";
    if (isEnrolled) return "Continuer";
    return "Enroll";
  };

  const handleButtonClick = () => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (isEnrolled) {
      handleContinue();
    } else {
      handleEnroll();
    }
  };

  // Course data for Level 4
  const course = {
    id: courseId,
    title: 'Niveau 4 : Maîtrise Professionnelle',
    description: 'Atteignez l\'excellence avec des techniques et stratégies de niveau international.',
    instructor: 'Sophie Moreau',
    duration: '12 semaines',
    level: 'Expert',
    rating: 5.0,
    image: '/src/assets/background/background4.jpg',
    overview: 'Ce cours de niveau expert est conçu pour les joueurs aspirant à une carrière professionnelle. Il combine des techniques de pointe, des stratégies avancées et une préparation mentale intensive.',
    objectives: [
      'Maîtriser les techniques de niveau international',
      'Développer une vision tactique exceptionnelle',
      'Perfectionner la préparation physique et mentale',
      'Acquérir des compétences de leadership d\'élite',
      'Préparer les joueurs pour la compétition internationale'
    ],
    requirements: [
      'Maîtrise complète des niveaux 1, 2 et 3',
      'Expérience en compétition de haut niveau',
      'Condition physique d\'élite',
      'Engagement à l\'entraînement intensif',
      'Volonté d\'atteindre un niveau professionnel'
    ],
    modules: [
      {
        title: 'Techniques d\'Élite',
        content: [
          'Attaques de niveau international',
          'Contres et défenses spécialisés',
          'Services tactiques d\'élite',
          'Réception en situation de pression maximale',
          'Techniques défensives de pointe'
        ]
      },
      {
        title: 'Stratégies Internationales',
        content: [
          'Analyse approfondie des équipes internationales',
          'Systèmes de jeu de niveau mondial',
          'Adaptation tactique en temps réel',
          'Gestion des situations de haute pression',
          'Stratégies de fin de match critiques'
        ]
      },
      {
        title: 'Performance d\'Élite',
        content: [
          'Programme d\'entraînement international',
          'Optimisation maximale de la condition physique',
          'Préparation mentale de haut niveau',
          'Récupération et nutrition professionnelles',
          'Prévention des blessures de niveau élite'
        ]
      },
      {
        title: 'Leadership d\'Élite',
        content: [
          'Gestion d\'équipe en compétition internationale',
          'Communication tactique de niveau expert',
          'Analyse vidéo professionnelle avancée',
          'Développement des compétences de capitaine d\'élite',
          'Optimisation de la performance d\'équipe de haut niveau'
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Course Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/courses"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour aux Cours
          </Link>
          
          {/* Course Image */}
          <div className="relative h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
              <p className="mt-2 text-lg text-gray-600">{course.description}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 mr-2 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0">
              <button
                onClick={handleButtonClick}
                disabled={isLoading}
                className={`inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed'
                    : isEnrolled 
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isLoading ? 'Loading...' : getButtonText()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Aperçu</h2>
              <p className="text-gray-600">{course.overview}</p>
            </div>

            {/* Learning Objectives */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Objectifs d'Apprentissage</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {course.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>

            {/* Course Modules */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Modules du Cours</h2>
              <div className="space-y-6">
                {course.modules.map((module, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{module.title}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {module.content.map((item, itemIndex) => (
                        <li key={itemIndex}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Requirements */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Prérequis</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {course.requirements.map((requirement, index) => (
                  <li key={index}>{requirement}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails4; 