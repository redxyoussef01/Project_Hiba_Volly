import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Level1: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const quizId = 1;
  const tabs = [
    { title: "Système 5-1", id: 0 },
    { title: "Techniques de Base", id: 1 },
    { title: "Exercices d'échauffement", id: 2 },
    { title: "Conseils pédagogiques", id: 3 },
    { title: "Règles et équipement", id: 4 },
    { title: "Quiz", id: 5 }
  ];

  const handleTabClick = (tabId: number) => {
    if (tabId === 5) {
      localStorage.setItem('currentQuizId', quizId.toString());
      navigate(`/test/${quizId}`);
    } else {
      setActiveTab(tabId);
    }
  };

  const images = {
    H1: new URL('../assets/niveau1/H1.PNG', import.meta.url).href,
    H2: new URL('../assets/niveau1/H2.PNG', import.meta.url).href,
    H3: new URL('../assets/niveau1/H3.PNG', import.meta.url).href,
    H4: new URL('../assets/niveau1/H4.PNG', import.meta.url).href,
    H5: new URL('../assets/niveau1/H5.PNG', import.meta.url).href,
    H6: new URL('../assets/niveau1/H6.PNG', import.meta.url).href,
    H7: new URL('../assets/niveau1/H7.PNG', import.meta.url).href,
    H8: new URL('../assets/niveau1/H8.PNG', import.meta.url).href,
    H9: new URL('../assets/niveau1/H9.PNG', import.meta.url).href,
    H10: new URL('../assets/niveau1/H10.PNG', import.meta.url).href,
    H11: new URL('../assets/niveau1/H11.PNG', import.meta.url).href,
    H12: new URL('../assets/niveau1/H12.PNG', import.meta.url).href,
    H13: new URL('../assets/niveau1/H13.PNG', import.meta.url).href,
    H14: new URL('../assets/niveau1/H14.PNG', import.meta.url).href,
    H15: new URL('../assets/niveau1/H15.PNG', import.meta.url).href,
    H16: new URL('../assets/niveau1/H16.PNG', import.meta.url).href,
    H17: new URL('../assets/niveau1/H17.PNG', import.meta.url).href,
    H18: new URL('../assets/niveau1/H18.PNG', import.meta.url).href,
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: "url('/src/assets/background/background1.jpg')",
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
              Niveau 1 - Techniques de Base et Positions
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
                    Le Système 5-1
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Fondamentaux</h3>
                      <div className="space-y-4 text-gray-600 text-lg">
                        <p>
                          Le volleyball est un sport de stratégie et de précision, où chaque joueur a un rôle spécifique qui change dynamiquement avec chaque rotation. 
                          Le système 5-1, avec un passeur pénétrant, est l'un des systèmes de jeu les plus utilisés à haut niveau.
                        </p>
                        <p>
                          Dans un système 5-1, il y a un seul passeur qui orchestre le jeu, peu importe sa position sur le terrain. 
                          Lorsque le passeur est en arrière, il y a quatre attaquants potentiels, d'où le nom 5-1. 
                          Le « passeur pénétrant » signifie que le passeur vient de l'arrière du terrain pour effectuer la passe.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Les Rotations en Réception</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                          { 
                            title: 'Position 1 (P1)', 
                            content: 'Le passeur est au fond à droite. Il doit se préparer à courir vers le filet pour une passe dès que le ballon est servi. Les autres joueurs se positionnent pour la réception, prêts à couvrir les zones de service adverses.',
                            image: images.H1
                          },
                          { 
                            title: 'Position 6 (P6)', 
                            content: 'Le passeur est au milieu du fond du terrain. Il doit être prêt à courir vers le filet pour la passe, tandis que les autres joueurs se positionnent pour la réception.',
                            image: images.H2
                          },
                          { 
                            title: 'Position 5 (P5)', 
                            content: 'Le passeur est au fond à gauche, se préparant à pénétrer pour la passe. Les joueurs de réception couvrent les zones de service.',
                            image: images.H3
                          },
                          { 
                            title: 'Position 4 (P4)', 
                            content: 'Le passeur se trouve devant à gauche. Un joueur de réception se place en arrière pour prendre le service.',
                            image: images.H4
                          },
                          { 
                            title: 'Position 3 (P3)', 
                            content: 'Le passeur est maintenant devant au milieu. Les joueurs s\'ajustent pour permettre au passeur de sortir rapidement de la réception et se préparer à la passe.',
                            image: images.H5
                          },
                          { 
                            title: 'Position 2 (P2)', 
                            content: 'Le passeur est en place. Un attaquant est placé en arrière, prêt à réceptionner le service.',
                            image: images.H6
                          }
                        ].map((position, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="flex-1 min-w-[300px]">
                                <h4 className="font-semibold text-2xl text-gray-700 mb-4">{position.title}</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">{position.content}</p>
                              </div>
                              <div className="w-full lg:w-56 h-56 relative flex-shrink-0 overflow-hidden rounded-lg">
                                <img 
                                  src={position.image} 
                                  alt={`Position ${position.title}`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Les Rotations au Service</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                          { 
                            title: 'P1 (Service du Passeur)', 
                            content: 'Le passeur sert et doit rapidement se repositionner pour défendre ou préparer la transition vers le rôle de passeur après le service.',
                            image: images.H7
                          },
                          { 
                            title: 'P6 (Service du R4 sur passeur)', 
                            content: 'Le R4 sur passeur sert et le passeur doit se préparer à se déplacer vers la droite pour couvrir sa zone de défense.',
                            image: images.H8
                          },
                          { 
                            title: 'P5 (Service du central)', 
                            content: 'Le central sert et va prendre la position à gauche pendant que le passeur prend la position à droite.',
                            image: images.H9
                          },
                          { 
                            title: 'P4 (Service du pointu)', 
                            content: 'L\'attaquant de pointe sert, permettant au passeur de se concentrer sur sa transition vers le filet pour organiser l\'attaque.',
                            image: images.H10
                          },
                          { 
                            title: 'P3 (Service du Second R4)', 
                            content: 'L\'attaquant sert, qui est en position d\'attaque, le passeur doit se préparer à se déplacer pour la passe après le service.',
                            image: images.H11
                          },
                          { 
                            title: 'P2 (Service du second central)', 
                            content: 'L\'attaquant central sert. Le passeur est déjà sur sa position de passe en attente de la réception du retour de service.',
                            image: images.H12
                          }
                        ].map((rotation, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="flex-1 min-w-[300px]">
                                <h4 className="font-semibold text-2xl text-gray-700 mb-4">{rotation.title}</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">{rotation.content}</p>
                              </div>
                              <div className="w-full lg:w-56 h-56 relative flex-shrink-0 overflow-hidden rounded-lg">
                                <img 
                                  src={rotation.image} 
                                  alt={`Service ${rotation.title}`}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Les Positions en Défense : Base 1 et Base 2</h3>
                      <div className="space-y-6 text-gray-600 text-lg mb-8">
                        <p>
                          Le positionnement en défense reste un point clé pour faire vivre le ballon. Nous allons vous montrer de manière théorique le positionnement à avoir 
                          (il faudra l'adapter en fonction du placement de votre contre et de l'attaquant adverse). Dans les exemples qui vont suivre, nous avons la consigne de 
                          « Lâcher la mire » c'est-à-dire de laisser environ 1m entre elle et le premier contreur.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {[
                          { 
                            title: 'Base 1 avec passeur arrière', 
                            content: 'L\'équipe est en position défensive avec une attitude préparatoire de ce que va faire l\'adversaire. Sur cet exemple, nous maintenons la base une sur la passe du passeur adverse et sur la potentielle attaque du central.',
                            image: images.H13
                          },
                          { 
                            title: 'Base 2 avec passeur arrière', 
                            content: 'Dès lors que l\'on perçoit la passe aux ailes, on passe sur la base en fonction de l\'attaque en 2 ou en 4.',
                            images: [images.H14, images.H15]
                          },
                          { 
                            title: 'Base 1 avec passeur avant', 
                            content: 'Même chose, juste les postes qui ont changé de place entre passeur et pointu.',
                            image: images.H16
                          },
                          { 
                            title: 'Base 2 avec passeur avant', 
                            content: 'Même chose, juste changement de ligne.',
                            images: [images.H17, images.H18]
                          }
                        ].map((base, index) => (
                          <div key={index} className="bg-gray-50 p-6 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                            <div className="flex flex-col lg:flex-row gap-6">
                              <div className="flex-1 min-w-[300px]">
                                <h4 className="font-semibold text-2xl text-gray-700 mb-4">{base.title}</h4>
                                <p className="text-gray-600 text-lg leading-relaxed">{base.content}</p>
                              </div>
                              <div className="w-full lg:w-56 flex flex-col gap-4">
                                {base.images ? (
                                  base.images.map((img, imgIndex) => (
                                    <div key={imgIndex} className="h-56 relative flex-shrink-0 overflow-hidden rounded-lg">
                                      <img 
                                        src={img} 
                                        alt={`Position ${base.title} - Vue ${imgIndex + 1}`}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                  ))
                                ) : (
                                  <div className="h-56 relative flex-shrink-0 overflow-hidden rounded-lg">
                                    <img 
                                      src={base.image} 
                                      alt={`Position ${base.title}`}
                                      className="w-full h-full object-contain"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Conclusion</h3>
                      <div className="bg-blue-50 p-8 rounded-lg border border-blue-100">
                        <p className="text-gray-700 text-lg">
                          Le système 5-1 avec un passeur pénétrant demande une grande coordination et une compréhension claire des rôles de chaque joueur. 
                          Chaque position et rotation a ses spécificités, et la maîtrise de ces mouvements est essentielle pour le succès de l'équipe. 
                          En pratiquant ces rotations et en comprenant la stratégie derrière chaque placement, une équipe peut devenir une force redoutable sur le terrain.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Techniques de Base
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéos d'Apprentissage</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Manchette</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/hvBzmY9RpdE"
                              title="Manchette - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Service</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/lEaaaxPJ1cQ"
                              title="Service - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Passe</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/50TUVvPLKr8"
                              title="Passe - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Attaque Simple</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/3aQgfk0VtEA"
                              title="Attaque Simple - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Positions des Joueurs</h3>
                      <div className="space-y-8">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Guide des Positions</h4>
                          <p className="text-gray-600 text-lg mb-4">
                            Pour une explication détaillée des positions des joueurs sur le terrain, consultez le guide complet sur le site de Sisteron Volley.
                          </p>
                          <a 
                            href="https://www.sisteronvolley.fr/les-regles-du-volley/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-lg"
                          >
                            <span className="mr-2">📄</span>
                            Consulter le guide des positions
                          </a>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Vidéo Explicative</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/YaETVFkc4aY"
                              title="Positions des joueurs - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Exercices d'échauffement simples
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { 
                            title: 'Exercices d\'échauffement et étirement', 
                            icon: '📄',
                            path: '/src/assets/niveau1/Exercices Echauffement et Etirement.pdf',
                            filename: 'Exercices Echauffement et Etirement.pdf'
                          },
                          { 
                            title: 'Echauffement moreux', 
                            icon: '📄',
                            path: '/src/assets/niveau1/echauffement-mourenx.pdf',
                            filename: 'echauffement-mourenx.pdf'
                          },
                          { 
                            title: 'Guide Pratique PPG VOLLEY BALL', 
                            icon: '📄',
                            path: '/src/assets/niveau1/Guide Pratique PPG VOLLEY BALL.pdf',
                            filename: 'Guide Pratique PPG VOLLEY BALL.pdf'
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
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéos d'échauffement</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Echauffement à trois : la passe</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/kOpVZiqz2aA"
                              title="Echauffement à trois : la passe - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Echauffement à trois : la manchette</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/yHcpTQa272Q"
                              title="Echauffement à trois : la manchette - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Echauffement à trois : l'attaque</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/kycmCum43WI"
                              title="Echauffement à trois : l'attaque - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700 border-b-2 border-blue-500 pb-2">
                    Conseils pédagogiques pour débuter l'entraînement
                  </h2>
                  <div className="prose max-w-none">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Volley-ball pour débutants</h3>
                        <p className="text-gray-600 mb-4">
                          L'une des premières compétences enseignées au volley-ball pour débutants est la passe, un élément crucial du jeu. 
                          Les exercices de passes au volley-ball pour débutants se concentrent sur l'apprentissage des nouveaux joueurs à bien 
                          réceptionner ou passer le ballon. Ces exercices de passes pour les débutants en volley-ball sont conçus pour être simples mais 
                          efficaces, en mettant l'accent sur la bonne posture, la position des bras et le contact avec le ballon.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Les leçons de volley-ball pour débutants incluent généralement une variété d'exercices de 
                          volley-ball pour les passes des débutants. Ces exercices inculquent l'importance des passes précises et contrôlées, 
                          qui sont essentielles pour préparer les actions. Les exercices de passes au volley-ball pour débutants ne concernent pas 
                          uniquement la technique ; ils enseignent également aux débutants l'importance de la communication et du travail d'équipe sur le terrain.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Pour ceux qui se demandent comment jouer au volley-ball pour débutants, rejoindre des équipes de volley-ball pour débutants 
                          ou participer à des cours de volley-ball pour débutants peut être un excellent départ. Ces environnements offrent souvent un 
                          mélange d'exercices de volley-ball amusants pour débutants et d'entraînements de volley-ball plus structurés. Les exercices 
                          de volley-ball amusants pour débutants sont particulièrement importants car ils rendent le processus d'apprentissage agréable 
                          et moins intimidant.
                        </p>
                        <div className="my-6">
                          <iframe 
                            width="100%" 
                            height="315" 
                            src="https://www.youtube.com/embed/OXpYfqkr2F0" 
                            title="Volleyball for Beginners"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                        <p className="text-gray-600 mb-4">
                          Les exercices de bump au volley-ball pour débutants sont un autre élément clé du volley-ball pour débutants. 
                          Ces exercices aident les débutants à se familiariser avec l'un des gestes les plus fondamentaux du volley-ball : 
                          le bump ou la passe avant-bras. Des exercices de volley-ball faciles pour débutants, comme des exercices simples 
                          de bump, posent les bases pour des compétences plus avancées.
                        </p>
                        <p className="text-gray-600 mb-4">
                          En conclusion, les exercices de volley-ball pour débutants, y compris les exercices de passes pour débutants et 
                          les exercices de passes au volley-ball pour débutants, sont cruciaux pour toute personne débutant dans ce sport. 
                          Ces exercices fournissent une base solide en compétences de base, en règles du jeu et en travail d'équipe. Que ce 
                          soit à travers des exercices de volley-ball amusants pour débutants ou des leçons plus structurées, le volley-ball 
                          pour débutants offre une expérience agréable et enrichissante pour tous les nouveaux joueurs.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Top 3 des exercices de volley-ball pour débutants</h3>
                        <p className="text-gray-600 mb-4">
                          Volleyball a répertorié 3 exercices pour débutants, que vous pouvez réaliser immédiatement. Gardez à l'esprit que 
                          le terme débutants signifie quelque chose de différent pour chacun. Car vous pouvez être débutant en tant qu'enfant, 
                          mais aussi en tant qu'adulte de 30 ans qui va jouer au volley-ball pour la première fois. Astuce : utilisez le filtre 
                          de VolleyballXL dans les exercices et filtrez par âge. Cela vous aide à faire une bonne sélection.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            {
                              title: "Chaos",
                              content: "Une série d'exercices qui commencent par Facile et ont également une variante Moyenne et Difficile. Cela commence par attraper et lancer, puis vous progressez progressivement dans l'exercice."
                            },
                            {
                              title: "Défis",
                              content: "Avec les différents défis, vous pouvez bien maîtriser toutes les techniques de base du volley-ball. Il suffit de rechercher « Power passer » ou « Samurai Setter ». Ce sont de petits défis que les joueurs peuvent faire individuellement pour devenir de meilleurs joueurs de volley-ball."
                            },
                            {
                              title: "Jouer 2×2",
                              content: "Pour ces exercices, vous avez déjà besoin de quelques techniques de base, y compris la passe et la passe haute. Dans ces exercices en 2 contre 2, vous jouez en paire et vous ferez des passes et des passes hautes. Vous pouvez rendre l'exercice plus difficile, mais pour cela, vous devez déterminer vous-même le niveau de vos joueurs."
                            }
                          ].map((exercise, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-semibold text-gray-700 mb-2">{exercise.title}</h4>
                              <p className="text-gray-600">{exercise.content}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Créer un entraînement pour des joueurs de volley débutants</h3>
                        <p className="text-gray-600 mb-4">
                          VolleyballXL vous aide de différentes manières à créer une séance d'entraînement pour des joueurs de volley débutants. 
                          En plus d'une vaste base de données d'exercices de volley-ball et de la possibilité d'ajouter vos propres exercices, 
                          nous proposons plusieurs outils pour vous aider à concevoir votre entraînement.
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                          <li>
                            <strong>Créateur d'entraînement</strong>
                            <p>Avec le créateur d'entraînement, vous pouvez composer votre propre séance. Ajoutez vos exercices préférés ou créez les vôtres.</p>
                          </li>
                          <li>
                            <strong>Entraînements prêts à l'emploi</strong>
                            <p>Nous proposons également des séances d'entraînement prêtes à l'emploi, adaptées aux joueurs de volley débutants. Parcourez notre sélection et commencez votre entraînement dès maintenant.</p>
                          </li>
                          <li>
                            <strong>Générateur d'entraînements</strong>
                            <p>Utilisez le générateur d'entraînement. En fonction de vos préférences et filtres, notre système crée une séance personnalisée pour vous. Parfait pour l'entraînement de volley pour débutants.</p>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Préparer un entraînement de volley-ball pour débutants</h3>
                        <p className="text-gray-600 mb-4">
                          Préparer de volley-ball pour débutants? Sur VolleyballXL, vous trouverez différents exercices simples de volley-ball 
                          pour débutants avec vidéo. Consultez les différents exercices sur notre site web et organisez facilement une séance 
                          d'entraînement de volley-ball pour débutants. Utilisez la fonction de filtrage pour sélectionner le point sur lequel 
                          vous voulez vous entraîner, puis choisissez un exercice. Vous trouverez ici des inspirations pour vos séances d'entraînement 
                          avec les débutants en volley-ball ! Premières expériences de volley-ball pour les plus petits !
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Exercices simples de volley-ball</h3>
                        <p className="text-gray-600 mb-4">
                          Le but de VolleyballXL est de fournir aux entraîneurs des exercices de volley-ball simples et visuels. De cette manière, 
                          nous essayons de faciliter la prise en compte des exercices de volley-ball. Ceci s'applique également aux exercices de 
                          volley-ball pour les jeunes. Pensez à exercices d'échauffement pour le volley-ball, mais aussi des exercices pour 
                          entraîner des techniques et des tactiques spécifiques. Souvent, les entraîneurs ne savent pas par où commencer. 
                          VolleyballXL est une source d'inspiration. Utilisez notre plateforme et organisez facilement votre séance d'entraînement. 
                          Il est très facile d'envisager de nouveaux exercices de volley-ball ! Si vous avez des conseils pour des exercices de 
                          volley-ball pour les débutants ou les minis, faites-le nous savoir et envoyez-nous vos exercices par mail.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Exercices de volley-ball pour débutants</h3>
                        <p className="text-gray-600 mb-4">
                          Le volley-ball est un excellent sport, accessible aux personnes de tous âges et niveaux de forme physique. Cependant, 
                          pour les débutants, il peut être difficile d'apprendre les techniques de base et les règles. Les techniques de base au 
                          volley-ball incluent la passe, la réception et le service. Il est important d'apprendre ces techniques de manière 
                          approfondie et de les pratiquer régulièrement pour construire une base solide. Comprendre les règles du jeu est également 
                          crucial pour commencer une carrière réussie au volley-ball. Découvrez nos exercices de volley-ball pour débutants.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Pour les débutants, il est conseillé d'assister à des séances d'entraînement ou de suivre un cours de volley-ball afin 
                          d'apprendre les techniques et les règles sous la direction d'un entraîneur expérimenté. De plus, les débutants doivent 
                          s'assurer de porter un équipement approprié, comme des vêtements confortables, des chaussures de volley-ball et des 
                          genouillères pour éviter les blessures.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Exercices de base de volley-ball</h3>
                        <p className="text-gray-600 mb-4">
                          Basic d'exercices de volley-ball, sont essentiels pour développer des compétences fondamentales cruciales tant pour 
                          les débutants que pour les joueurs expérimentés. Un exercice fondamental est la séquence « passe-attaque-frappe », 
                          qui permet de perfectionner les compétences de passe, de réception et d'attaque par une pratique répétée. Cet exercice 
                          implique que les joueurs travaillent par paires ou en petits groupes, en pratiquant le flux consistant à recevoir un 
                          service (passe), à préparer le ballon (réception) et à exécuter une attaque (frappe).
                        </p>
                        <p className="text-gray-600 mb-4">
                          Un autre exercice essentiel est le service, où les joueurs se concentrent sur les techniques de service par en dessous 
                          et par au-dessus. Une pratique régulière permet de développer la précision et la puissance, essentielles pour bien 
                          débuter une partie. Les exercices défensifs, y compris la réception en manchette et le bloc, sont également cruciaux. 
                          Ces exercices améliorent le temps de réaction et l'agilité, permettant aux joueurs de contrer efficacement les attaques 
                          adverses.
                        </p>
                        <p className="text-gray-600 mb-4">
                          Pour la cohésion d'équipe, les exercices de pepper sont populaires. Impliquant deux joueurs ou plus, ces exercices 
                          améliorent le contrôle du ballon, la communication et les réflexes rapides. Dans l'ensemble, la pratique régulière de 
                          ces exercices de base permet de construire une base solide, ouvrant la voie à des compétences et des stratégies plus 
                          avancées en volley-ball.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">Entraînement de volley-ball pour débutants</h3>
                        <p className="text-gray-600 mb-4">
                          Avec de l'engagement, de la pratique et de la patience, les débutants peuvent rapidement progresser et améliorer leurs 
                          compétences en volley-ball. La clé du succès est de s'entraîner régulièrement, de maîtriser les techniques et les règles, 
                          et de participer à des tournois et des compétitions pour acquérir de l'expérience.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 4 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Tout ce qu'il faut savoir sur le volleyball
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'FIVB_Coach_Manual_FR 1 FIVB', 
                            icon: '📄',
                            path: '/src/assets/niveau1/FIVB_Coach_Manual_FR 1 FIVB.pdf',
                            filename: 'FIVB_Coach_Manual_FR 1 FIVB.pdf'
                          },
                          { 
                            title: 'Volley ball regles terrain technique', 
                            icon: '📄',
                            path: '/src/assets/niveau1/Volleyball DE A à Z.pdf',
                            filename: 'Volleyball DE A à Z.pdf'
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
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéos explicatives</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Les règles du volley-ball</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/7Mkn7ST1uAI"
                              title="Les règles du volley-ball - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Les fautes de base</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/UfaxywMwpWc"
                              title="Les fautes de base - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Zones, positions et rôles des joueurs</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/YaETVFkc4aY"
                              title="Zones, positions et rôles des joueurs - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">L'équipement de base du joueur</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/KB7Pxx47zqY"
                              title="L'équipement de base du joueur - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Quel ballon choisir au volley-ball ?</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/Xm5eKkMiPDQ"
                              title="Quel ballon choisir au volley-ball ? - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
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

export default Level1; 