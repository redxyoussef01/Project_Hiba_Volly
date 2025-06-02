import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Book, Video, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetails2: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Course data for Level 2
  const course = {
    id: id,
    title: 'Niveau 2 : Perfectionnement Technique',
    description: 'Approfondissez vos compétences techniques et tactiques pour devenir un joueur plus complet.',
    instructor: 'Marie Laurent',
    duration: '6 semaines',
    level: 'Intermédiaire',
    rating: 4.9,
    image: '/src/assets/background/background2.jpg',
    overview: 'Ce cours intermédiaire se concentre sur l\'amélioration des techniques avancées et la compréhension tactique du jeu. Idéal pour les joueurs ayant déjà une base solide.',
    objectives: [
      'Maîtriser les techniques avancées d\'attaque et de défense',
      'Développer une meilleure lecture du jeu',
      'Améliorer la coordination d\'équipe et les schémas tactiques',
      'Perfectionner les techniques de service et de réception',
      'Acquérir des compétences en leadership et communication'
    ],
    requirements: [
      'Avoir complété le niveau 1 ou équivalent',
      'Au moins 6 mois d\'expérience en volley-ball',
      'Bonne condition physique',
      'Engagement à participer aux sessions pratiques',
      'Volonté de développer des compétences de leadership'
    ],
    modules: [
      {
        title: 'Techniques Avancées',
        content: [
          'Attaque en position 4 et 2',
          'Contre avancé et lecture du jeu',
          'Service flottant et service smashé',
          'Réception en zone 6 et 5',
          'Techniques de défense avancées'
        ]
      },
      {
        title: 'Tactiques et Stratégies',
        content: [
          'Systèmes de jeu avancés',
          'Schémas d\'attaque complexes',
          'Stratégies défensives spécialisées',
          'Analyse vidéo et correction technique',
          'Adaptation tactique pendant le match'
        ]
      },
      {
        title: 'Conditionnement Physique',
        content: [
          'Programme d\'entraînement spécifique',
          'Exercices de puissance et d\'explosivité',
          'Travail de la pliométrie',
          'Récupération et prévention des blessures',
          'Nutrition pour la performance'
        ]
      },
      {
        title: 'Leadership et Communication',
        content: [
          'Rôles de capitaine et de leader',
          'Communication efficace sur le terrain',
          'Gestion du stress et de la pression',
          'Motivation d\'équipe',
          'Analyse post-match et feedback'
        ]
      }
    ]
  };

  const handleEnroll = async () => {
    const userId = localStorage.getItem('userId');
    
    if (!userId) {
      // If user is not logged in, redirect to login page
      navigate('/login');
      return;
    }

    try {
      // Call the enrollment endpoint
      await axios.post('http://localhost:3000/enroll', {
        userId: userId,
        quizId: 2
      });

      // If enrollment is successful, navigate to level2
      navigate('/level2');
    } catch (error) {
      console.error('Error enrolling in course:', error);
      // You might want to show an error message to the user here
    }
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
                onClick={handleEnroll}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                S'inscrire
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