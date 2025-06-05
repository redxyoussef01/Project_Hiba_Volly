import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Level4: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const quizId = 4;
  const tabs = [
    { title: "Entraîneurs de haut niveau", id: 0 },
    { title: "Gestion de groupe", id: 1 },
    { title: "Pathologies", id: 2 },
    { title: "Préparation saison", id: 3 },
    { title: "Programme  entrainement", id: 5 },
    { title: "Quiz", id: 4 }
  ];

  const handleTabClick = (tabId: number) => {
    if (tabId === 4) {
      localStorage.setItem('currentQuizId', quizId.toString());
      navigate(`/test/${quizId}`);
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: "url('/src/assets/background/background4.jpg')",
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
              Niveau 4 - Entraîneurs de haut niveau
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
                    Tout ce qu'il faut savoir sur l'Entraîneur de haut niveau
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Manuel Canada Niveau 4', 
                            icon: '📄',
                            path: '/src/assets/niveau4/manuel_canada_niv4.pdf',
                            filename: 'manuel_canada_niv4.pdf'
                          },
                          { 
                            title: 'Manuel des Opérations et Trousse d\'Évaluation', 
                            icon: '📄',
                            path: '/src/assets/niveau4/MANUEL DES OPERATIONS ET TROUSSE DEVALUATION.pdf',
                            filename: 'MANUEL DES OPERATIONS ET TROUSSE DEVALUATION.pdf'
                          },
                          { 
                            title: 'Outils Entraineurs Dossier FAVB', 
                            icon: '📄',
                            path: '/src/assets/niveau4/OUTILS ENTRAINEURS Dossier FAVB.pdf',
                            filename: 'OUTILS ENTRAINEURS Dossier FAVB.pdf'
                          },
                          { 
                            title: 'La Préparation Physique', 
                            icon: '📄',
                            path: '/src/assets/niveau4/la preparation physique.pdf',
                            filename: 'la preparation physique.pdf'
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
                    Gestion de groupe et leadership
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Leadership et gestion d\'équipe en milieu sportif', 
                            icon: '📄',
                            path: '/src/assets/niveau4/Leadership et gestion dequipe au milieu sportif.pdf',
                            filename: 'Leadership et gestion dequipe au milieu sportif.pdf'
                          },
                          { 
                            title: 'Le leadership 2', 
                            icon: '📄',
                            path: '/src/assets/niveau4/Le leadership 2.pdf',
                            filename: 'Le leadership 2.pdf'
                          },
                          { 
                            title: 'Fiche outil Cohésion de groupe', 
                            icon: '📄',
                            path: '/src/assets/niveau4/Fiche outil Cohésion de groupe.pdf',
                            filename: 'Fiche outil Cohésion de groupe.pdf'
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
                          src="https://www.youtube.com/embed/TGKC7AqXzls"
                          title="Comment bien diriger une équipe - Les 4 Outils du Bon Manager"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="rounded-lg w-full h-full shadow-lg"
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Pathologies du volleyeur et conseils à l'officine
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Pathologies du volleyeur et conseils à l\'officine', 
                            icon: '📄',
                            path: '/src/assets/niveau4/Pathologies du volleyeur et conseils a lofficine.pdf',
                            filename: 'Pathologies du volleyeur et conseils a lofficine.pdf'
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
                    Se préparer pour bien démarrer la saison
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Cahier de l\'entraîneur', 
                            icon: '📄',
                            path: '/src/assets/niveau4/CAHIER DE L\'ENTRAINEUR.pdf',
                            filename: 'CAHIER DE L\'ENTRAINEUR.pdf'
                          },
                          { 
                            title: 'Exercices VB', 
                            icon: '📄',
                            path: '/src/assets/niveau4/exercices vb.pdf',
                            filename: 'exercices vb.pdf'
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


               {activeTab === 5 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Se préparer pour bien démarrer la saison
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'Opération Reprise semaine 1', 
                            icon: '📄',
                            path: '/src/assets/niveau4/Operation Reprise s1.pdf',
                            filename: 'Operation Reprise s1.pdf'
                          },
                          { 
                            title: 'Opération Reprise semaine 2', 
                            icon: '📄',
                            path: '/src/assets/niveau4/ops2.pdf',
                            filename: 'ops2.pdf'
                          },
                          { 
                            title: 'Opération Reprise semaine 3', 
                            icon: '📄',
                            path: '/src/assets/niveau4/ops3.pdf',
                            filename: 'ops3.pdf'
                          },
                          { 
                            title: 'Exercices Opération Reprise semaine 4', 
                            icon: '📄',
                            path: '/src/assets/niveau4/ops4.pdf',
                            filename: 'ops2.pdf'
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

export default Level4; 