import React, { useEffect, useState } from 'react';
import {
  EDUCATION_DATA,
  EXPERIENCES_DATA,
  HOBBIES_DATA,
  LANGUAGES_DATA,
  PROFILE_DATA,
  PROJECTS_DATA,
  SKILLS_DATA,
} from './data/cvData';
import { ProjectCategory, ProjectItem, SectionId } from './types';
import { runDirectionalViewTransition } from './utils/modernWeb';
import { ProjectVisual } from './components/ProjectVisual';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';

const SECTIONS_ORDER: { id: SectionId; label: string }[] = [
  { id: 'home', label: 'Accueil' },
  { id: 'about', label: 'À propos' },
  { id: 'skills', label: 'Compétences' },
  { id: 'experience', label: 'Parcours' },
  { id: 'projects', label: 'Projets' },
  { id: 'contact', label: 'Contact' },
];

const CATEGORY_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'web', label: 'Full-Stack' },
  { id: 'ai-rust', label: 'IA & Rust' },
  { id: 'compilation', label: 'Compilation' },
  { id: 'network', label: 'Réseaux' },
];

const HERO_STATS = [
  { value: '3e', label: 'Année cycle ingénieur', icon: 'cap' },
  { value: '3', label: 'Stages en entreprise', icon: 'briefcase' },
  { value: '4+', label: 'Projets techniques', icon: 'layers' },
  { value: '4', label: 'Langues parlées', icon: 'globe' },
] as const;

/* -------------------------------------------------------------------------- */
/*  Inline icon set (stroke icons, 24x24)                                     */
/* -------------------------------------------------------------------------- */
type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'arrow-up'
  | 'download'
  | 'eye'
  | 'mail'
  | 'phone'
  | 'pin'
  | 'file'
  | 'send'
  | 'sun'
  | 'moon'
  | 'menu'
  | 'close'
  | 'slides'
  | 'scroll'
  | 'cap'
  | 'briefcase'
  | 'layers'
  | 'globe'
  | 'cpu'
  | 'code'
  | 'shield'
  | 'sparkle'
  | 'book'
  | 'plane'
  | 'football'
  | 'music'
  | 'expand';

const ICON_PATHS: Record<IconName, React.ReactNode> = {
  'arrow-right': <path d="M5 12h14M12 5l7 7-7 7" />,
  'arrow-up-right': <path d="M7 17 17 7M8 7h9v9" />,
  'arrow-up': <path d="M12 19V5M5 12l7-7 7 7" />,
  download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  eye: (
    <>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  mail: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  ),
  pin: (
    <>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  file: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </>
  ),
  send: <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </>
  ),
  moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  slides: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </>
  ),
  scroll: (
    <>
      <rect x="6" y="2" width="12" height="20" rx="6" />
      <path d="M12 6v4" />
    </>
  ),
  cap: (
    <>
      <path d="M22 10 12 5 2 10l10 5 10-5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2M2 13h20" />
    </>
  ),
  layers: <path d="m12 2 10 5-10 5L2 7l10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </>
  ),
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </>
  ),
  code: <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />,
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  sparkle: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />,
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  plane: (
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
  ),
  football: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m12 7 4.5 3.2-1.7 5.3H9.2l-1.7-5.3L12 7zM12 2v5M21.5 8.8l-5 1.4M18 20l-3.2-4.5M6 20l3.2-4.5M2.5 8.8l5 1.4" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </>
  ),
  expand: <path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M3 16v3a2 2 0 0 0 2 2h3M16 21h3a2 2 0 0 0 2-2v-3" />,
};

const Icon: React.FC<{ name: IconName; className?: string }> = ({ name, className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {ICON_PATHS[name]}
  </svg>
);

/* Section title in the style "ABOUT" with a cyan underline */
const SectionTitle: React.FC<{ eyebrow?: string; title: string; action?: React.ReactNode }> = ({
  eyebrow,
  title,
  action,
}) => (
  <div className="section-title-row">
    <div>
      {eyebrow && (
        <span className="eyebrow-chip">
          <Icon name="sparkle" />
          {eyebrow}
        </span>
      )}
      <h2 className="section-title">{title}</h2>
    </div>
    {action}
  </div>
);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [viewMode, setViewMode] = useState<'scroll' | 'slides'>('scroll');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // IntersectionObserver to update active nav link in scroll mode
  useEffect(() => {
    if (viewMode !== 'scroll') return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          if (id) setActiveSection(id);
        }
      },
      { threshold: [0.25, 0.55], rootMargin: '-80px 0px -30% 0px' }
    );

    SECTIONS_ORDER.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const navigateToSection = (target: SectionId) => {
    setMobileMenuOpen(false);

    if (viewMode === 'slides') {
      if (target === activeSection) return;
      const prevIdx = SECTIONS_ORDER.findIndex((s) => s.id === activeSection);
      const nextIdx = SECTIONS_ORDER.findIndex((s) => s.id === target);
      const direction = nextIdx >= prevIdx ? 'forward' : 'backward';

      runDirectionalViewTransition(() => {
        setActiveSection(target);
        window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      }, direction);
    } else {
      setActiveSection(target);
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    if (category === activeCategory) return;
    runDirectionalViewTransition(() => setActiveCategory(category));
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'scroll' ? 'slides' : 'scroll';
    runDirectionalViewTransition(() => setViewMode(nextMode), 'forward');
  };

  const copyToClipboard = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Clipboard unavailable — silently ignore
    }
  };

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  const isSectionVisible = (id: SectionId) => viewMode === 'scroll' || activeSection === id;

  const skillLevelLabel = (level: number) =>
    level >= 85 ? 'Avancé' : level >= 72 ? 'Confirmé' : 'Intermédiaire';

  /* Social / quick-contact icons (hero + footer) */
  const quickLinks = (
    <div className="social-row">
      <a href={`mailto:${PROFILE_DATA.email}`} className="social-btn" aria-label="Email" title={PROFILE_DATA.email}>
        <Icon name="mail" />
      </a>
      <a href={PROFILE_DATA.phoneHref} className="social-btn" aria-label="Téléphone" title={PROFILE_DATA.phone}>
        <Icon name="phone" />
      </a>
      <button
        type="button"
        className="social-btn"
        aria-label="Voir le CV"
        title="Voir le CV"
        onClick={() => setIsCvModalOpen(true)}
      >
        <Icon name="file" />
      </button>
      <a
        href={PROFILE_DATA.cvPdfUrl}
        download="CV_Macky_Mamadou_Wone.pdf"
        className="social-btn"
        aria-label="Télécharger le CV"
        title="Télécharger le CV"
      >
        <Icon name="download" />
      </a>
    </div>
  );

  return (
    <div className={`portfolio-shell mode-${viewMode}`}>
      {/* Ambient background */}
      <div className="ambient-backdrop" aria-hidden="true">
        <div className="ambient-orb orb-a" />
        <div className="ambient-orb orb-b" />
        <div className="ambient-grid" />
      </div>

      {/* ================================================================== */}
      {/* HEADER                                                              */}
      {/* ================================================================== */}
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-inner">
          <a
            href="#home"
            className="brand"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('home');
            }}
          >
            <span className="brand-mark">
              <Icon name="code" />
            </span>
            <span className="brand-name">
              Macky<span>.dev</span>
            </span>
          </a>

          <nav className={`primary-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            <ul className="nav-list">
              {SECTIONS_ORDER.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`nav-item ${activeSection === id ? 'active' : ''}`}
                    aria-current={activeSection === id ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateToSection(id);
                    }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-controls">
            <a href={PROFILE_DATA.phoneHref} className="header-phone">
              <Icon name="phone" />
              <span>{PROFILE_DATA.phone}</span>
            </a>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleViewMode}
              aria-label={viewMode === 'scroll' ? 'Passer en mode diapositives' : 'Passer en mode défilement'}
              title={viewMode === 'scroll' ? 'Mode diapositives' : 'Mode défilement'}
            >
              <Icon name={viewMode === 'scroll' ? 'slides' : 'scroll'} />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
              title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button
              type="button"
              className="btn btn-glow btn-sm header-cta"
              onClick={() => navigateToSection('contact')}
            >
              <span>Me contacter</span>
              <Icon name="send" />
            </button>
            <button
              type="button"
              className="icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      <main className="site-main">
        {/* ================================================================ */}
        {/* 1. HERO                                                           */}
        {/* ================================================================ */}
        {isSectionVisible('home') && (
          <section id="home" className="portfolio-section hero-section">
            <div className="section-inner">
              <div className="hero-frame">
                <div className="hero-photo" aria-hidden="true" />

                <div className="hero-copy">
                  <span className="eyebrow-chip available">
                    <span className="status-pulse" />
                    Disponible pour un stage PFE
                  </span>

                  <p className="hero-hello">Salut, je suis</p>
                  <h1 className="hero-title">
                    <span className="hero-firstname">{PROFILE_DATA.firstName}</span>
                    <span className="hero-lastname">
                      {PROFILE_DATA.lastName}
                      <span className="type-cursor" aria-hidden="true" />
                    </span>
                  </h1>
                  <p className="hero-role">{PROFILE_DATA.title}</p>
                  <p className="hero-lead">
                    IA appliquée (OCR Python/Rust), développement Full-Stack temps réel et réseaux sécurisés —
                    je conçois des systèmes rapides, robustes et bien pensés.
                  </p>

                  <div className="hero-cta-row">
                    <button type="button" className="btn btn-glow" onClick={() => navigateToSection('projects')}>
                      <span>Voir mes projets</span>
                      <Icon name="arrow-up-right" />
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsCvModalOpen(true)}>
                      <span>Mon CV</span>
                      <Icon name="download" />
                    </button>
                  </div>

                  {quickLinks}

                  <button type="button" className="scroll-hint" onClick={() => navigateToSection('about')}>
                    <span className="mouse" aria-hidden="true">
                      <span />
                    </span>
                    Défiler
                  </button>
                </div>

                <div className="hero-aside">
                  <div className="glass-card stats-card">
                    {HERO_STATS.map((stat) => (
                      <div key={stat.label} className="stat-row">
                        <span className="stat-icon">
                          <Icon name={stat.icon} />
                        </span>
                        <div>
                          <strong>{stat.value}</strong>
                          <span>{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card code-card">
                    <div className="code-card-head">
                      <span className="dot dot-red" />
                      <span className="dot dot-amber" />
                      <span className="dot dot-green" />
                      <span className="code-card-file">profile.rs</span>
                    </div>
                    <pre className="code-block">
                      <code>
                        <span className="c-kw">struct</span> <span className="c-type">IngenieurGeIT</span> {'{'}
                        {'\n  '}
                        <span className="c-prop">ecole</span>: <span className="c-str">"IPSL — UGB"</span>,
                        {'\n  '}
                        <span className="c-prop">promo</span>: <span className="c-num">2027</span>,
                        {'\n  '}
                        <span className="c-prop">stack</span>: [<span className="c-str">"Rust"</span>,{' '}
                        <span className="c-str">"Python"</span>, <span className="c-str">"React"</span>],
                        {'\n  '}
                        <span className="c-prop">focus</span>: <span className="c-str">"IA · Web · Réseaux"</span>,
                        {'\n'}
                        {'}'}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 2. ABOUT                                                          */}
        {/* ================================================================ */}
        {isSectionVisible('about') && (
          <section id="about" className="portfolio-section about-section">
            <div className="section-inner">
              <div className="about-panel">
                <div className="about-copy">
                  <h2 className="section-title big">À propos</h2>
                  <a href={`mailto:${PROFILE_DATA.email}`} className="about-email">
                    {PROFILE_DATA.email}
                  </a>

                  <div className="about-paragraphs">
                    {PROFILE_DATA.aboutParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="about-facts">
                    <div>
                      <span>Formation</span>
                      <strong>IPSL — UGB</strong>
                    </div>
                    <div>
                      <span>Diplôme</span>
                      <strong>Ingénieur 2027</strong>
                    </div>
                    <div>
                      <span>Spécialité</span>
                      <strong>Génie Info & Télécom</strong>
                    </div>
                  </div>

                  <p className="about-address">
                    <span className="line" />
                    <span>
                      <Icon name="pin" />
                      {PROFILE_DATA.location}
                    </span>
                    <span className="line" />
                  </p>
                </div>

                <div className="about-visual">
                  <div className={`portrait-frame ${hasPhoto ? 'has-photo' : ''}`}>
                    {hasPhoto && (
                      <img
                        src="./assets/photo.jpg"
                        alt={`Portrait de ${PROFILE_DATA.fullName}`}
                        onError={() => setHasPhoto(false)}
                      />
                    )}
                    {!hasPhoto && (
                      <div className="portrait-placeholder" aria-hidden="true">
                        <div className="orbit orbit-1" />
                        <div className="orbit orbit-2" />
                        <span className="portrait-monogram">MMW</span>
                        <span className="orbit-chip chip-1">Rust</span>
                        <span className="orbit-chip chip-2">Python</span>
                        <span className="orbit-chip chip-3">React</span>
                        <span className="orbit-chip chip-4">IPsec</span>
                      </div>
                    )}
                  </div>
                  <span className="panel-corner" aria-hidden="true">
                    <Icon name="expand" />
                  </span>
                </div>
              </div>

              <div className="pillars-grid">
                {PROFILE_DATA.pillars.map((pillar) => (
                  <article key={pillar.title} className="glass-card pillar-card">
                    <span className="pillar-icon">
                      <Icon name={pillar.icon as IconName} />
                    </span>
                    <h3>{pillar.title}</h3>
                    <p>{pillar.description}</p>
                    <div className="tech-tags-wrap">
                      {pillar.tags.map((tag) => (
                        <span key={tag} className="tech-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 3. SKILLS                                                         */}
        {/* ================================================================ */}
        {isSectionVisible('skills') && (
          <section id="skills" className="portfolio-section skills-section">
            <div className="section-inner">
              <div className="glass-panel">
                <SectionTitle eyebrow="Mon expertise" title="Compétences & Technologies" />

                <div className="skills-grid">
                  {SKILLS_DATA.map((skill) => (
                    <article key={skill.id} className="skill-card">
                      <span className="skill-logo">{skill.badge}</span>
                      <h3>{skill.name}</h3>
                      <p className="skill-summary">{skill.summary}</p>
                      <div className="skill-meta">
                        <span>{skillLevelLabel(skill.level)}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="skill-track" aria-hidden="true">
                        <span style={{ width: `${skill.level}%` }} />
                      </div>
                      <div className="tech-tags-wrap compact">
                        {skill.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="tech-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 4. RESUME / PARCOURS                                              */}
        {/* ================================================================ */}
        {isSectionVisible('experience') && (
          <section id="experience" className="portfolio-section resume-section">
            <div className="section-inner">
              <div className="resume-panel">
                <div className="resume-bg" aria-hidden="true" />

                {/* Column 1 — Experience timeline */}
                <div className="resume-col">
                  <h2 className="col-title">Expérience</h2>
                  <ol className="timeline">
                    {EXPERIENCES_DATA.map((exp) => (
                      <li key={exp.id} className={`timeline-item ${exp.isLatest ? 'is-latest' : ''}`}>
                        <span className="timeline-badge">
                          <small>{exp.period.match(/\d{4}/)?.[0]}</small>
                          <small>{exp.duration}</small>
                        </span>
                        <div className="timeline-body">
                          <h3>{exp.company}</h3>
                          <p className="timeline-role">
                            {exp.role} · {exp.period}
                          </p>
                          <p className="timeline-desc">{exp.description}</p>
                          <ul className="timeline-highlights">
                            {exp.highlights.map((h, i) => (
                              <li key={i}>{h}</li>
                            ))}
                          </ul>
                          <div className="tech-tags-wrap compact">
                            {exp.technologies.map((tech) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Column 2 — Education + Languages */}
                <div className="resume-col">
                  <h2 className="col-title">Formation</h2>
                  <ul className="edu-list">
                    {EDUCATION_DATA.map((edu) => (
                      <li key={edu.id} className={edu.current ? 'is-current' : ''}>
                        <span className="edu-period">{edu.period}</span>
                        <strong>{edu.degree}</strong>
                        <span className="edu-school">{edu.institution}</span>
                        <span className="edu-details">{edu.details}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="col-title">Langues</h2>
                  <ul className="slider-list">
                    {LANGUAGES_DATA.map((lang) => (
                      <li key={lang.name}>
                        <div className="slider-label">
                          <span>{lang.name}</span>
                          <small>{lang.levelLabel}</small>
                        </div>
                        <div
                          className="slider-track"
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={4}
                          aria-valuenow={lang.dots}
                          aria-label={`${lang.name} : ${lang.levelLabel}`}
                        >
                          <span style={{ width: `${(lang.dots / 4) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3 — What I do + hobbies */}
                <div className="resume-col">
                  <h2 className="col-title">Ce que je fais</h2>
                  <ul className="do-list">
                    {PROFILE_DATA.pillars.map((p) => (
                      <li key={p.title}>
                        <strong>{p.title}</strong>
                        <span>{p.tags.slice(0, 4).join(' · ')}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="col-title">Centres d’intérêt</h2>
                  <ul className="hobby-grid">
                    {HOBBIES_DATA.map((hobby) => (
                      <li key={hobby.name} title={hobby.description}>
                        <span className="hobby-icon">
                          <Icon name={hobby.icon} />
                        </span>
                        <span>{hobby.name}</span>
                      </li>
                    ))}
                  </ul>

                  <button type="button" className="btn btn-outline btn-sm" onClick={() => setIsCvModalOpen(true)}>
                    <Icon name="eye" />
                    <span>CV complet</span>
                  </button>
                </div>

                <span className="panel-corner" aria-hidden="true">
                  <Icon name="expand" />
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 5. PROJECTS                                                       */}
        {/* ================================================================ */}
        {isSectionVisible('projects') && (
          <section id="projects" className="portfolio-section projects-section">
            <div className="section-inner">
              <div className="glass-panel">
                <SectionTitle
                  eyebrow="Travaux sélectionnés"
                  title="Projets & Architectures"
                  action={
                    <div className="filter-bar" role="tablist" aria-label="Filtrer les projets">
                      {CATEGORY_FILTERS.map((filter) => (
                        <button
                          key={filter.id}
                          type="button"
                          role="tab"
                          aria-selected={activeCategory === filter.id}
                          className={`filter-chip ${activeCategory === filter.id ? 'active' : ''}`}
                          onClick={() => handleCategoryChange(filter.id)}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  }
                />

                <div className="projects-grid">
                  {filteredProjects.map((project) => (
                    <article
                      key={project.id}
                      className={`project-card accent-${project.accentColor}`}
                      onClick={() => setSelectedProject(project)}
                      tabIndex={0}
                      role="button"
                      aria-label={`Voir les détails du projet ${project.title}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProject(project);
                        }
                      }}
                    >
                      <div className="project-card-visual">
                        <ProjectVisual visualType={project.visualType} compact />
                      </div>
                      <div className="project-card-content">
                        <span className={`category-pill accent-${project.accentColor}`}>
                          {project.categoryLabel}
                        </span>
                        <h3 className="project-card-title">{project.title}</h3>
                        <p className="project-card-desc">{project.shortDescription}</p>
                        <div className="project-card-footer">
                          <div className="tech-tags-wrap compact">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span key={tech} className="tech-tag">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <span className="project-open" aria-hidden="true">
                            <Icon name="arrow-up-right" />
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================================================================ */}
        {/* 6. CONTACT                                                        */}
        {/* ================================================================ */}
        {isSectionVisible('contact') && (
          <section id="contact" className="portfolio-section contact-section">
            <div className="section-inner">
              <div className="cta-banner">
                <div className="cta-title">
                  <p>Construisons quelque chose</p>
                  <h2>d’exceptionnel ensemble 👋</h2>
                </div>
                <p className="cta-text">
                  À la recherche d’un <strong>stage de fin d’études (PFE)</strong> en Data Science / IA, ingénierie
                  logicielle ou réseaux & sécurité. Discutons de votre projet !
                </p>
                <a
                  href={`mailto:${PROFILE_DATA.email}?subject=Contact%20depuis%20votre%20portfolio`}
                  className="btn btn-glow"
                >
                  <span>Me contacter</span>
                  <Icon name="send" />
                </a>
              </div>

              <div className="contact-grid">
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="mail" />
                  </span>
                  <div className="contact-info">
                    <span>Email</span>
                    <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>
                  </div>
                  <button
                    type="button"
                    className="copy-chip"
                    onClick={() => void copyToClipboard(PROFILE_DATA.email, 'email')}
                  >
                    {copiedField === 'email' ? 'Copié ✓' : 'Copier'}
                  </button>
                </div>
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  <div className="contact-info">
                    <span>Téléphone</span>
                    <a href={PROFILE_DATA.phoneHref}>{PROFILE_DATA.phone}</a>
                  </div>
                  <button
                    type="button"
                    className="copy-chip"
                    onClick={() => void copyToClipboard(PROFILE_DATA.phone, 'phone')}
                  >
                    {copiedField === 'phone' ? 'Copié ✓' : 'Copier'}
                  </button>
                </div>
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="pin" />
                  </span>
                  <div className="contact-info">
                    <span>Localisation</span>
                    <strong>{PROFILE_DATA.location}</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ================================================================== */}
      {/* FOOTER                                                              */}
      {/* ================================================================== */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-copy">
            © {new Date().getFullYear()} {PROFILE_DATA.fullName}. Tous droits réservés.
          </span>
          <nav className="footer-nav" aria-label="Navigation secondaire">
            {SECTIONS_ORDER.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
          <button type="button" className="back-top" onClick={() => navigateToSection('home')}>
            <span className="back-top-icon">
              <Icon name="arrow-up" />
            </span>
            Haut de page
          </button>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      <CvModal isOpen={isCvModalOpen} onClose={() => setIsCvModalOpen(false)} />
    </div>
  );
};
