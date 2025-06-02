import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Level2: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const navigate = useNavigate();

  const tabs = [
    { title: "Techniques de Service", id: 0 },
    { title: "Planification Saison", id: 1 },
    { title: "Technique et Tactique", id: 2 },
    { title: "Exercices", id: 3 },
    { title: "Quiz", id: 4 }
  ];

  const faqItems = [
    {
      question: "Qu'est-ce qu'un bon service de volley-ball ?",
      answer: "Un bon service de volley-ball est un aspect crucial du jeu, qui exige précision et puissance. Debout derrière la ligne de service, l'objectif est de frapper le ballon au-dessus du filet, en mettant vos adversaires dans une position difficile, de préférence en les empêchant de recevoir le ballon correctement. Cela permet de marquer des points et de garder le contrôle du jeu."
    },
    {
      question: "Quels sont les différents types de service au volley-ball ?",
      answer: "Il existe plusieurs types de service au volley-ball. Le service sauté implique un saut pour plus de puissance, tandis que le service flottant est frappé avec une rotation minimale pour confondre les receveurs. Parmi les autres variantes, on peut citer le service lifté et le service sauté-flottant, chacun ayant des techniques et des objectifs uniques."
    },
    {
      question: "Comment puis-je améliorer ma technique de service au volley-ball ?",
      answer: "Pour améliorer votre technique de service, il est important de travailler votre forme. Il s'agit notamment d'affiner le lancer, l'élan et le suivi de la balle. Il est également essentiel de faire preuve de régularité pour servir de manière fiable."
    },
    {
      question: "Quelles sont les erreurs les plus courantes en matière de service et comment puis-je les éviter ?",
      answer: "Les serveurs peuvent employer diverses stratégies, comme varier le placement, la vitesse et la direction de leurs services. Ils peuvent ainsi déstabiliser leurs adversaires et les mettre sous pression, ce qui les empêche de recevoir et de placer des attaques."
    },
    {
      question: "Qu'est-ce qu'un service sauté au volley-ball ?",
      answer: "Le service sauté est une variante puissante qui consiste à sauter pendant la frappe pour ajouter de la puissance et de la vitesse à la balle. Cela peut augmenter la vitesse de la balle et rendre plus difficile pour les receveurs d'anticiper sa trajectoire."
    },
    {
      question: "Qu'est-ce qu'un service flottant au volley-ball ?",
      answer: "Le service flottant est une technique de service où la balle est frappée avec une rotation minimale, ce qui la rend imprévisible et difficile à recevoir pour les adversaires. L'absence d'effet rend la trajectoire de la balle plus difficile à prévoir, ce qui peut être un avantage pour l'équipe au service. La maîtrise de cette technique exige de la précision et de la régularité."
    }
  ];

  const handleTabClick = (tabId: number) => {
    if (tabId === 4) {
      navigate('/quiz');
    } else {
      setActiveTab(tabId);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-gray-50 relative">
      <div 
        className="fixed inset-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-10"
        style={{ 
          backgroundImage: "url('/src/assets/background/background2.jpg')",
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
              Niveau 2 - Intermédiaire
            </h1>
            <p className="text-xl text-center text-gray-600 mb-8">
              Public cible : Entraîneurs de jeunes compétiteurs ou de loisirs confirmés
            </p>

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
                    Techniques avancées : service flottant, attaque rapide, réception
                  </h2>
                  
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Types de Service</h3>
                      <div className="space-y-6 text-gray-600 text-lg">
                        <p>
                          Au volley-ball, il existe deux types de service. Le service en main et le service en sous-main. 
                          En résumé, le service en main est exécuté au-dessus de la tête et le service en sous-main est 
                          souvent exécuté au niveau des hanches.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Service en sous-main</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Au volley-ball, le service en dessous de la main consiste à frapper le ballon avec la main tendue. 
                          Le ballon est tenu au niveau du ventre et servi à partir de ce point. Le service se fait généralement 
                          avec le poing. Le ballon est tenu à environ un demi-mètre du corps. La balle est légèrement lancée 
                          et vous essayez de la frapper loin de votre main.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Service en revers</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-600 text-lg leading-relaxed">
                          Outre le service en dessous, il existe également un service au-dessus au volley-ball. Il se fait 
                          généralement au-dessus de la tête. Vous lancez le ballon au-dessus de votre tête, à environ un 
                          demi-mètre devant vous. Faites pivoter votre bras de service vers l'arrière, à côté de votre tête. 
                          Le coude est dirigé vers le haut, la main est au niveau de l'oreille.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Service flottant et Drive/Top-Spin</h3>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Float/Flat Serve</h4>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            Lorsque vous servez au volley-ball, vous pouvez frapper le ballon de différentes façons. 
                            Cela peut entraîner un "flottement" où le ballon commence à osciller. Il est alors plus 
                            difficile pour les receveurs de manipuler le ballon.
                          </p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Pourquoi les ballons flottent-ils</h4>
                          <p className="text-gray-600 text-lg leading-relaxed">
                            L'explication réside dans l'écoulement de l'air autour de la balle. Lorsque la vitesse est 
                            inférieure à 15 m/s, le ballon pousse une masse d'air devant lui. À des vitesses plus élevées, 
                            ces masses d'air ne s'écoulent pas uniformément autour du ballon.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéos d'Apprentissage</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Le service smashé puissant et smashé flottant</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/50TUVvPLKr8"
                              title="Service smashé - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Exercice de service : franchir le filet</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/wMPBIi6V9zU"
                              title="Service filet - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Exercice de service : contrôler la précision et la puissance</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/Q3ZZ0av3bWc"
                              title="Service précision - SIKANA Français"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">Exercice de service : jeux de précision</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/DAPCYsfNcsg"
                              title="Service jeux - SIKANA Français"
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
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Questions Fréquentes sur le Service</h3>
                      <div className="space-y-4">
                        {faqItems.map((item, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                              onClick={() => toggleFaq(index)}
                            >
                              <span className="font-medium text-lg text-gray-700">{item.question}</span>
                              <span className="text-gray-500">
                                {openFaq === index ? '−' : '+'}
                              </span>
                            </button>
                            {openFaq === index && (
                              <div className="px-6 py-4 bg-white">
                                <p className="text-gray-600 text-lg">{item.answer}</p>
                              </div>
                            )}
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
                    Planifier une saison d'entraînement et de compétition
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                          { 
                            title: 'Principes fondamentaux de VB', 
                            icon: '📄',
                            path: '/assets/niveau2/principes_fondamentaux.PDF',
                            filename: 'principes_fondamentaux.PDF'
                          },
                          { 
                            title: 'Special Olympics Guide d\'Entraînement VB', 
                            icon: '📄',
                            path: '/assets/niveau2/special_olympics_guide.PDF',
                            filename: 'special_olympics_guide.PDF'
                          },
                          { 
                            title: 'Apprendre à entraîner et organiser une équipe', 
                            icon: '📄',
                            path: '/assets/niveau2/apprendre_entrainer.PDF',
                            filename: 'apprendre_entrainer.PDF'
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
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéo de Planification</h3>
                      <div className="aspect-w-16 aspect-h-9 h-[500px]">
                        <iframe 
                          src="https://www.youtube.com/embed/JfvFlTASkts"
                          title="Planification d'une saison au volley"
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
                    Technique et Tactique
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">PDFs à télécharger</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { 
                            title: 'LES FONDAMENTAUX technique', 
                            icon: '📄',
                            path: '/assets/niveau2/fondamentaux_technique.PDF',
                            filename: 'fondamentaux_technique.PDF'
                          },
                          { 
                            title: 'Tactique pour jouer le volleyball', 
                            icon: '📄',
                            path: '/assets/niveau2/tactique_volleyball.PDF',
                            filename: 'tactique_volleyball.PDF'
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
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Les Bases de la Stratégie en Volley-Ball</h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
                          <li>Positionnement des joueurs : Chaque joueur a un rôle précis et doit se placer en fonction des situations de jeu.</li>
                          <li>Communication : Une bonne coordination entre les coéquipiers est indispensable pour anticiper les actions adverses et ajuster les stratégies.</li>
                          <li>Lecture du jeu : Observer le placement de l'adversaire permet d'adapter son attaque et sa défense.</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Les Systèmes de Jeu en Volley-Ball</h3>
                      <div className="space-y-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Le Système 5-1</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
                            <li>Un seul passeur et cinq attaquants (dont un libéro pour la réception).</li>
                            <li>Offre plus de variété dans les combinaisons offensives.</li>
                            <li>Convient aux équipes ayant un passeur très expérimenté.</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Le Système 4-2</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
                            <li>Deux passeurs alternent leur rôle en fonction de la rotation.</li>
                            <li>Système plus simple pour les équipes en apprentissage.</li>
                            <li>Moins d'options offensives, mais une meilleure stabilité défensive.</li>
                          </ul>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h4 className="font-semibold text-xl text-gray-700 mb-4">Le Système 6-2</h4>
                          <ul className="list-disc list-inside space-y-2 text-gray-600 text-lg">
                            <li>Deux passeurs qui attaquent également en troisième ligne.</li>
                            <li>Offre plus de puissance offensive avec six attaquants en permanence.</li>
                            <li>Nécessite des passeurs polyvalents capables d'attaquer.</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-8">
                  <h2 className="text-3xl font-semibold mb-8 text-gray-700 border-b-2 border-blue-500 pb-3">
                    Exercices de coordination et agilité
                  </h2>
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-semibold mb-6 text-blue-600">Vidéos d'Exercices</h3>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">BEST VOLLEYBALL DRILLS | Agility + Coordination + Speed</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/MXuiRYeWvUA"
                              title="Volleyball Drills - Wicked Volleyball"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="rounded-lg w-full h-full shadow-lg"
                            ></iframe>
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-semibold text-xl text-gray-700">VOLLEYBALL AGILITY + BALL CONTROL DRILLS</h4>
                          <div className="aspect-w-16 aspect-h-9 h-[500px]">
                            <iframe 
                              src="https://www.youtube.com/embed/nnxucgH6FF8"
                              title="Volleyball Agility - Wicked Volleyball"
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

export default Level2; 