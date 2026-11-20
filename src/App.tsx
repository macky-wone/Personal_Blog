import React, { useEffect, useState } from 'react';
import { getPortfolioContent } from './data/cvData';
import { Language, ProjectCategory, SectionId } from './types';
import { runDirectionalViewTransition } from './utils/modernWeb';
import { ProjectVisual } from './components/ProjectVisual';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';

const SECTIONS_IDS: SectionId[] = ['home', 'about', 'skills', 'experience', 'projects', 'contact'];
const CATEGORY_IDS: ProjectCategory[] = ['all', 'web', 'ai-rust', 'compilation', 'network'];

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

const getInitialLang = (): Language => {
  try {
    const saved = window.localStorage.getItem('portfolio-lang');
    if (saved === 'fr' || saved === 'en') return saved;
  } catch {
    // Ignore storage access errors
  }
  return 'fr';
};

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(getInitialLang);
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [viewMode, setViewMode] = useState<'scroll' | 'slides'>('scroll');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasPhoto, setHasPhoto] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const content = getPortfolioContent(lang);
  const { profile, experiences, projects, skills, education, languages, hobbies, ui } = content;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = ui.pageTitle;
    try {
      window.localStorage.setItem('portfolio-lang', lang);
    } catch {
      // Ignore storage access errors
    }
  }, [lang, ui.pageTitle]);

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

    SECTIONS_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [viewMode]);

  const navigateToSection = (target: SectionId) => {
    setMobileMenuOpen(false);

    if (viewMode === 'slides') {
      if (target === activeSection) return;
      const prevIdx = SECTIONS_IDS.indexOf(activeSection);
      const nextIdx = SECTIONS_IDS.indexOf(target);
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

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
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
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  const selectedProject = selectedProjectId
    ? projects.find((project) => project.id === selectedProjectId) ?? null
    : null;

  const isSectionVisible = (id: SectionId) => viewMode === 'scroll' || activeSection === id;

  const skillLevelLabel = (level: number) =>
    level >= 85
      ? ui.skills.levels.advanced
      : level >= 72
        ? ui.skills.levels.proficient
        : ui.skills.levels.intermediate;

  const quickLinks = (
    <div className="social-row">
      <a
        href={`mailto:${profile.email}`}
        className="social-btn"
        aria-label={ui.hero.quickEmail}
        title={profile.email}
      >
        <Icon name="mail" />
      </a>
      <a
        href={profile.phoneHref}
        className="social-btn"
        aria-label={ui.hero.quickPhone}
        title={profile.phone}
      >
        <Icon name="phone" />
      </a>
      <button
        type="button"
        className="social-btn"
        aria-label={ui.hero.quickViewCv}
        title={ui.hero.quickViewCv}
        onClick={() => setIsCvModalOpen(true)}
      >
        <Icon name="file" />
      </button>
      <a
        href={profile.cvPdfUrl}
        download="CV_Macky_Mamadou_Wone.pdf"
        className="social-btn"
        aria-label={ui.hero.quickDownloadCv}
        title={ui.hero.quickDownloadCv}
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

          <nav className={`primary-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label={ui.navAriaLabel}>
            <ul className="nav-list">
              {SECTIONS_IDS.map((id) => (
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
                    {ui.sections[id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-controls">
            <a href={profile.phoneHref} className="header-phone">
              <Icon name="phone" />
              <span>{profile.phone}</span>
            </a>
            <button
              type="button"
              className="lang-toggle"
              onClick={toggleLanguage}
              aria-label={ui.header.langSwitchAria}
              title={ui.header.langSwitchTitle}
            >
              <span className={lang === 'fr' ? 'is-active' : ''}>FR</span>
              <span className="lang-sep" aria-hidden="true">/</span>
              <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={toggleViewMode}
              aria-label={viewMode === 'scroll' ? ui.header.switchToSlides : ui.header.switchToScroll}
              title={viewMode === 'scroll' ? ui.header.slidesTitle : ui.header.scrollTitle}
            >
              <Icon name={viewMode === 'scroll' ? 'slides' : 'scroll'} />
            </button>
            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? ui.header.switchToLight : ui.header.switchToDark}
              title={theme === 'dark' ? ui.header.lightTitle : ui.header.darkTitle}
            >
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </button>
            <button
              type="button"
              className="btn btn-glow btn-sm header-cta"
              onClick={() => navigateToSection('contact')}
            >
              <span>{ui.header.contactCta}</span>
              <Icon name="send" />
            </button>
            <button
              type="button"
              className="icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={ui.header.menuAriaLabel}
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
                    {ui.hero.availableBadge}
                  </span>

                  <p className="hero-hello">{ui.hero.greeting}</p>
                  <h1 className="hero-title">
                    <span className="hero-firstname">{profile.firstName}</span>
                    <span className="hero-lastname">
                      {profile.lastName}
                      <span className="type-cursor" aria-hidden="true" />
                    </span>
                  </h1>
                  <p className="hero-role">{profile.title}</p>
                  <p className="hero-lead">{ui.hero.lead}</p>

                  <div className="hero-cta-row">
                    <button type="button" className="btn btn-glow" onClick={() => navigateToSection('projects')}>
                      <span>{ui.hero.viewProjects}</span>
                      <Icon name="arrow-up-right" />
                    </button>
                    <button type="button" className="btn btn-outline" onClick={() => setIsCvModalOpen(true)}>
                      <span>{ui.hero.myCv}</span>
                      <Icon name="download" />
                    </button>
                  </div>

                  {quickLinks}

                  <button type="button" className="scroll-hint" onClick={() => navigateToSection('about')}>
                    <span className="mouse" aria-hidden="true">
                      <span />
                    </span>
                    {ui.hero.scrollHint}
                  </button>
                </div>

                <div className="hero-aside">
                  <div className="glass-card stats-card">
                    {ui.hero.stats.map((stat) => (
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
                        <span className="c-kw">struct</span> <span className="c-type">{ui.hero.code.structName}</span>{' '}
                        {'{'}
                        {'\n  '}
                        <span className="c-prop">{ui.hero.code.schoolKey}</span>:{' '}
                        <span className="c-str">&quot;{ui.hero.code.schoolVal}&quot;</span>,
                        {'\n  '}
                        <span className="c-prop">{ui.hero.code.promoKey}</span>: <span className="c-num">2027</span>,
                        {'\n  '}
                        <span className="c-prop">{ui.hero.code.stackKey}</span>: [<span className="c-str">&quot;Rust&quot;</span>,{' '}
                        <span className="c-str">&quot;Python&quot;</span>, <span className="c-str">&quot;React&quot;</span>],
                        {'\n  '}
                        <span className="c-prop">{ui.hero.code.focusKey}</span>:{' '}
                        <span className="c-str">&quot;{ui.hero.code.focusVal}&quot;</span>,
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
                  <h2 className="section-title big">{ui.about.title}</h2>
                  <a href={`mailto:${profile.email}`} className="about-email">
                    {profile.email}
                  </a>

                  <div className="about-paragraphs">
                    {profile.aboutParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="about-facts">
                    {ui.about.facts.map((fact) => (
                      <div key={fact.label}>
                        <span>{fact.label}</span>
                        <strong>{fact.value}</strong>
                      </div>
                    ))}
                  </div>

                  <p className="about-address">
                    <span className="line" />
                    <span>
                      <Icon name="pin" />
                      {profile.location}
                    </span>
                    <span className="line" />
                  </p>
                </div>

                <div className="about-visual">
                  <div className={`portrait-frame ${hasPhoto ? 'has-photo' : ''}`}>
                    {hasPhoto && (
                      <img
                        src="./assets/photo.jpg"
                        alt={ui.about.portraitAlt}
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
                {profile.pillars.map((pillar) => (
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
                <SectionTitle eyebrow={ui.skills.eyebrow} title={ui.skills.title} />

                <div className="skills-grid">
                  {skills.map((skill) => (
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
                  <h2 className="col-title">{ui.resume.experienceTitle}</h2>
                  <ol className="timeline">
                    {experiences.map((exp) => (
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
                  <h2 className="col-title">{ui.resume.educationTitle}</h2>
                  <ul className="edu-list">
                    {education.map((edu) => (
                      <li key={edu.id} className={edu.current ? 'is-current' : ''}>
                        <span className="edu-period">{edu.period}</span>
                        <strong>{edu.degree}</strong>
                        <span className="edu-school">{edu.institution}</span>
                        <span className="edu-details">{edu.details}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="col-title">{ui.resume.languagesTitle}</h2>
                  <ul className="slider-list">
                    {languages.map((item) => (
                      <li key={item.name}>
                        <div className="slider-label">
                          <span>{item.name}</span>
                          <small>{item.levelLabel}</small>
                        </div>
                        <div
                          className="slider-track"
                          role="meter"
                          aria-valuemin={0}
                          aria-valuemax={4}
                          aria-valuenow={item.dots}
                          aria-label={ui.resume.languageMeterAria(item.name, item.levelLabel)}
                        >
                          <span style={{ width: `${(item.dots / 4) * 100}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3 — What I do + hobbies */}
                <div className="resume-col">
                  <h2 className="col-title">{ui.resume.whatIDoTitle}</h2>
                  <ul className="do-list">
                    {profile.pillars.map((p) => (
                      <li key={p.title}>
                        <strong>{p.title}</strong>
                        <span>{p.tags.slice(0, 4).join(' · ')}</span>
                      </li>
                    ))}
                  </ul>

                  <h2 className="col-title">{ui.resume.hobbiesTitle}</h2>
                  <ul className="hobby-grid">
                    {hobbies.map((hobby) => (
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
                    <span>{ui.resume.fullCvBtn}</span>
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
                  eyebrow={ui.projects.eyebrow}
                  title={ui.projects.title}
                  action={
                    <div className="filter-bar" role="tablist" aria-label={ui.projects.filterAriaLabel}>
                      {CATEGORY_IDS.map((categoryId) => (
                        <button
                          key={categoryId}
                          type="button"
                          role="tab"
                          aria-selected={activeCategory === categoryId}
                          className={`filter-chip ${activeCategory === categoryId ? 'active' : ''}`}
                          onClick={() => handleCategoryChange(categoryId)}
                        >
                          {ui.categories[categoryId]}
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
                      onClick={() => setSelectedProjectId(project.id)}
                      tabIndex={0}
                      role="button"
                      aria-label={ui.projects.cardAriaLabel(project.title)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedProjectId(project.id);
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
                  <p>{ui.contact.ctaLine1}</p>
                  <h2>{ui.contact.ctaLine2}</h2>
                </div>
                <p className="cta-text">
                  {ui.contact.ctaTextPrefix}
                  <strong>{ui.contact.ctaTextStrong}</strong>
                  {ui.contact.ctaTextSuffix}
                </p>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(ui.contact.emailSubject)}`}
                  className="btn btn-glow"
                >
                  <span>{ui.contact.ctaButton}</span>
                  <Icon name="send" />
                </a>
              </div>

              <div className="contact-grid">
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="mail" />
                  </span>
                  <div className="contact-info">
                    <span>{ui.contact.emailLabel}</span>
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                  <button
                    type="button"
                    className="copy-chip"
                    onClick={() => void copyToClipboard(profile.email, 'email')}
                  >
                    {copiedField === 'email' ? ui.contact.copied : ui.contact.copy}
                  </button>
                </div>
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="phone" />
                  </span>
                  <div className="contact-info">
                    <span>{ui.contact.phoneLabel}</span>
                    <a href={profile.phoneHref}>{profile.phone}</a>
                  </div>
                  <button
                    type="button"
                    className="copy-chip"
                    onClick={() => void copyToClipboard(profile.phone, 'phone')}
                  >
                    {copiedField === 'phone' ? ui.contact.copied : ui.contact.copy}
                  </button>
                </div>
                <div className="glass-card contact-card">
                  <span className="contact-icon">
                    <Icon name="pin" />
                  </span>
                  <div className="contact-info">
                    <span>{ui.contact.locationLabel}</span>
                    <strong>{profile.location}</strong>
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
            © {new Date().getFullYear()} {profile.fullName}. {ui.footer.rights}
          </span>
          <nav className="footer-nav" aria-label={ui.footerNavAriaLabel}>
            {SECTIONS_IDS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection(id);
                }}
              >
                {ui.sections[id]}
              </a>
            ))}
          </nav>
          <button type="button" className="back-top" onClick={() => navigateToSection('home')}>
            <span className="back-top-icon">
              <Icon name="arrow-up" />
            </span>
            {ui.footer.backToTop}
          </button>
        </div>
      </footer>

      <ProjectModal project={selectedProject} lang={lang} onClose={() => setSelectedProjectId(null)} />
      <CvModal isOpen={isCvModalOpen} lang={lang} onClose={() => setIsCvModalOpen(false)} />
    </div>
  );
};
