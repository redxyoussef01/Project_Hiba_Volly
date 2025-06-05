import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';
import config from '../config';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({
    type: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const response = await fetch(
        `${config.apiUrl}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'Message envoyé avec succès ! Nous vous répondrons bientôt.'
        });
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Une erreur est survenue. Veuillez réessayer plus tard.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contactez VolleyMentor</h1>
          <p className="mt-4 text-lg text-gray-600">
            Vous avez des questions sur nos cours de volley-ball ? Nous sommes là pour vous aider !
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contactez-nous</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-1 text-gray-600">info@vollymentor.com</p>
                  <p className="text-gray-600">support@vollymentor.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Téléphone</h3>
                  <p className="mt-1 text-gray-600">+33 1 23 45 67 89</p>
                  <p className="text-gray-600">+33 1 98 76 54 32</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Adresse</h3>
                  <p className="mt-1 text-gray-600">
                    Centre d'Entraînement VolleyMentor<br />
                    123 Avenue des Sports<br />
                    Quartier Athlétique<br />
                    75000 Paris, France
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Heures d'Ouverture</h3>
                  <p className="mt-1 text-gray-600">Lundi - Vendredi : 9h00 - 18h00</p>
                  <p className="text-gray-600">Samedi : 10h00 - 16h00</p>
                  <p className="text-gray-600">Dimanche : Fermé</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Envoyez-nous un Message</h2>
            {status.message && (
              <div className={`mb-4 p-4 rounded-md ${
                status.type === 'success' ? 'bg-green-50 text-green-800' :
                status.type === 'error' ? 'bg-red-50 text-red-800' :
                'bg-blue-50 text-blue-800'
              }`}>
                {status.message}
              </div>
            )}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom Complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="jean@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Sujet
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="course-info">Informations sur les Cours</option>
                  <option value="enrollment">Questions d'Inscription</option>
                  <option value="schedule">Horaires et Disponibilités</option>
                  <option value="certification">Processus de Certification</option>
                  <option value="other">Autre</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Comment pouvons-nous vous aider ?"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-5 w-5 mr-2" />
                  {status.type === 'loading' ? 'Envoi en cours...' : 'Envoyer le Message'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-8">Questions Fréquemment Posées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Comment s'inscrire à un cours ?</h3>
              <p className="text-gray-600">
                Vous pouvez vous inscrire à nos cours via notre site web. Parcourez simplement les cours, sélectionnez votre niveau préféré et cliquez sur le bouton "S'inscrire" pour commencer le processus d'inscription.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quel équipement est nécessaire ?</h3>
              <p className="text-gray-600">
                Pour nos cours, vous aurez besoin d'une tenue de sport confortable, de chaussures de volley-ball et d'un ballon. Nous fournissons tout l'équipement nécessaire pendant les séances d'entraînement.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quelle est la durée des cours ?</h3>
              <p className="text-gray-600">
                Nos cours durent généralement 8 semaines, avec des séances deux fois par semaine. Chaque séance dure 2 heures, offrant un entraînement complet et du temps de pratique.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Proposez-vous des cours particuliers ?</h3>
              <p className="text-gray-600">
                Oui, nous proposons des cours particuliers pour les individus ou les petits groupes. Contactez-nous pour discuter de vos besoins spécifiques et des disponibilités.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 