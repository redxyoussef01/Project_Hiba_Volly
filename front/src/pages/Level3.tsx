import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Level3: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  const tabs = [
    { title: "Outils d'Entraîneur", id: 0 },
    { title: "Lecture du Jeu", id: 1 },
    { title: "Terminologie FIVB", id: 2 },
    { title: "Planification", id: 3 },
    { title: "Quiz", id: 4 }
  ];

  const handleTabClick = (tabId: number) => {
    if (tabId === 4) {
      navigate('/quiz');
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: "url('/src/assets/background/background3.jpg')",
          backgroundSize: '100% 100%',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh'
        }}
      />
      <div className="flex-grow pt-16 relative z-10 w-full">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
              Niveau 3 - Compétition / Avancé
            </h1>

            {/* Tabs Navigation */}
            <div className="flex gap-2 mb-8 border-b border-gray-200 overflow-x-auto pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-56 px-4 py-3 font-medium text-base rounded-t-lg whitespace-nowrap transition-all duration-200 text-center ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg transform -translate-y-1'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md'
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              {activeTab === 0 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Les outils d'un entraîneur du volley-ball
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Outils d\'entraîneur', 
                            icon: '📄',
                            path: '/assets/niveau3/outils_entraineur.PDF',
                            filename: 'outils_entraineur.PDF'
                          }
                        ].map((pdf, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <a 
                              href={pdf.path}
                              download={pdf.filename}
                              className="flex items-center space-x-3 hover:text-blue-600"
                            >
                              <span className="text-2xl">{pdf.icon}</span>
                              <span className="text-lg text-gray-700">{pdf.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Lecture du jeu et adaptation tactique
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Volleyball DE A à Z', 
                            icon: '📄',
                            path: '/assets/niveau3/volleyball_a_z.PDF',
                            filename: 'volleyball_a_z.PDF'
                          }
                        ].map((pdf, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <a 
                              href={pdf.path}
                              download={pdf.filename}
                              className="flex items-center space-x-3 hover:text-blue-600"
                            >
                              <span className="text-2xl">{pdf.icon}</span>
                              <span className="text-lg text-gray-700">{pdf.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéo d'Apprentissage</h3>
                      <div className="aspect-w-16 aspect-h-9 h-[500px]">
                        <iframe 
                          src="https://www.youtube.com/embed/ykUOKEG3Qbo"
                          title="Positions de réception en 5-1, le système P34"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg w-full h-full shadow-lg"
                        ></iframe>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Exercices Tactiques</h3>
                      <div className="space-y-6 text-gray-600 text-lg">
                        <p>
                          Les exercices tactiques se concentrent sur la capacité de l'équipe à prendre des décisions intelligentes 
                          et à travailler ensemble dans des situations dynamiques, semblables à celles d'un match.
                        </p>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Points clés de l'entraînement tactique :</h4>
                          <ul className="list-disc list-inside space-y-2">
                            <li>Positionnement et couverture de l'équipe</li>
                            <li>Transitions entre la défense et l'attaque</li>
                            <li>Prise de décision sous pression</li>
                            <li>Communication et espacement</li>
                            <li>Exécution stratégique de systèmes</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Terminologie du Volley-ball FIVB
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Terminologie du Volley-ball FIVB', 
                            icon: '📄',
                            path: '/assets/niveau3/terminologie_fivb.PDF',
                            filename: 'terminologie_fivb.PDF'
                          }
                        ].map((pdf, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <a 
                              href={pdf.path}
                              download={pdf.filename}
                              className="flex items-center space-x-3 hover:text-blue-600"
                            >
                              <span className="text-2xl">{pdf.icon}</span>
                              <span className="text-lg text-gray-700">{pdf.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Planification d'unité d'entraînement VB
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Planification d\'unité d\'entraînement', 
                            icon: '📄',
                            path: '/assets/niveau3/planification_unite.PDF',
                            filename: 'planification_unite.PDF'
                          },
                          { 
                            title: 'Planifier une saison d\'entraînement et de compétition', 
                            icon: '📄',
                            path: '/assets/niveau3/planification_saison.PDF',
                            filename: 'planification_saison.PDF'
                          },
                          { 
                            title: 'FICHE D\'EVALUATION VOLLEY BALL EN TERMINALE', 
                            icon: '📄',
                            path: '/assets/niveau3/evaluation_terminale.PDF',
                            filename: 'evaluation_terminale.PDF'
                          },
                          { 
                            title: 'Feuille match VB', 
                            icon: '📄',
                            path: '/assets/niveau3/feuille_match.PDF',
                            filename: 'feuille_match.PDF'
                          },
                          { 
                            title: 'Feuilles de match 2', 
                            icon: '📄',
                            path: '/assets/niveau3/feuilles_match2.PDF',
                            filename: 'feuilles_match2.PDF'
                          },
                          { 
                            title: 'Coaches Manual Level 2 FIVB', 
                            icon: '📄',
                            path: '/assets/niveau3/coaches_manual.PDF',
                            filename: 'coaches_manual.PDF'
                          }
                        ].map((pdf, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <a 
                              href={pdf.path}
                              download={pdf.filename}
                              className="flex items-center space-x-3 hover:text-blue-600"
                            >
                              <span className="text-2xl">{pdf.icon}</span>
                              <span className="text-lg text-gray-700">{pdf.title}</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level3; 