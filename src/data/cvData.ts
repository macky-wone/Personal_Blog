import {
  EducationItem,
  ExperienceItem,
  HobbyItem,
  Language,
  LanguageItem,
  ProjectCategory,
  ProjectItem,
  SectionId,
  SkillGroup,
} from '../types';

export interface ProfilePillar {
  title: string;
  description: string;
  tags: string[];
  icon: 'cpu' | 'code' | 'shield';
}

export interface ProfileData {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  subtitle: string;
  graduationTarget: string;
  phone: string;
  phoneHref: string;
  email: string;
  location: string;
  cvPdfUrl: string;
  aboutParagraphs: string[];
  pillars: ProfilePillar[];
}

export interface PortfolioUi {
  pageTitle: string;
  navAriaLabel: string;
  footerNavAriaLabel: string;
  sections: Record<SectionId, string>;
  categories: Record<ProjectCategory, string>;
  header: {
    contactCta: string;
    switchToSlides: string;
    switchToScroll: string;
    slidesTitle: string;
    scrollTitle: string;
    switchToLight: string;
    switchToDark: string;
    lightTitle: string;
    darkTitle: string;
    menuAriaLabel: string;
    langSwitchAria: string;
    langSwitchTitle: string;
  };
  hero: {
    availableBadge: string;
    greeting: string;
    lead: string;
    viewProjects: string;
    myCv: string;
    scrollHint: string;
    quickEmail: string;
    quickPhone: string;
    quickViewCv: string;
    quickDownloadCv: string;
    stats: {
      value: string;
      label: string;
      icon: 'cap' | 'briefcase' | 'layers' | 'globe';
    }[];
    code: {
      structName: string;
      schoolKey: string;
      schoolVal: string;
      promoKey: string;
      stackKey: string;
      focusKey: string;
      focusVal: string;
    };
  };
  about: {
    title: string;
    portraitAlt: string;
    facts: {
      label: string;
      value: string;
    }[];
  };
  skills: {
    eyebrow: string;
    title: string;
    levels: {
      advanced: string;
      proficient: string;
      intermediate: string;
    };
  };
  resume: {
    experienceTitle: string;
    educationTitle: string;
    languagesTitle: string;
    whatIDoTitle: string;
    hobbiesTitle: string;
    fullCvBtn: string;
    languageMeterAria: (name: string, level: string) => string;
  };
  projects: {
    eyebrow: string;
    title: string;
    filterAriaLabel: string;
    cardAriaLabel: (title: string) => string;
  };
  contact: {
    ctaLine1: string;
    ctaLine2: string;
    ctaTextPrefix: string;
    ctaTextStrong: string;
    ctaTextSuffix: string;
    ctaButton: string;
    emailSubject: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    copy: string;
    copied: string;
  };
  footer: {
    rights: string;
    backToTop: string;
  };
  projectModal: {
    closeAria: string;
    stackTitle: string;
    architectureTitle: string;
  };
  cvModal: {
    titlePrefix: string;
    downloadPdf: string;
    closeAria: string;
    iframeTitle: (name: string) => string;
  };
}

export interface PortfolioContent {
  profile: ProfileData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  skills: SkillGroup[];
  education: EducationItem[];
  languages: LanguageItem[];
  hobbies: HobbyItem[];
  ui: PortfolioUi;
}

const FR_CONTENT: PortfolioContent = {
  profile: {
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
      "Un intérêt marqué pour la compréhension approfondie des technologies et leur mise en pratique — de la conception de pipelines OCR hybrides Python/Rust aux éditeurs collaboratifs temps réel (CRDT) et architectures réseaux IPsec.",
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
  },
  experiences: [
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
        "Exposition du pipeline via une API REST FastAPI et création d'une interface interactive de démonstration et validation sous Streamlit.",
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
        "Automatisation de la génération d'exports Excel structurés transmis directement au superviseur pour validation et signature.",
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
        "Découverte du cycle de vie d'un projet web en environnement professionnel.",
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Intégration Web'],
    },
  ],
  projects: [
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
        "Moteur de sérialisation générant des fichiers de topologie compatibles avec GNS3 (.gns3).",
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
        "Table des symboles dédiée à la vérification sémantique, la portée des identifiants et l'évaluation des règles de notation.",
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
        "Mise en place de la haute disponibilité avec routage dynamique et bascule automatique en cas de défaillance d'un lien.",
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
        "Microservice REST avec FastAPI et tableau de bord d'inspection visuelle avec Streamlit.",
      ],
      technologies: ['Python', 'Rust', 'PaddleOCR', 'PyO3', 'Maturin', 'FastAPI', 'Streamlit'],
    },
  ],
  skills: [
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
  ],
  education: [
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
  ],
  languages: [
    { name: 'Français', dots: 4, levelLabel: 'Courant / Bilingue' },
    { name: 'Peulh', dots: 4, levelLabel: 'Langue maternelle' },
    { name: 'Wolof', dots: 3, levelLabel: 'Courant' },
    { name: 'Anglais', dots: 2, levelLabel: 'Intermédiaire technique' },
  ],
  hobbies: [
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
  ],
  ui: {
    pageTitle: 'Macky Mamadou Wone | Étudiant Ingénieur — Informatique (IPSL - UGB)',
    navAriaLabel: 'Navigation principale',
    footerNavAriaLabel: 'Navigation secondaire',
    sections: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      experience: 'Parcours',
      projects: 'Projets',
      contact: 'Contact',
    },
    categories: {
      all: 'Tous',
      web: 'Full-Stack',
      'ai-rust': 'IA & Rust',
      compilation: 'Compilation',
      network: 'Réseaux',
    },
    header: {
      contactCta: 'Me contacter',
      switchToSlides: 'Passer en mode diapositives',
      switchToScroll: 'Passer en mode défilement',
      slidesTitle: 'Mode diapositives',
      scrollTitle: 'Mode défilement',
      switchToLight: 'Activer le thème clair',
      switchToDark: 'Activer le thème sombre',
      lightTitle: 'Thème clair',
      darkTitle: 'Thème sombre',
      menuAriaLabel: 'Menu',
      langSwitchAria: 'Passer le site en anglais',
      langSwitchTitle: 'Switch to English',
    },
    hero: {
      availableBadge: 'Disponible pour un stage PFE',
      greeting: 'Salut, je suis',
      lead: 'IA appliquée (OCR Python/Rust), développement Full-Stack temps réel et réseaux sécurisés — je conçois des systèmes rapides, robustes et bien pensés.',
      viewProjects: 'Voir mes projets',
      myCv: 'Mon CV',
      scrollHint: 'Défiler',
      quickEmail: 'Email',
      quickPhone: 'Téléphone',
      quickViewCv: 'Voir le CV',
      quickDownloadCv: 'Télécharger le CV',
      stats: [
        { value: '3e', label: 'Année cycle ingénieur', icon: 'cap' },
        { value: '3', label: 'Stages en entreprise', icon: 'briefcase' },
        { value: '4+', label: 'Projets techniques', icon: 'layers' },
        { value: '4', label: 'Langues parlées', icon: 'globe' },
      ],
      code: {
        structName: 'IngenieurGeIT',
        schoolKey: 'ecole',
        schoolVal: 'IPSL — UGB',
        promoKey: 'promo',
        stackKey: 'stack',
        focusKey: 'focus',
        focusVal: 'IA · Web · Réseaux',
      },
    },
    about: {
      title: 'À propos',
      portraitAlt: 'Portrait de Macky Mamadou Wone',
      facts: [
        { label: 'Formation', value: 'IPSL — UGB' },
        { label: 'Diplôme', value: 'Ingénieur 2027' },
        { label: 'Spécialité', value: 'Génie Info & Télécom' },
      ],
    },
    skills: {
      eyebrow: 'Mon expertise',
      title: 'Compétences & Technologies',
      levels: {
        advanced: 'Avancé',
        proficient: 'Confirmé',
        intermediate: 'Intermédiaire',
      },
    },
    resume: {
      experienceTitle: 'Expérience',
      educationTitle: 'Formation',
      languagesTitle: 'Langues',
      whatIDoTitle: 'Ce que je fais',
      hobbiesTitle: 'Centres d’intérêt',
      fullCvBtn: 'CV complet',
      languageMeterAria: (name, level) => `${name} : ${level}`,
    },
    projects: {
      eyebrow: 'Travaux sélectionnés',
      title: 'Projets & Architectures',
      filterAriaLabel: 'Filtrer les projets',
      cardAriaLabel: (title) => `Voir les détails du projet ${title}`,
    },
    contact: {
      ctaLine1: 'Construisons quelque chose',
      ctaLine2: 'd’exceptionnel ensemble 👋',
      ctaTextPrefix: 'À la recherche d’un ',
      ctaTextStrong: 'stage de fin d’études (PFE)',
      ctaTextSuffix: ' en Data Science / IA, ingénierie logicielle ou réseaux & sécurité. Discutons de votre projet !',
      ctaButton: 'Me contacter',
      emailSubject: 'Contact depuis votre portfolio',
      emailLabel: 'Email',
      phoneLabel: 'Téléphone',
      locationLabel: 'Localisation',
      copy: 'Copier',
      copied: 'Copié ✓',
    },
    footer: {
      rights: 'Tous droits réservés.',
      backToTop: 'Haut de page',
    },
    projectModal: {
      closeAria: 'Fermer la fenêtre de détails du projet',
      stackTitle: 'Stack & Outils',
      architectureTitle: 'Points clés & Architecture',
    },
    cvModal: {
      titlePrefix: 'Curriculum Vitae',
      downloadPdf: 'Télécharger le PDF',
      closeAria: "Fermer l'aperçu du CV",
      iframeTitle: (name) => `CV de ${name}`,
    },
  },
};

const EN_CONTENT: PortfolioContent = {
  profile: {
    firstName: 'Macky Mamadou',
    lastName: 'Wone',
    fullName: 'Macky Mamadou Wone',
    title: 'Computer Engineering Student',
    subtitle: '3rd-Year Engineering Student · Computer Science & Telecommunications (IPSL — UGB)',
    graduationTarget: 'Engineering Degree expected in 2027',
    phone: '+221 78 613 47 46',
    phoneHref: 'tel:+221786134746',
    email: 'wonemacky@gmail.com',
    location: 'Saint-Louis / Ndioum, Senegal',
    cvPdfUrl: './CV_Macky_Mamadou_Wone-3.pdf',
    aboutParagraphs: [
      'Third-year engineering student in Computer Science and Telecommunications at the Polytechnic Institute of Saint-Louis (UGB), with hands-on experience in applied AI, secure networking, and software engineering.',
      'Driven by a deep curiosity for how technologies work under the hood and putting them into practice — from hybrid Python/Rust OCR pipelines to real-time collaborative editors (CRDT) and resilient IPsec network architectures.',
    ],
    pillars: [
      {
        title: 'Applied AI & Rust Performance',
        description:
          'Building modular OCR pipelines (PaddleOCR) paired with native Rust modules (PyO3/Maturin), exposed through FastAPI and Streamlit.',
        tags: ['Python', 'Rust', 'PyO3 / Maturin', 'PaddleOCR', 'FastAPI', 'Streamlit'],
        icon: 'cpu',
      },
      {
        title: 'Software Engineering & Real-Time',
        description:
          'Developing real-time collaborative web apps (React, Node.js, Yjs CRDT, Socket.io) and low-level systems software (compiler in C, Flex, Bison).',
        tags: ['React', 'TypeScript', 'Node.js', 'Yjs (CRDT)', 'C / Flex / Bison', 'PostgreSQL'],
        icon: 'code',
      },
      {
        title: 'Networking & Infrastructure Security',
        description:
          'Designing and simulating resilient enterprise topologies: multi-site hub-and-spoke IPsec VPN architectures with automated failover.',
        tags: ['IPsec VPN', 'Hub-and-Spoke', 'Cisco Packet Tracer', 'GNS3', 'Linux & Security'],
        icon: 'shield',
      },
    ],
  },
  experiences: [
    {
      id: 'baamtu-2026',
      role: 'Data Scientist — Intern',
      company: 'Baamtu Technologies',
      location: 'Dakar, Senegal',
      period: 'Sept – Nov 2026',
      duration: '3 months',
      isLatest: true,
      badgeColor: 'cyan',
      description:
        'Designed and implemented a modular OCR pipeline for automated data extraction from national ID cards (Senegal & Ivory Coast).',
      highlights: [
        'Built multi-field text detection and optical character recognition using PaddleOCR for Senegalese and Ivorian National ID cards.',
        'Developed a high-performance MRZ parsing and validation module in Rust bridged to Python via PyO3 and Maturin.',
        'Exposed the pipeline through a FastAPI REST service and built an interactive Streamlit validation & demo dashboard.',
      ],
      technologies: ['Python', 'Rust', 'PaddleOCR', 'PyO3 / Maturin', 'FastAPI', 'Streamlit', 'OCR / MRZ'],
    },
    {
      id: 'gtp-2025',
      role: 'Front-end Developer — Intern',
      company: 'Gaindé Talent Provider (GTP)',
      location: 'Senegal',
      period: 'September 2025',
      duration: '1 month',
      badgeColor: 'indigo',
      description:
        'Built the front-end of a mission reporting web application for on-site consultants and their supervisors.',
      highlights: [
        'Designed ergonomic interfaces enabling consultants to fill in and submit their activity reports.',
        'Automated structured Excel report exports sent directly to supervisors for review and sign-off.',
      ],
      technologies: ['Front-end Web', 'JavaScript', 'HTML5 / CSS3', 'Excel Automation', 'UX / Forms'],
    },
    {
      id: 'byfilling-2024',
      role: 'Web Development — Discovery Intern',
      company: 'Byfilling',
      location: 'Senegal',
      period: 'September 2024',
      duration: '1 month',
      badgeColor: 'emerald',
      description:
        'First industry internship: hands-on introduction to web development fundamentals and engineering team workflows.',
      highlights: [
        'Built responsive web pages while applying HTML, CSS, and JavaScript best practices.',
        'Observed the full lifecycle of a web project in a professional production environment.',
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Web Integration'],
    },
  ],
  projects: [
    {
      id: 'netsim-pro',
      title: 'NetSim Pro',
      subtitle: 'Collaborative Network Topology Editor (Solo Project)',
      category: 'web',
      categoryLabel: 'Full-Stack & Real-Time',
      role: 'Creator & Solo Developer',
      year: '2026',
      accentColor: 'cyan',
      visualType: 'netsim',
      shortDescription:
        'Overleaf-inspired collaborative platform to design network topologies (Packet Tracer/GNS3 style) with real-time editing and native .gns3 export.',
      fullDescription:
        'NetSim Pro is an Overleaf-inspired collaborative web platform enabling engineers and students to design network topologies (similar to Cisco Packet Tracer and GNS3) together in real time, with conflict-free synchronization powered by CRDTs (Yjs) and direct export to native .gns3 files.',
      architecturePoints: [
        'Real-time distributed synchronization via Yjs (CRDT) and WebSockets (Socket.io) for concurrent editing of network nodes and links.',
        'Node.js / Express backend with PostgreSQL relational persistence managed through Prisma ORM.',
        'Serialization engine generating topology files directly compatible with GNS3 (.gns3).',
      ],
      technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL', 'Prisma', 'Yjs (CRDT)'],
    },
    {
      id: 'sgn-compiler',
      title: 'SGN Compiler',
      subtitle: 'Full compiler for a domain-specific grading language',
      category: 'compilation',
      categoryLabel: 'Compilers & Systems',
      role: 'Team of 3',
      year: '2026',
      accentColor: 'amber',
      visualType: 'sgn-compiler',
      shortDescription:
        'Complete compiler (lexer, parser, AST, symbol table) written in C with Flex and Bison for a DSL dedicated to academic grade management.',
      fullDescription:
        'Designed and built a complete compiler in C for a domain-specific language (DSL) dedicated to academic grade management and computation. Covers the entire front-end and intermediate pipeline: lexical analysis, syntax parsing, Abstract Syntax Tree (AST) construction, and symbol table management.',
      architecturePoints: [
        'Lexical analyzer generated with Flex for tokenizing the SGN grammar and reporting lexical errors.',
        'LALR syntax parser built with Bison producing a typed Abstract Syntax Tree (AST) in C.',
        'Symbol table handling semantic validation, identifier scoping, and grading rule evaluation.',
      ],
      technologies: ['C', 'Flex', 'Bison', 'AST', 'Symbol Table'],
    },
    {
      id: 'vpn-ipsec',
      title: 'Hub-and-Spoke IPsec VPN',
      subtitle: 'High-availability multi-site secure network architecture',
      category: 'network',
      categoryLabel: 'Networking & Security',
      role: 'Network & Security Architecture',
      year: '2026',
      accentColor: 'indigo',
      visualType: 'vpn-ipsec',
      shortDescription:
        'Secure enterprise WAN connecting 1 central hub and 12 remote sites across 72 IPsec tunnels with automatic link failover.',
      fullDescription:
        'Designed and simulated a secure enterprise Wide Area Network (WAN) in a Hub-and-Spoke topology connecting a central headquarters to 12 remote branch offices. The infrastructure deploys 72 encrypted IPsec VPN tunnels with dynamic routing and automatic failover to ensure service continuity.',
      architecturePoints: [
        'Hub-and-Spoke topology interconnecting 1 central site (Hub) and 12 remote branch offices (Spokes).',
        'Configured and verified 72 IPsec tunnels guaranteeing confidentiality, integrity, and authentication of inter-site traffic.',
        'Implemented high availability with dynamic routing and automated failover on link failure.',
      ],
      technologies: ['Cisco Packet Tracer', 'IPsec VPN', 'Hub-and-Spoke', 'Failover / Redundancy', 'Network Security'],
    },
    {
      id: 'ocr-cni-pipeline',
      title: 'OCR & MRZ Pipeline (Python / Rust)',
      subtitle: 'Automated identity document extraction (Senegal & Ivory Coast IDs)',
      category: 'ai-rust',
      categoryLabel: 'Applied AI & Rust',
      role: 'Data Scientist Intern @ Baamtu Technologies',
      year: '2026',
      accentColor: 'emerald',
      visualType: 'ocr-pipeline',
      shortDescription:
        'Modular OCR pipeline combining PaddleOCR, native Rust MRZ parsing (PyO3/Maturin), FastAPI REST API, and Streamlit UI.',
      fullDescription:
        'Production-oriented architecture built during my internship at Baamtu Technologies in Dakar to automate reading and verifying National Identity Cards (Senegal and Ivory Coast). Combines Python’s deep learning ecosystem (PaddleOCR) with Rust’s memory safety and speed for critical MRZ parsing.',
      architecturePoints: [
        'Computer vision and OCR pipeline using PaddleOCR tailored to Senegalese and Ivorian ID card layouts.',
        'Native Rust-to-Python bindings compiled with PyO3 and Maturin to accelerate and harden MRZ decoding.',
        'FastAPI REST microservice paired with a Streamlit visual inspection and validation interface.',
      ],
      technologies: ['Python', 'Rust', 'PaddleOCR', 'PyO3', 'Maturin', 'FastAPI', 'Streamlit'],
    },
  ],
  skills: [
    {
      id: 'python-rust',
      name: 'Python & Rust',
      badge: 'Py/Rs',
      level: 78,
      summary: 'Applied AI, computer vision (OCR), native PyO3/Maturin extensions, and REST APIs.',
      tags: ['Python', 'Rust', 'PyO3 / Maturin', 'PaddleOCR', 'FastAPI', 'Streamlit'],
    },
    {
      id: 'git-linux',
      name: 'Git & Linux',
      badge: 'Linux',
      level: 75,
      summary: 'GNU/Linux system environment, Git version control, shell scripting, and CLI tooling.',
      tags: ['Linux', 'Git', 'Bash / Shell', 'Dev Environment'],
    },
    {
      id: 'network-security',
      name: 'Networking & Security',
      badge: 'Sec',
      level: 75,
      summary: 'IPsec VPN architectures, Hub-and-Spoke topologies, routing, and high availability.',
      tags: ['IPsec VPN', 'Cisco Packet Tracer', 'GNS3', 'WAN Topologies', 'Failover'],
    },
    {
      id: 'c-sql',
      name: 'C & SQL',
      badge: 'C/SQL',
      level: 70,
      summary: 'Systems programming, compiler design (Flex/Bison, AST), and relational databases.',
      tags: ['C Language', 'Flex & Bison', 'PostgreSQL', 'SQL', 'Prisma ORM'],
    },
    {
      id: 'web-js',
      name: 'HTML / CSS / JS & Full-Stack',
      badge: 'Web',
      level: 72,
      summary: 'Modern web apps, real-time collaborative editing, and REST/WebSocket architectures.',
      tags: ['React', 'TypeScript', 'JavaScript', 'Node.js / Express', 'Socket.io', 'Yjs (CRDT)'],
    },
  ],
  education: [
    {
      id: 'ipsl-ing',
      institution: 'IPSL — Gaston Berger University (UGB)',
      degree: 'Engineering Degree, Computer Science & Telecommunications',
      details: '3rd year of engineering cycle · Expected graduation in 2027',
      period: '2024 – Present',
      current: true,
    },
    {
      id: 'ipsl-prepa',
      institution: 'Polytechnic Institute of Saint-Louis (IPSL)',
      degree: 'Preparatory Classes in Science & Engineering',
      details: 'Mathematics, Physics, and Engineering Sciences',
      period: '2022 – 2024',
    },
    {
      id: 'lycee-ndioum',
      institution: 'Lycée de Ndioum',
      degree: 'High School Diploma (Baccalauréat, Series S2)',
      details: 'Honors (Mention Assez Bien)',
      period: '2021 – 2022',
    },
  ],
  languages: [
    { name: 'French', dots: 4, levelLabel: 'Fluent / Bilingual' },
    { name: 'Pulaar (Fula)', dots: 4, levelLabel: 'Native' },
    { name: 'Wolof', dots: 3, levelLabel: 'Fluent' },
    { name: 'English', dots: 2, levelLabel: 'Technical Intermediate' },
  ],
  hobbies: [
    {
      name: 'Reading',
      icon: 'book',
      description: 'Technical books, science, and literature.',
    },
    {
      name: 'Travel',
      icon: 'plane',
      description: 'Exploring new horizons and cultures.',
    },
    {
      name: 'Football',
      icon: 'football',
      description: 'Teamwork, competition, and endurance.',
    },
    {
      name: 'Music',
      icon: 'music',
      description: 'Daily listening and creative inspiration.',
    },
  ],
  ui: {
    pageTitle: 'Macky Mamadou Wone | Computer Engineering Student (IPSL - UGB)',
    navAriaLabel: 'Primary navigation',
    footerNavAriaLabel: 'Footer navigation',
    sections: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      experience: 'Resume',
      projects: 'Projects',
      contact: 'Contact',
    },
    categories: {
      all: 'All',
      web: 'Full-Stack',
      'ai-rust': 'AI & Rust',
      compilation: 'Compilers',
      network: 'Networks',
    },
    header: {
      contactCta: "Let's Talk",
      switchToSlides: 'Switch to slides view',
      switchToScroll: 'Switch to scroll view',
      slidesTitle: 'Slides view',
      scrollTitle: 'Scroll view',
      switchToLight: 'Switch to light theme',
      switchToDark: 'Switch to dark theme',
      lightTitle: 'Light theme',
      darkTitle: 'Dark theme',
      menuAriaLabel: 'Menu',
      langSwitchAria: 'Passer le site en français',
      langSwitchTitle: 'Passer en français',
    },
    hero: {
      availableBadge: 'Available for Final-Year Internship',
      greeting: "Hi, I'm",
      lead: 'Applied AI (Python/Rust OCR), real-time Full-Stack development, and secure networking — building fast, resilient, and thoughtfully engineered systems.',
      viewProjects: 'View My Work',
      myCv: 'My Resume',
      scrollHint: 'Scroll Down',
      quickEmail: 'Email',
      quickPhone: 'Phone',
      quickViewCv: 'View Resume',
      quickDownloadCv: 'Download Resume',
      stats: [
        { value: '3rd', label: 'Year Engineering Cycle', icon: 'cap' },
        { value: '3', label: 'Industry Internships', icon: 'briefcase' },
        { value: '4+', label: 'Technical Projects', icon: 'layers' },
        { value: '4', label: 'Languages Spoken', icon: 'globe' },
      ],
      code: {
        structName: 'CSAndTelecomEngineer',
        schoolKey: 'school',
        schoolVal: 'IPSL — UGB',
        promoKey: 'class_of',
        stackKey: 'stack',
        focusKey: 'focus',
        focusVal: 'AI · Web · Networks',
      },
    },
    about: {
      title: 'About',
      portraitAlt: 'Portrait of Macky Mamadou Wone',
      facts: [
        { label: 'School', value: 'IPSL — UGB' },
        { label: 'Degree', value: 'M.Eng. 2027' },
        { label: 'Major', value: 'CS & Telecom' },
      ],
    },
    skills: {
      eyebrow: 'My Expertise',
      title: 'Skills & Technologies',
      levels: {
        advanced: 'Advanced',
        proficient: 'Proficient',
        intermediate: 'Intermediate',
      },
    },
    resume: {
      experienceTitle: 'Experience',
      educationTitle: 'Education',
      languagesTitle: 'Languages',
      whatIDoTitle: 'What I Do',
      hobbiesTitle: 'Hobbies & Interests',
      fullCvBtn: 'Full Resume',
      languageMeterAria: (name, level) => `${name}: ${level}`,
    },
    projects: {
      eyebrow: 'Featured Work',
      title: 'Selected Projects',
      filterAriaLabel: 'Filter projects',
      cardAriaLabel: (title) => `View details for project ${title}`,
    },
    contact: {
      ctaLine1: "Let's build something",
      ctaLine2: 'Amazing together 👋',
      ctaTextPrefix: 'Looking for a ',
      ctaTextStrong: 'final-year internship (PFE)',
      ctaTextSuffix: ' in Data Science / AI, Software Engineering, or Networking & Security. Let’s talk!',
      ctaButton: 'Get in Touch',
      emailSubject: 'Contact from your portfolio',
      emailLabel: 'Email',
      phoneLabel: 'Phone',
      locationLabel: 'Location',
      copy: 'Copy',
      copied: 'Copied ✓',
    },
    footer: {
      rights: 'All rights reserved.',
      backToTop: 'Back to Top',
    },
    projectModal: {
      closeAria: 'Close project details dialog',
      stackTitle: 'Stack & Tools',
      architectureTitle: 'Key Highlights & Architecture',
    },
    cvModal: {
      titlePrefix: 'Resume',
      downloadPdf: 'Download PDF',
      closeAria: 'Close resume preview',
      iframeTitle: (name) => `${name}'s Resume`,
    },
  },
};

export const PORTFOLIO_CONTENT: Record<Language, PortfolioContent> = {
  fr: FR_CONTENT,
  en: EN_CONTENT,
};

export const getPortfolioContent = (lang: Language): PortfolioContent => PORTFOLIO_CONTENT[lang];

// Backwards-compatible default exports (FR)
export const PROFILE_DATA = FR_CONTENT.profile;
export const EXPERIENCES_DATA = FR_CONTENT.experiences;
export const PROJECTS_DATA = FR_CONTENT.projects;
export const SKILLS_DATA = FR_CONTENT.skills;
export const EDUCATION_DATA = FR_CONTENT.education;
export const LANGUAGES_DATA = FR_CONTENT.languages;
export const HOBBIES_DATA = FR_CONTENT.hobbies;
