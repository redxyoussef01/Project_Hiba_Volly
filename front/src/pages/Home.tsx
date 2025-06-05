import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Trophy, Users, Clock, Star, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import backgroundImage from '../assets/background/ENTRAINEUR.jpg';
const features = [
  {
    title: 'Niveau 1 : Fondamentaux',
    description: 'Maîtrisez les bases du volleyball, y compris le service, la passe et le positionnement de base.',
    icon: <Trophy className="h-6 w-6 text-blue-600" />,
    link: '/courses/1'
  },
  {
    title: 'Niveau 2 : Intermédiaire',
    description: 'Apprenez les techniques avancées de service, la manchette et les stratégies de coordination d\'équipe.',
    icon: <Users className="h-6 w-6 text-blue-600" />,
    link: '/courses/2'
  },
  {
    title: 'Niveau 3 : Avancé',
    description: 'Maîtrisez les stratégies de jeu complexes, le contre avancé et les techniques de niveau professionnel.',
    icon: <Star className="h-6 w-6 text-blue-600" />,
    link: '/courses/3'
  },
  {
    title: 'Niveau 4 : Élite',
    description: 'Perfectionnez votre jeu avec un entraînement de niveau élite, la préparation aux compétitions et le conditionnement mental.',
    icon: <Trophy className="h-6 w-6 text-blue-600" />,
    link: '/courses/4'
  }
];

const Home: React.FC = () => {
  const { isLoggedIn } = useAuth();
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* First Hero Section */}
      <motion.div 
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        style={{ opacity: 1 }}
        className="relative w-full min-h-[90vh] md:min-h-screen flex items-center bg-blue-600"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt="Volleyball Training"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-900/85 md:from-blue-900/90 md:to-blue-900/70"></div>
        </div>

        {/* Content */}
        <div className="relative w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white space-y-6 md:space-y-8"
              >
                <div className="space-y-4 md:space-y-6">
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                  >
                    Formation Continue des Entraîneurs de volley ball
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-90  leading-relaxed"
                  >
                    Envie de faire évoluer votre carrière d’entraîneur ? Rejoignez  VolleyMentor, la plateforme de formation continue pensée pour les coachs de volley-ball au Maroc. Développez vos compétences, explorez des contenus adaptés à votre niveau et avancez aux côtés d’une communauté passionnée. L’excellence commence ici !
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <button
                    onClick={scrollToHero}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-base sm:text-lg font-medium rounded-md text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
                  >
                    Découvrir nos Programmes
                    <ArrowUp className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                  </button>
                  {!isLoggedIn && (
                    <Link
                      to="/register"
                      className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border-2 border-blue-500 text-base sm:text-lg font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Commencer Maintenant
                      <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </Link>
                  )}
                </motion.div>

                {/* Stats Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-blue-200/20"
                >
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">1000+</div>
                    <div className="text-xs sm:text-sm text-blue-200">Étudiants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">50+</div>
                    <div className="text-xs sm:text-sm text-blue-200">Cours</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">95%</div>
                    <div className="text-xs sm:text-sm text-blue-200">Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                    <div className="text-xs sm:text-sm text-blue-200">Support</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="hidden lg:block relative"
              >
                <div className="relative w-full aspect-square max-w-lg mx-auto">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl transform -rotate-12"></div>
                  <img
                    src={backgroundImage}
                    alt="Volleyball Training"
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Original Hero Section */}
      <motion.div 
        ref={heroRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "25px" }}
        transition={{ duration: 0.8 }}
        className="relative text-white mt-12 md:mt-16 lg:mt-20"
      >
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("/hero-volleyball.jpg")',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
            >
              Maîtrisez le Volleyball avec VolleyMentor
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto"
            >
              Apprenez le volleyball des fondamentaux aux techniques de niveau élite avec nos cours complets
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:space-x-4"
            >
              <Link
                to="/courses"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition-colors"
              >
                Explorer les Cours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white hover:bg-white hover:text-black transition-colors"
                >
                  S'inscrire Maintenant
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px" }}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-16 lg:py-20 mt-12 md:mt-16 lg:mt-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Nos Niveaux de Cours
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Choisissez le niveau parfait pour commencer ou progresser dans votre parcours de volleyball
            </p>
          </motion.div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <Link
                    to={feature.link}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
        className="mt-12 md:mt-16 lg:mt-20 bg-blue-600"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            <span className="block">Prêt à commencer votre parcours de volleyball ?</span>
            <span className="block text-blue-200">Rejoignez VolleyMentor aujourd'hui.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              {!isLoggedIn && (
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
                >
                  Commencer
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home; 