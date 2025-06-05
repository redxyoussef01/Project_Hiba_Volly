import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

const CourseDetails2: React.FC = () => {
  const navigate = useNavigate();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem('userId');
  const userId = localStorage.getItem('userId');
  const courseId = 2; // Fixed ID for CourseDetails2

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

  // Course data for Level 2
  const course = {
    id: courseId,
    title: 'Niveau 2 : Techniques Intermédiaires',
    description: 'Développez vos compétences avec des techniques avancées et des stratégies de jeu.',
    instructor: 'Marie Laurent',
    duration: '6 semaines',
    level: 'Intermédiaire',
    rating: 4.7,
    image: '/src/assets/background/background2.jpg',
    overview: 'Ce cours intermédiaire se concentre sur le perfectionnement des techniques de base et l\'introduction de stratégies plus avancées. Idéal pour les joueurs ayant une bonne maîtrise des fondamentaux.',
    objectives: [
      'Maîtriser les techniques de service avancées',
      'Perfectionner les passes et les touches',
      'Développer des stratégies d\'attaque efficaces',
      'Améliorer la coordination d\'équipe',
      'Comprendre les tactiques de jeu avancées'
    ],
    requirements: [
      'Maîtrise des fondamentaux du volley-ball',
      'Expérience de jeu en équipe',
      'Condition physique intermédiaire',
      'Engagement à la pratique régulière',
      'Volonté d\'apprendre des techniques avancées'
    ],
    modules: [
      {
        title: 'Techniques Avancées',
        content: [
          'Service flottant et service smashé',
          'Passes précises et contrôlées',
          'Touches techniques et variées',
          'Attaques puissantes et placées',
          'Contres efficaces et timing'
        ]
      },
      {
        title: 'Stratégies de Jeu',
        content: [
          'Lecture du jeu adverse',
          'Positionnement tactique',
          'Combinaisons d\'attaque',
          'Systèmes défensifs avancés',
          'Transitions rapides'
        ]
      },
      {
        title: 'Conditionnement Physique',
        content: [
          'Exercices de puissance',
          'Agilité et rapidité',
          'Endurance spécifique',
          'Pliométrie pour le volley-ball',
          'Récupération et prévention'
        ]
      },
      {
        title: 'Analyse de Performance',
        content: [
          'Analyse vidéo des matchs',
          'Statistiques de jeu',
          'Points d\'amélioration',
          'Objectifs personnels',
          'Suivi des progrès'
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

export default CourseDetails2; 