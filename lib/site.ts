import type { IconType } from 'react-icons';
import { FaBehance, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import {
  SiBootstrap,
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiWordpress,
} from 'react-icons/si';
import { TbBrandAdobe } from 'react-icons/tb';

export const site = {
  name: 'Sudhersun',
  wordmark: 'SUDHERSUN',
  tagline: 'Strategy, Design, Performance',
  intro: 'We are a branding studio for companies that refuse to blend in.',
  email: 'hello@novastudio.dev',
  location: 'Mumbai, India — Asia',
};

export const navLinks = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#work' },
];

export const socials: { label: string; href: string; icon: IconType }[] = [
  { label: 'Instagram', href: 'https://www.instagram.com/mss_246/', icon: FaInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sudhersun-m-18b715243/', icon: FaLinkedin },
  { label: 'WhatsApp', href: 'https://wa.me/919486358317', icon: FaWhatsapp },
  { label: 'Behance', href: 'https://www.behance.net/sudhersunsun', icon: FaBehance },
];

export type Project = {
  slug: string;
  title: string;
  description: string;
  href: string;
  bg: string;
  fg: string;
  accent: string;
  image: string;
};

/**
 * Four case studies, matching the reference's horizontal track. Each carries
 * its own palette so the pinned scroll reads as a sequence of distinct
 * worlds. Images are placeholders (picsum, seeded per slug) until real
 * case-study photography replaces them.
 */
export const projects: Project[] = [
  {
    slug: 'emergex',
    title: 'EmergeX',
    description: 'An AI-driven incident reporting platform that helps teams detect, log, and resolve incidents faster.',
    href: 'https://www.behance.net/gallery/252503703/EmergeX-AI-Powered-Incident-Reporting',
    bg: '#0b1220',
    fg: '#ffffff',
    accent: '#5eead4',
    image: '/assets/EmergeX-AI-Project.png',
  },
  {
    slug: 'urmila',
    title: 'Urmila',
    description: 'A machine and employee management system built to streamline assignments and daily operations.',
    href: 'https://www.behance.net/gallery/247373163/Machine-Assignment-Website',
    bg: '#1c1a17',
    fg: '#f5f1ea',
    accent: '#f5a623',
    image: '/assets/urmilla-machine-management.png',
  },
  {
    slug: 'phoenix',
    title: 'Phoenix',
    description: 'An e-commerce plugin for tracking orders and generating reports across stores.',
    href: 'https://www.behance.net/gallery/229907629/Phoenix-Tech',
    bg: '#3a0d0d',
    fg: '#fff6f0',
    accent: '#ff6a3d',
    image: '/assets/phoenix.png',
  },
  {
    slug: 'job-space',
    title: 'Job Space',
    description: 'A job board connecting organisations and job seekers to post, find, and apply for the right roles.',
    href: 'https://www.behance.net/gallery/232228233/Find-Job-Find-Your-Dream-Job-Prefect-Candidates',
    bg: '#0d211c',
    fg: '#f0fbf7',
    accent: '#34d399',
    image: '/assets/jobspace.png',
  },
];

export const services = [
  {
    n: '01',
    title: 'Logo Design',
    body: 'A mark that carries weight. Not decoration — a piece of equity that stays legible at 16px and monumental at 16 metres.',
  },
  {
    n: '02',
    title: 'Brand Identity',
    body: 'The full system: type, colour, grid, motion and voice, documented so every touchpoint reads as the same company.',
  },
  {
    n: '03',
    title: 'Packaging Design',
    body: 'Structure and surface designed together, so the pack earns its place on a shelf before a single word is read.',
  },
  {
    n: '04',
    title: 'Web Design & Build',
    body: 'Sites engineered as carefully as they are art-directed — fast, accessible, and built to grow with the business.',
  },
];

export const responsibilities = [
  {
    n: '01',
    title: 'End-to-End Product Design',
    body: 'Leading UI/UX design for scalable web and SaaS applications from discovery through to developer handoff — owning the full design lifecycle with Figma and Adobe XD.',
  },
  {
    n: '02',
    title: 'Frontend Implementation',
    body: 'Building responsive, accessible, performance-optimized interfaces using React.js, HTML5, CSS3, and JavaScript — translating design systems directly into production code.',
  },
  {
    n: '03',
    title: 'Design System Architecture',
    body: 'Transforming Figma design systems into reusable component-based UI architectures — documented patterns and guidelines that keep teams aligned and products consistent.',
  },
  {
    n: '04',
    title: 'UX Research & Analysis',
    body: 'Conducting user research, persona creation, journey mapping, and usability testing — integrating data-driven insights into design decisions throughout the product lifecycle.',
  },
];

export type ExperienceEntry = {
  period: string;
  duration: string;
  title: string;
  company: string;
  type: string;
  bullets: string[];
  tags: { label: string; featured?: boolean }[];
};

export const experience: ExperienceEntry[] = [
  {
    period: 'May 2023 — July 2026',
    duration: '3 years',
    title: 'Product Designer / UI Engineer',
    company: 'Soft Suave Technology',
    type: 'Full-time',
    bullets: [
      'Led end-to-end UI/UX design and frontend development for scalable web and SaaS applications',
      'Built responsive, accessible, performance-optimized interfaces using React.js, HTML5, CSS3, and JavaScript',
      'Transformed Figma design systems into reusable component-based UI architectures',
      'Collaborated with cross-functional teams to deliver user-centric solutions aligned with business goals',
      'Mentored designers and managed multiple projects ensuring quality delivery and improved user experience',
    ],
    tags: [
      { label: 'React.js', featured: true },
      { label: 'Figma', featured: true },
      { label: 'Design Systems' },
      { label: 'SaaS' },
      { label: 'B2B' },
    ],
  },
  {
    period: 'March 2022 — August 2022',
    duration: '6 months',
    title: 'UX/UI Designer',
    company: 'Hakuna Matata Solution',
    type: 'Internship',
    bullets: [
      'Learned the full UX lifecycle: research, persona creation, wireframing, and usability testing',
      'Participated in real-time client projects and contributed to user journey mapping',
      'Created case studies and design artifacts documenting the problem-solving process',
      'Applied user psychology and UX strategy to enhance onboarding experiences',
    ],
    tags: [
      { label: 'UX Research', featured: true },
      { label: 'Wireframing', featured: true },
      { label: 'Journey Mapping' },
      { label: 'Usability Testing' },
    ],
  },
];

export const skills: { label: string; icon: IconType }[] = [
  { label: 'Figma', icon: SiFigma },
  { label: 'Adobe Suite', icon: TbBrandAdobe },
  { label: 'HTML', icon: SiHtml5 },
  { label: 'CSS', icon: SiCss },
  { label: 'Tailwind', icon: SiTailwindcss },
  { label: 'Bootstrap', icon: SiBootstrap },
  { label: 'JS', icon: SiJavascript },
  { label: 'React JS', icon: SiReact },
  { label: 'WordPress', icon: SiWordpress },
];

export const stats = [
  { value: '3.8+', label: 'Years of experience' },
  { value: '20+', label: 'Projects' },
  { value: '15+', label: 'Clients' },
  { value: '3+', label: 'Countries' },
];
