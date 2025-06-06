import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Fondamentaux du Volleyball',
    description: 'Maîtrisez les bases du volleyball, y compris le service, la passe et le positionnement de base.',
    level: 'Niveau 1',
    duration: '4 semaines',
    students: 1200,
    rating: 4.8,
    image: './src/assets/background/background1.jpg',
    tags: ['Débutant', 'Fondamentaux', 'Compétences de base']
  },
  {
    id: 2,
    title: 'Techniques Intermédiaires de Volleyball',
    description: 'Apprenez les techniques de service avancées, la préparation et les stratégies de coordination d\'équipe.',
    level: 'Niveau 2',
    duration: '6 semaines',
    students: 850,
    rating: 4.7,
    image: './src/assets/background/background2.jpg',
    tags: ['Intermédiaire', 'Compétences avancées', 'Jeu d\'équipe']
  },
  {
    id: 3,
    title: 'Stratégie Avancée de Volleyball',
    description: 'Maîtrisez les stratégies de jeu complexes, le contre avancé et les techniques de niveau professionnel.',
    level: 'Niveau 3',
    duration: '8 semaines',
    students: 450,
    rating: 4.9,
    image: './src/assets/background/background3.jpg',
    tags: ['Avancé', 'Stratégie', 'Professionnel']
  },
  {
    id: 4,
    title: 'Maîtrise Élite du Volleyball',
    description: 'Perfectionnez votre jeu avec un entraînement de niveau élite, la préparation à la compétition et la préparation mentale.',
    level: 'Niveau 4',
    duration: '12 semaines',
    students: 200,
    rating: 5.0,
    image: './src/assets/background/background4.jpg',
    tags: ['Élite', 'Compétition', 'Maîtrise']
  }
];


const Courses: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Volleyball Courses</h1>
          <p className="text-xl text-gray-600 mb-12">
            Master the art of volleyball with our comprehensive course levels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
              <div className="relative h-48">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {course.level}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                <p className="text-gray-600 mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {course.rating}
                  </div>
                </div>

                <Link
                  to={`/courses/${course.id}`}
                  className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Inscription
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses; 