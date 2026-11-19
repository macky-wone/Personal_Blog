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
  { id: 'about', label: 'À Propos' },
  { id: 'experience', label: 'Expériences' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Parcours & Compétences' },
  { id: 'contact', label: 'Contact' },
];

const CATEGORY_FILTERS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'Tous les projets' },
  { id: 'web', label: 'Full-Stack & Temps Réel' },
  { id: 'ai-rust', label: 'IA Appliquée & Rust' },
  { id: 'compilation', label: 'Compilation & Système' },
  { id: 'network', label: 'Réseaux & Sécurité' },
];

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [viewMode, setViewMode] = useState<'scroll' | 'slides'>('scroll');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState<'email' | 'phone' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCategoryChange = (category: ProjectCategory) => {
    if (category === activeCategory) return;
    runDirectionalViewTransition(() => {
      setActiveCategory(category);
    });
  };

  const toggleViewMode = () => {
    const nextMode = viewMode === 'scroll' ? 'slides' : 'scroll';
    runDirectionalViewTransition(() => {
      setViewMode(nextMode);
    }, 'forward');
  };

  const copyToClipboard = async (value: string, field: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2200);
    } catch {
      // Fallback
    }
  };

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((project) => project.category === activeCategory);

  const renderHobbyIcon = (icon: 'book' | 'plane' | 'football' | 'music') => {
    switch (icon) {
      case 'book':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'plane':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'football':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 7 16.5 10.2 14.8 15.5 9.2 15.5 7.5 10.2 12 7" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="21.5" y1="8.8" x2="16.5" y2="10.2" />
            <line x1="18" y1="20" x2="14.8" y2="15.5" />
            <line x1="6" y1="20" x2="9.2" y2="15.5" />
            <line x1="2.5" y1="8.8" x2="7.5" y2="10.2" />
          </svg>
        );
      case 'music':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6" cy="18" r="3" />
            <circle cx="18" cy="16" r="3" />
          </svg>
        );
    }
  };

  const isSectionVisible = (id: SectionId) => viewMode === 'scroll' || activeSection === id;

  return (
    <div className={`portfolio-shell mode-${viewMode}`}>
      {/* Ambient Background Glows */}
      <div className="ambient-backdrop" aria-hidden="true">
        <div className="ambient-orb orb-cyan" />
        <div className="ambient-orb orb-indigo" />
        <div className="ambient-grid" />
      </div>

      {/* Top Navigation */}
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            className="brand-logo"
            onClick={(e) => {
              e.preventDefault();
              navigateToSection('home');
            }}
          >
            <span className="brand-monogram">MMW</span>
            <div className="brand-text">
              <span className="brand-name">Macky M. Wone</span>
              <span className="brand-role">Ingénieur GeIT · IPSL</span>
            </div>
          </a>

          <nav className={`primary-nav ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="Navigation principale">
            <ul className="nav-list">
              {SECTIONS_ORDER.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className={`nav-item ${activeSection === id ? 'active' : ''}`}
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
            <button
              type="button"
              className="control-pill"
              onClick={toggleViewMode}
              title={
                viewMode === 'scroll'
                  ? 'Passer en mode diapositives (View Transitions)'
                  : 'Passer en mode défilement continu'
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {viewMode === 'scroll' ? (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                ) : (
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                )}
              </svg>
              <span>{viewMode === 'scroll' ? 'Vue Scroll' : 'Vue Slides'}</span>
            </button>

            <button
              type="button"
              className="icon-btn"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
              title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm header-cv-btn"
              onClick={() => setIsCvModalOpen(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              <span>CV PDF</span>
            </button>

            <button
              type="button"
              className="icon-btn mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileMenuOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="site-main">
        {/* 1. HERO SECTION */}
        {isSectionVisible('home') && (
          <section id="home" className="portfolio-section hero-section">
            <div className="section-inner hero-grid">
              <div className="hero-copy">
                <div className="status-badge">
                  <span className="status-pulse" />
                  <span>{PROFILE_DATA.subtitle}</span>
                </div>

                <h1 className="hero-title">
                  <span className="hero-firstname">{PROFILE_DATA.firstName}</span>
                  <span className="hero-lastname">{PROFILE_DATA.lastName}</span>
                </h1>

                <p className="hero-role">{PROFILE_DATA.title}</p>

                <p className="hero-lead">
                  {PROFILE_DATA.aboutParagraphs[0]}
                </p>

                <div className="hero-cta-row">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => navigateToSection('projects')}
                  >
                    <span>Explorer mes projets</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => navigateToSection('experience')}
                  >
                    <span>Expériences &amp; Stages</span>
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => setIsCvModalOpen(true)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Consulter le CV</span>
                  </button>
                </div>

                <div className="hero-metrics">
                  <div className="metric-card">
                    <span className="metric-val">3e</span>
                    <span className="metric-lbl">Année Cycle Ingénieur (IPSL)</span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-val">3</span>
                    <span className="metric-lbl">Stages (Data/IA &amp; Web)</span>
                  </div>
                  <div className="metric-card">
                    <span className="metric-val">4+</span>
                    <span className="metric-lbl">Projets Systèmes, IA &amp; Réseaux</span>
                  </div>
                </div>
              </div>

              <div className="hero-showcase">
                <div className="terminal-card">
                  <div className="terminal-header">
                    <div className="terminal-dots">
                      <span className="dot dot-red" />
                      <span className="dot dot-amber" />
                      <span className="dot dot-green" />
                    </div>
                    <span className="terminal-title">macky@ipsl-ugb:~/profile.rs</span>
                    <span className="terminal-tag">2026 – 2027</span>
                  </div>

                  <div className="terminal-body">
                    <div className="code-block">
                      <div className="code-line">
                        <span className="c-kw">struct</span> <span className="c-type">IngenieurGeIT</span> {'{'}
                      </div>
                      <div className="code-line indent">
                        <span className="c-prop">ecole</span>: <span className="c-str">&quot;IPSL — UGB (Saint-Louis)&quot;</span>,
                      </div>
                      <div className="code-line indent">
                        <span className="c-prop">promotion</span>: <span className="c-num">2027</span>,
                      </div>
                      <div className="code-line indent">
                        <span className="c-prop">axes</span>: [
                        <span className="c-str">&quot;IA &amp; OCR (Python/Rust)&quot;</span>,{' '}
                        <span className="c-str">&quot;Full-Stack Temps Réel&quot;</span>,{' '}
                        <span className="c-str">&quot;Réseaux &amp; Sécurité&quot;</span>],
                      </div>
                      <div className="code-line">{'}'}</div>
                    </div>

                    <div className="showcase-highlights">
                      <div
                        className="highlight-row clickable"
                        onClick={() => navigateToSection('experience')}
                      >
                        <span className="h-badge badge-cyan">Stage Réc.</span>
                        <div className="h-info">
                          <strong>Data Scientist — Baamtu Technologies</strong>
                          <span>Pipeline OCR CNI (PaddleOCR + Rust PyO3/Maturin + FastAPI)</span>
                        </div>
                        <span className="h-arrow">→</span>
                      </div>

                      <div
                        className="highlight-row clickable"
                        onClick={() => setSelectedProject(PROJECTS_DATA[0])}
                      >
                        <span className="h-badge badge-indigo">Projet Solo</span>
                        <div className="h-info">
                          <strong>NetSim Pro — Éditeur Réseau Temps Réel</strong>
                          <span>React, Node.js, Socket.io, PostgreSQL, Yjs (CRDT), export .gns3</span>
                        </div>
                        <span className="h-arrow">→</span>
                      </div>

                      <div
                        className="highlight-row clickable"
                        onClick={() => setSelectedProject(PROJECTS_DATA[2])}
                      >
                        <span className="h-badge badge-emerald">Sécurité</span>
                        <div className="h-info">
                          <strong>Architecture VPN IPsec Hub-and-Spoke</strong>
                          <span>1 site central, 12 sites distants, 72 tunnels IPsec &amp; failover</span>
                        </div>
                        <span className="h-arrow">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 2. À PROPOS SECTION */}
        {isSectionVisible('about') && (
          <section id="about" className="portfolio-section about-section">
            <div className="section-inner">
              <div className="section-header">
                <span className="section-eyebrow">Présentation</span>
                <h2 className="section-heading">À Propos &amp; Domaines d’Expertise</h2>
              </div>

              <div className="about-layout">
                <div className="about-bio-card">
                  <div className="bio-avatar-row">
                    <div className="avatar-monogram">
                      <span>MMW</span>
                    </div>
                    <div>
                      <h3>{PROFILE_DATA.fullName}</h3>
                      <p className="bio-sub">{PROFILE_DATA. graduationTarget}</p>
                    </div>
                  </div>

                  <div className="bio-paragraphs">
                    {PROFILE_DATA.aboutParagraphs.map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="bio-coordinates">
                    <div className="coord-item">
                      <span className="coord-label">Localisation</span>
                      <strong>{PROFILE_DATA.location}</strong>
                    </div>
                    <div className="coord-item">
                      <span className="coord-label">Email</span>
                      <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>
                    </div>
                    <div className="coord-item">
                      <span className="coord-label">Téléphone</span>
                      <a href={PROFILE_DATA.phoneHref}>{PROFILE_DATA.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="pillars-grid">
                  {PROFILE_DATA.pillars.map((pillar) => (
                    <article key={pillar.title} className="pillar-card">
                      <div className="pillar-icon">
                        {pillar.icon === 'cpu' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <rect x="4" y="4" width="16" height="16" rx="2" />
                            <rect x="9" y="9" width="6" height="6" />
                            <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" strokeLinecap="round" />
                          </svg>
                        )}
                        {pillar.icon === 'code' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {pillar.icon === 'shield' && (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="pillar-content">
                        <h3>{pillar.title}</h3>
                        <p>{pillar.description}</p>
                        <div className="tech-tags-wrap">
                          {pillar.tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. EXPÉRIENCE PROFESSIONNELLE SECTION */}
        {isSectionVisible('experience') && (
          <section id="experience" className="portfolio-section experience-section">
            <div className="section-inner">
              <div className="section-header">
                <span className="section-eyebrow">Parcours en Entreprise</span>
                <h2 className="section-heading">Expérience Professionnelle</h2>
                <p className="section-desc">
                  Trois stages progressifs couvrant la Data Science &amp; l’IA industrielle (OCR Python/Rust), le développement Front-end métier et les fondamentaux du Web.
                </p>
              </div>

              <div className="experience-timeline">
                {EXPERIENCES_DATA.map((exp) => (
                  <article
                    key={exp.id}
                    className={`exp-card ${exp.isLatest ? 'is-latest' : ''}`}
                  >
                    <div className="exp-timeline-marker">
                      <span className={`marker-dot dot-${exp.badgeColor}`} />
                      <span className="marker-line" />
                    </div>

                    <div className="exp-card-body">
                      <div className="exp-card-top">
                        <div>
                          <div className="exp-title-row">
                            <h3 className="exp-role">{exp.role}</h3>
                            {exp.isLatest && <span className="latest-badge">Dernier stage</span>}
                          </div>
                          <p className="exp-company">
                            <strong>{exp.company}</strong> · <span>{exp.location}</span>
                          </p>
                        </div>

                        <div className="exp-date-box">
                          <span className="exp-period">{exp.period}</span>
                          <span className="exp-duration">{exp.duration}</span>
                        </div>
                      </div>

                      <p className="exp-summary">{exp.description}</p>

                      <ul className="exp-highlights">
                        {exp.highlights.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>

                      <div className="tech-tags-wrap">
                        {exp.technologies.map((tech) => (
                          <span key={tech} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. PROJETS SECTION */}
        {isSectionVisible('projects') && (
          <section id="projects" className="portfolio-section projects-section">
            <div className="section-inner">
              <div className="section-header">
                <span className="section-eyebrow">Réalisations Techniques</span>
                <h2 className="section-heading">Projets &amp; Architectures</h2>
                <p className="section-desc">
                  Cliquez sur un projet pour explorer son architecture détaillée, sa stack technique et ses points clés.
                </p>
              </div>

              <div className="filter-bar" role="tablist" aria-label="Filtrer les projets par catégorie">
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

              <div className="projects-grid">
                {filteredProjects.map((project) => (
                  <article
                    key={project.id}
                    className={`project-card accent-border-${project.accentColor}`}
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
                      <div className="project-card-meta">
                        <span className={`category-pill accent-${project.accentColor}`}>
                          {project.categoryLabel}
                        </span>
                        <span className="project-role-tag">{project.role}</span>
                      </div>

                      <h3 className="project-card-title">{project.title}</h3>
                      <p className="project-card-subtitle">{project.subtitle}</p>
                      <p className="project-card-desc">{project.shortDescription}</p>

                      <div className="project-card-footer">
                        <div className="tech-tags-wrap">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span key={tech} className="tech-tag">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="tech-tag">+{project.technologies.length - 5}</span>
                          )}
                        </div>

                        <span className="project-inspect-link">
                          <span>Détails</span>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. COMPÉTENCES, FORMATION, LANGUES & LOISIRS */}
        {isSectionVisible('skills') && (
          <section id="skills" className="portfolio-section skills-section">
            <div className="section-inner">
              <div className="section-header">
                <span className="section-eyebrow">Bagage Académique &amp; Technique</span>
                <h2 className="section-heading">Compétences, Formation &amp; Profil</h2>
              </div>

              <div className="skills-bento-grid">
                {/* Technical Skills Column */}
                <div className="bento-card skills-card">
                  <h3 className="bento-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    <span>Compétences Techniques</span>
                  </h3>

                  <div className="skill-bars-list">
                    {SKILLS_DATA.map((skill) => (
                      <div key={skill.id} className="skill-entry">
                        <div className="skill-entry-head">
                          <div className="skill-entry-title">
                            <span className="skill-badge">{skill.badge}</span>
                            <strong>{skill.name}</strong>
                          </div>
                          <span className="skill-pct">{skill.level}%</span>
                        </div>
                        <p className="skill-entry-summary">{skill.summary}</p>
                        <div className="skill-progress-track" aria-hidden="true">
                          <div
                            className="skill-progress-fill"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <div className="tech-tags-wrap compact-tags">
                          {skill.tags.map((tag) => (
                            <span key={tag} className="tech-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right column: Education + Languages + Hobbies */}
                <div className="bento-side-stack">
                  {/* Formation */}
                  <div className="bento-card education-card">
                    <h3 className="bento-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                      </svg>
                      <span>Formation Académique</span>
                    </h3>

                    <div className="education-list">
                      {EDUCATION_DATA.map((edu) => (
                        <div
                          key={edu.id}
                          className={`edu-item ${edu.current ? 'is-current' : ''}`}
                        >
                          <div className="edu-header">
                            <h4>{edu.institution}</h4>
                            <span className="edu-period">{edu.period}</span>
                          </div>
                          <p className="edu-degree">{edu.degree}</p>
                          <p className="edu-details">{edu.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Langues */}
                  <div className="bento-card languages-card">
                    <h3 className="bento-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>Langues</span>
                    </h3>

                    <div className="languages-list">
                      {LANGUAGES_DATA.map((lang) => (
                        <div key={lang.name} className="lang-row">
                          <div className="lang-info">
                            <strong>{lang.name}</strong>
                            <span>{lang.levelLabel}</span>
                          </div>
                          <div
                            className="lang-dots"
                            aria-label={`${lang.dots} sur 4`}
                          >
                            {[1, 2, 3, 4].map((dotIdx) => (
                              <span
                                key={dotIdx}
                                className={`lang-dot ${dotIdx <= lang.dots ? 'filled' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Loisirs */}
                  <div className="bento-card hobbies-card">
                    <h3 className="bento-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                      <span>Centres d’Intérêt &amp; Loisirs</span>
                    </h3>

                    <div className="hobbies-grid-bento">
                      {HOBBIES_DATA.map((hobby) => (
                        <div key={hobby.name} className="hobby-tile">
                          <div className="hobby-tile-icon">{renderHobbyIcon(hobby.icon)}</div>
                          <div className="hobby-tile-text">
                            <strong>{hobby.name}</strong>
                            <span>{hobby.description}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 6. CONTACT SECTION */}
        {isSectionVisible('contact') && (
          <section id="contact" className="portfolio-section contact-section">
            <div className="section-inner">
              <div className="contact-banner">
                <div className="contact-copy">
                  <span className="section-eyebrow">Contact Direct</span>
                  <h2 className="section-heading">Collaborons ensemble</h2>
                  <p className="contact-lead">
                    À la recherche d’un stage de fin d’études (PFE) ou d’opportunités en{' '}
                    <strong>Data Science / IA appliquée</strong>,{' '}
                    <strong>Ingénierie Logicielle (Python, Rust, React/Node)</strong> ou{' '}
                    <strong>Réseaux &amp; Sécurité</strong>. N’hésitez pas à me contacter !
                  </p>

                  <div className="contact-cards-grid">
                    <div className="contact-card">
                      <div className="contact-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </div>
                      <div className="contact-card-info">
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

                    <div className="contact-card">
                      <div className="contact-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="contact-card-info">
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

                    <div className="contact-card">
                      <div className="contact-card-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </div>
                      <div className="contact-card-info">
                        <span>Localisation</span>
                        <strong>{PROFILE_DATA.location}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="contact-cta-actions">
                    <a
                      href={`mailto:${PROFILE_DATA.email}?subject=Contact%20depuis%20votre%20portfolio`}
                      className="btn btn-primary"
                    >
                      <span>M’envoyer un email</span>
                    </a>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsCvModalOpen(true)}
                    >
                      <span>Aperçu du CV (PDF)</span>
                    </button>
                    <a
                      href={PROFILE_DATA.cvPdfUrl}
                      download="CV_Macky_Mamadou_Wone.pdf"
                      className="btn btn-ghost"
                    >
                      <span>Télécharger le CV</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="brand-monogram sm">MMW</span>
            <span>
              © {new Date().getFullYear()} {PROFILE_DATA.fullName} · Étudiant Ingénieur IPSL (UGB)
            </span>
          </div>
          <div className="footer-right">
            <a href={`mailto:${PROFILE_DATA.email}`}>{PROFILE_DATA.email}</a>
            <span className="sep">·</span>
            <a href={PROFILE_DATA.phoneHref}>{PROFILE_DATA.phone}</a>
            <span className="sep">·</span>
            <span>{PROFILE_DATA.location}</span>
          </div>
        </div>
      </footer>

      {/* Native <dialog> Modals */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
      />
    </div>
  );
};

