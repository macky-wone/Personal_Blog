import {
  ExperienceItem,
  ProjectItem,
  SkillGroup,
  EducationItem,
  LanguageItem,
  HobbyItem,
} from '../types';

export const PROFILE_DATA = {
  firstName: 'Macky Mamadou',
  lastName: 'Wone',
  fullName: 'Macky Mamadou Wone',
  title: 'Étudiant Ingénieur — Informatique',
  subtitle: '3e année Cycle Ingénieur · Génie Informatique & Télécommunications (IPSL — UGB)',
  graduationTarget: 'Diplôme d’Ingénieur prévu en 2027',
  phone: '+221 78 613 47 46',
  phoneHref: 'tel:+221786134746',
  email: 'wonemacky@gmail.com',
  location: 'Saint-Louis / Ndioum, Sénégal',
  cvPdfUrl: './CV_Macky_Mamadou_Wone-3.pdf',
  aboutParagraphs: [
    "Étudiant en troisième année du cycle ingénieur en Génie informatique et Télécommunications à l’Institut Polytechnique de Saint-Louis (UGB), avec une expérience en IA appliquée, en réseaux sécurisés et en développement logiciel.",
    "Un intérêt marqué pour la compréhension approfondie des technologies et leur mise en pratique — de la conception de pipelines OCR hybrides Python/Rust aux éditeurs collaboratifs temps réel (CRDT) et architectures réseaux IPsec."
  ],
  pillars: [
    {
      title: 'IA Appliquée & Performance Rust',
      description:
        "Conception de pipelines OCR modulaires (PaddleOCR) couplés à des modules natifs en Rust (PyO3/Maturin) exposés via FastAPI et Streamlit.",
      tags: ['Python', 'Rust', 'PyO3 / Maturin', 'PaddleOCR', 'FastAPI', 'Streamlit'],
      icon: 'cpu',
    },
    {
      title: 'Ingénierie Logicielle & Temps Réel',
      description:
        "Développement d’applications web collaboratives temps réel (React, Node.js, Yjs CRDT, Socket.io) et programmation système bas niveau (compilateur en C, Flex, Bison).",
      tags: ['React', 'TypeScript', 'Node.js', 'Yjs (CRDT)', 'C / Flex / Bison', 'PostgreSQL'],
      icon: 'code',
    },
    {
      title: 'Réseaux & Sécurité des Infrastructures',
      description:
        "Conception et simulation de topologies d’entreprise résilientes : architectures VPN IPsec hub-and-spoke multi-sites et redondance automatique.",
      tags: ['VPN IPsec', 'Hub-and-Spoke', 'Cisco Packet Tracer', 'GNS3', 'Linux & Sécurité'],
      icon: 'shield',
    },
  ],
};

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: 'baamtu-2026',
    role: 'Data Scientist — Stage',
    company: 'Baamtu Technologies',
    location: 'Dakar, Sénégal',
    period: 'Sept. – Nov. 2026',
    duration: '3 mois',
    isLatest: true,
    badgeColor: 'cyan',
    description:
      "Conception et implémentation d'un pipeline OCR modulaire pour l'extraction automatique de données depuis des documents d'identité (CNI Sénégal & Côte d'Ivoire).",
    highlights: [
      "Détection et reconnaissance optique de caractères multi-champs avec PaddleOCR sur les Cartes Nationales d'Identité (Sénégal & Côte d'Ivoire).",
      "Développement d'un module de parsing et validation MRZ haute performance en Rust interfacé avec Python via PyO3 et Maturin.",
      "Exposition du pipeline via une API REST FastAPI et création d'une interface interactive de démonstration et validation sous Streamlit."
    ],
    technologies: ['Python', 'Rust', 'PaddleOCR', 'PyO3 / Maturin', 'FastAPI', 'Streamlit', 'OCR / MRZ'],
  },
  {
    id: 'gtp-2025',
    role: 'Développeur Front-end — Stage',
    company: 'Gaindé Talent Provider (GTP)',
    location: 'Sénégal',
    period: 'Septembre 2025',
    duration: '1 mois',
    badgeColor: 'indigo',
    description:
      "Développement du front-end d'une application de saisie de rapports de mission destinée aux talents en mission et à leurs superviseurs.",
    highlights: [
      "Conception d'interfaces ergonomiques permettant aux talents en mission de renseigner leurs rapports d'activité.",
      "Automatisation de la génération d'exports Excel structurés transmis directement au superviseur pour validation et signature."
    ],
    technologies: ['Front-end Web', 'JavaScript', 'HTML5 / CSS3', 'Automatisation Excel', 'UX / Formulaires'],
  },
  {
    id: 'byfilling-2024',
    role: 'Stage de découverte — Web',
    company: 'Byfilling',
    location: 'Sénégal',
    period: 'Septembre 2024',
    duration: '1 mois',
    badgeColor: 'emerald',
    description:
      "Premier stage en entreprise : initiation aux fondamentaux du développement web et aux méthodes de travail en équipe technique.",
    highlights: [
      "Intégration de pages web responsives et apprentissage des bonnes pratiques HTML, CSS et JavaScript.",
      "Découverte du cycle de vie d'un projet web en environnement professionnel."
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Intégration Web'],
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'netsim-pro',
    title: 'NetSim Pro',
    subtitle: 'Éditeur collaboratif de topologies réseau (Projet Solo)',
    category: 'web',
    categoryLabel: 'Full-Stack & Temps Réel',
    role: 'Concepteur & Développeur Solo',
    year: '2026',
    accentColor: 'cyan',
    visualType: 'netsim',
    shortDescription:
      "Plateforme collaborative inspirée d'Overleaf pour concevoir des topologies réseau (style Packet Tracer/GNS3), édition temps réel et export au format .gns3.",
    fullDescription:
      "NetSim Pro est une plateforme web collaborative inspirée d'Overleaf permettant aux ingénieurs et étudiants de concevoir des topologies réseau (dans l'esprit de Cisco Packet Tracer et GNS3) à plusieurs en temps réel, avec synchronisation sans conflit grâce aux CRDTs (Yjs) et export direct vers le format natif .gns3.",
    architecturePoints: [
      "Synchronisation distribuée en temps réel via Yjs (CRDT) et WebSockets (Socket.io) pour l'édition simultanée de nœuds et liens réseau.",
      "Backend Node.js / Express avec persistance relationnelle PostgreSQL pilotée par l'ORM Prisma.",
      "Moteur de sérialisation générant des fichiers de topologie compatibles avec GNS3 (.gns3)."
    ],
    technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Prisma', 'Yjs (CRDT)'],
  },
  {
    id: 'sgn-compiler',
    title: 'Compilateur SGN',
    subtitle: 'Compilateur complet pour un langage dédié à la gestion de notes',
    category: 'compilation',
    categoryLabel: 'Compilation & Système',
    role: 'Projet en équipe de 3',
    year: '2026',
    accentColor: 'amber',
    visualType: 'sgn-compiler',
    shortDescription:
      "Compilateur complet (lexer, parser, AST, table des symboles) développé en C avec Flex et Bison pour un langage dédié à la gestion de notes.",
    fullDescription:
      "Conception et réalisation d'un compilateur complet en langage C pour un langage spécifique (DSL) dédié à la gestion et au calcul de notes académiques. Le compilateur couvre toute la chaîne frontale et intermédiaire : analyse lexicale, analyse syntaxique, construction de l'Arbre Syntaxique Abstrait (AST) et gestion de la table des symboles.",
    architecturePoints: [
      "Analyseur lexical généré avec Flex pour la tokenisation de la grammaire SGN et la détection d'erreurs lexicales.",
      "Analyseur syntaxique LALR construit avec Bison produisant un Arbre Syntaxique Abstrait (AST) typé en C.",
      "Table des symboles dédiée à la vérification sémantique, la portée des identifiants et l'évaluation des règles de notation."
    ],
    technologies: ['C', 'Flex', 'Bison', 'AST', 'Table des symboles'],
  },
  {
    id: 'vpn-ipsec',
    title: 'VPN IPsec Hub-and-Spoke',
    subtitle: 'Architecture réseau sécurisée multi-sites à haute disponibilité',
    category: 'network',
    categoryLabel: 'Réseaux & Sécurité',
    role: 'Architecture Réseau & Sécurité',
    year: '2026',
    accentColor: 'indigo',
    visualType: 'vpn-ipsec',
    shortDescription:
      "Architecture réseau sécurisée avec 1 site central et 12 sites distants, 72 tunnels IPsec et bascule automatique en cas de panne.",
    fullDescription:
      "Conception et déploiement simulé d'une architecture réseau étendue (WAN) sécurisée en topologie Hub-and-Spoke reliant un siège central à 12 agences distantes. L'infrastructure met en œuvre 72 tunnels VPN IPsec chiffrés ainsi qu'un mécanisme de redondance et de bascule automatique (failover) garantissant la continuité de service.",
    architecturePoints: [
      "Topologie Hub-and-Spoke fédérant 1 site central (Hub) et 12 sites distants (Spokes) interconnectés.",
      "Déploiement et vérification de 72 tunnels IPsec assurant confidentialité, intégrité et authentification des flux inter-sites.",
      "Mise en place de la haute disponibilité avec routage dynamique et bascule automatique en cas de défaillance d'un lien."
    ],
    technologies: ['Cisco Packet Tracer', 'VPN IPsec', 'Hub-and-Spoke', 'Failover / Redondance', 'Sécurité Réseau'],
  },
  {
    id: 'ocr-cni-pipeline',
    title: 'Pipeline OCR & MRZ (Python / Rust)',
    subtitle: "Extraction automatique de documents d'identité (CNI Sénégal & Côte d'Ivoire)",
    category: 'ai-rust',
    categoryLabel: 'IA Appliquée & Rust',
    role: 'Stage Data Scientist @ Baamtu Technologies',
    year: '2026',
    accentColor: 'emerald',
    visualType: 'ocr-pipeline',
    shortDescription:
      "Pipeline OCR modulaire combinant PaddleOCR, parsing MRZ natif en Rust (PyO3/Maturin), API FastAPI et interface Streamlit.",
    fullDescription:
      "Architecture industrielle développée lors du stage chez Baamtu Technologies à Dakar pour automatiser la lecture et la vérification de Cartes Nationales d'Identité (CNI du Sénégal et de la Côte d'Ivoire). Le système allie la richesse de l'écosystème deep learning Python (PaddleOCR) à la sûreté et la rapidité de Rust pour le parsing critique des bandes MRZ.",
    architecturePoints: [
      "Pipeline de vision par ordinateur et OCR avec PaddleOCR adapté aux formats de CNI sénégalaises et ivoiriennes.",
      "Binding natif Rust-vers-Python compilé avec PyO3 et Maturin pour accélérer et fiabiliser le décodage des lignes MRZ.",
      "Microservice REST avec FastAPI et tableau de bord d'inspection visuelle avec Streamlit."
    ],
    technologies: ['Python', 'Rust', 'PaddleOCR', 'PyO3', 'Maturin', 'FastAPI', 'Streamlit'],
  },
];

export const SKILLS_DATA: SkillGroup[] = [
  {
    id: 'python-rust',
    name: 'Python & Rust',
    badge: 'Py/Rs',
    level: 78,
    summary: 'IA appliquée, vision par ordinateur (OCR), extensions natives PyO3/Maturin et APIs.',
    tags: ['Python', 'Rust', 'PyO3 / Maturin', 'PaddleOCR', 'FastAPI', 'Streamlit'],
  },
  {
    id: 'git-linux',
    name: 'Git & Linux',
    badge: 'Linux',
    level: 75,
    summary: 'Environnement système GNU/Linux, gestion de versions Git, scripts et outils CLI.',
    tags: ['Linux', 'Git', 'Bash / Shell', 'Environnement Dev'],
  },
  {
    id: 'network-security',
    name: 'Réseaux & sécurité',
    badge: 'Sec',
    level: 75,
    summary: 'Architectures VPN IPsec, topologies Hub-and-Spoke, routage, haute disponibilité.',
    tags: ['VPN IPsec', 'Cisco Packet Tracer', 'GNS3', 'Topologies WAN', 'Failover'],
  },
  {
    id: 'c-sql',
    name: 'C & SQL',
    badge: 'C/SQL',
    level: 70,
    summary: 'Programmation système, compilation (Flex/Bison, AST) et bases de données relationnelles.',
    tags: ['Langage C', 'Flex & Bison', 'PostgreSQL', 'SQL', 'Prisma ORM'],
  },
  {
    id: 'web-js',
    name: 'HTML / CSS / JS & Full-Stack',
    badge: 'Web',
    level: 72,
    summary: 'Applications web modernes, édition collaborative temps réel et architectures REST/WebSocket.',
    tags: ['React', 'TypeScript', 'JavaScript', 'Node.js / Express', 'Socket.io', 'Yjs (CRDT)'],
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'ipsl-ing',
    institution: 'IPSL — Université Gaston Berger (UGB)',
    degree: 'Cycle Ingénieur, Génie Informatique et Télécom',
    details: '3e année du cycle ingénieur · Diplôme prévu en 2027',
    period: '2024 – Présent',
    current: true,
  },
  {
    id: 'ipsl-prepa',
    institution: 'Institut Polytechnique de Saint-Louis (IPSL)',
    degree: 'Classes préparatoires scientifiques',
    details: 'Mathématiques, Physique et Sciences de l’Ingénieur',
    period: '2022 – 2024',
  },
  {
    id: 'lycee-ndioum',
    institution: 'Lycée de Ndioum',
    degree: 'Baccalauréat Série S2',
    details: 'Mention Assez Bien (AB)',
    period: '2021 – 2022',
  },
];

export const LANGUAGES_DATA: LanguageItem[] = [
  { name: 'Français', dots: 4, levelLabel: 'Courant / Bilingue' },
  { name: 'Peulh', dots: 4, levelLabel: 'Langue maternelle' },
  { name: 'Wolof', dots: 3, levelLabel: 'Courant' },
  { name: 'Anglais', dots: 2, levelLabel: 'Intermédiaire technique' },
];

export const HOBBIES_DATA: HobbyItem[] = [
  {
    name: 'Lecture',
    icon: 'book',
    description: 'Ouvrages techniques, sciences et littérature.',
  },
  {
    name: 'Voyage',
    icon: 'plane',
    description: 'Découverte de nouveaux horizons et cultures.',
  },
  {
    name: 'Football',
    icon: 'football',
    description: 'Esprit d’équipe, compétition et endurance.',
  },
  {
    name: 'Musique',
    icon: 'music',
    description: 'Écoute quotidienne et inspiration créative.',
  },
];

