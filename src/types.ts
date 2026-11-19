export type SectionId = 'home' | 'about' | 'experience' | 'projects' | 'skills' | 'contact';

export type ProjectCategory = 'all' | 'web' | 'ai-rust' | 'compilation' | 'network';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  duration: string;
  description: string;
  highlights: string[];
  technologies: string[];
  badgeColor: 'cyan' | 'indigo' | 'emerald';
  isLatest?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  role: string;
  year: string;
  shortDescription: string;
  fullDescription: string;
  architecturePoints: string[];
  technologies: string[];
  accentColor: 'cyan' | 'indigo' | 'amber' | 'emerald';
  visualType: 'netsim' | 'ocr-pipeline' | 'sgn-compiler' | 'vpn-ipsec';
}

export interface SkillGroup {
  id: string;
  name: string;
  badge: string;
  level: number;
  summary: string;
  tags: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  details: string;
  period: string;
  current?: boolean;
}

export interface LanguageItem {
  name: string;
  dots: number; // out of 4, matching CV
  levelLabel: string;
}

export interface HobbyItem {
  name: string;
  icon: 'book' | 'plane' | 'football' | 'music';
  description: string;
}

