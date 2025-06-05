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

const CourseDetails3: React.FC = () => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem('userId');
  const userId = localStorage.getItem('userId');
  const courseId = 3; // Fixed ID for CourseDetails3

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

  // Course data for Level 3
  const course = {
    id: courseId,
    title: 'Niveau 3 : Techniques Avancées',
    description: 'Perfectionnez votre jeu avec des techniques expertes et des stratégies de haut niveau.',
    instructor: 'Pierre Dubois',
    duration: '8 semaines',
    level: 'Avancé',
    rating: 4.9,
    image: '/src/assets/background/background3.jpg',
    overview: 'Ce cours avancé est conçu pour les joueurs expérimentés souhaitant atteindre un niveau professionnel. Il couvre des techniques complexes et des stratégies de jeu sophistiquées.',
    objectives: [
      'Maîtriser les techniques de jeu professionnelles',
      'Développer des stratégies de jeu complexes',
      'Perfectionner la lecture du jeu et l\'anticipation',
      'Améliorer la performance physique de haut niveau',
      'Acquérir des compétences en leadership d\'équipe'
    ],
    requirements: [
      'Maîtrise complète des niveaux 1 et 2',
      'Expérience significative en compétition',
      'Excellente condition physique',
      'Engagement à l\'entraînement intensif',
      'Volonté de développer un jeu professionnel'
    ],
    modules: [
      {
        title: 'Techniques Professionnelles',
        content: [
          'Attaques complexes et variées',
          'Contres spécialisés et timing parfait',
          'Services tactiques avancés',
          'Réception en situation de pression',
          'Techniques défensives expertes'
        ]
      },
      {
        title: 'Stratégies de Compétition',
        content: [
          'Analyse approfondie des adversaires',
          'Systèmes de jeu professionnels',
          'Adaptation tactique en temps réel',
          'Gestion des situations de pression',
          'Stratégies de fin de match'
        ]
      },
      {
        title: 'Performance Physique',
        content: [
          'Programme d\'entraînement professionnel',
          'Optimisation de la condition physique',
          'Préparation mentale et concentration',
          'Récupération et nutrition avancées',
          'Prévention des blessures de haut niveau'
        ]
      },
      {
        title: 'Leadership et Performance',
        content: [
          'Gestion d\'équipe en compétition',
          'Communication tactique avancée',
          'Analyse vidéo professionnelle',
          'Développement des compétences de capitaine',
          'Optimisation de la performance d\'équipe'
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

export default CourseDetails3; 