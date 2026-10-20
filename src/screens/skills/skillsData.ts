import type { Skill } from '../../components/skills';

// Tech Logos (Interview-safe stack)
import pythonLogo from '../../assets/images/skills/python.png';
import javascriptLogo from '../../assets/images/skills/javascript.png';
import sqlLogo from '../../assets/images/skills/sql.png';
import htmlLogo from '../../assets/images/skills/html5.png';
import cssLogo from '../../assets/images/skills/css3.png';
import nodejsLogo from '../../assets/images/skills/nodejs.png';
import expressLogo from '../../assets/images/skills/express.png';
import reactLogo from '../../assets/images/skills/react.png';
import viteLogo from '../../assets/images/skills/vite.png';
import gitLogo from '../../assets/images/skills/git.png';
import githubLogo from '../../assets/images/skills/github.png';

export type CategoryType = 'technical' | 'soft' | 'learning';

export interface SkillCategoryData {
  id: string;
  title: string;
  description: string;
  type: CategoryType;
  items: Skill[];
}

// Inline SVGs for specialized technical skills and tools
const SvgIcon = (path: string, color: string = "%2333ff33", extra: string = "") => 
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${extra}>${path}</svg>`;

export const categoriesData: SkillCategoryData[] = [
  {
    id: '01',
    title: 'Programming Fundamentals',
    description: 'Core languages and query fundamentals used to construct logic, process data, and build web applications.',
    type: 'technical',
    items: [
      { id: 'python', name: 'Python', category: 'Language', logo: pythonLogo },
      { id: 'javascript', name: 'JavaScript', category: 'Language', logo: javascriptLogo },
      { id: 'sql', name: 'SQL', category: 'Database', logo: sqlLogo },
      { id: 'html5', name: 'HTML5', category: 'Language', logo: htmlLogo },
      { id: 'css3', name: 'CSS3', category: 'Language', logo: cssLogo },
    ]
  },
  {
    id: '02',
    title: 'Backend Development',
    description: 'Server-side architectures, API routing, and backend services handling data exchange and external integrations.',
    type: 'technical',
    items: [
      { id: 'nodejs', name: 'Node.js', category: 'Backend', logo: nodejsLogo },
      { id: 'express', name: 'Express.js', category: 'Backend', logo: expressLogo },
      { id: 'restapis', name: 'REST APIs', category: 'Backend', logo: SvgIcon('<rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>', '%2338bdf8') },
      { id: 'http_json', name: 'HTTP & JSON', category: 'Backend', logo: SvgIcon('<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', '%2310b981') },
      { id: 'env_vars', name: 'Environment Variables', category: 'Backend', logo: SvgIcon('<path d="M21 2l-2 2m-1.5 1.5L16 7l-1.5-1.5L13 7l-1.5-1.5L10 7M7.5 13.5a5 5 0 1 0 7.07-7.07 5 5 0 0 0-7.07 7.07z"/>', '%23f59e0b') },
      { id: 'nodemailer', name: 'Nodemailer', category: 'Backend', logo: SvgIcon('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', '%2338bdf8') },
      { id: 'api_error_handling', name: 'API Error Handling', category: 'Backend', logo: SvgIcon('<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>', '%23ef4444') },
    ]
  },
  {
    id: '03',
    title: 'Frontend Development',
    description: 'Responsive interfaces, state flow, and component-driven web applications built for speed and clarity.',
    type: 'technical',
    items: [
      { id: 'react', name: 'React', category: 'Frontend', logo: reactLogo },
      { id: 'vite', name: 'Vite', category: 'Frontend', logo: viteLogo },
      { id: 'tailwindcss', name: 'Tailwind CSS', category: 'Frontend', textFallback: 'TW' },
      { id: 'dom_manipulation', name: 'DOM Manipulation', category: 'Frontend', logo: SvgIcon('<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>', '%2338bdf8') },
      { id: 'responsive_ui', name: 'Responsive UI', category: 'Frontend', logo: SvgIcon('<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><path d="M8 21h8M12 17v4"/>', '%2310b981') },
      { id: 'form_handling', name: 'Form Handling', category: 'Frontend', logo: SvgIcon('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>', '%23f59e0b') },
    ]
  },
  {
    id: '04',
    title: 'Machine Learning & AI',
    description: 'Practical ML models, computer vision pipelines, and recommendation algorithms tested on real datasets.',
    type: 'technical',
    items: [
      { id: 'ml_fundamentals', name: 'Machine Learning Fundamentals', category: 'Machine Learning', logo: SvgIcon('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>', '%2310b981') },
      { id: 'pytorch', name: 'PyTorch', category: 'Machine Learning', logo: SvgIcon('<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>', '%23ee4c2c') },
      { id: 'resnet18', name: 'ResNet18', category: 'Machine Learning', logo: SvgIcon('<rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><path d="M8 2v20"/><path d="M16 2v20"/><path d="M2 8h20"/><path d="M2 16h20"/>', '%233b82f6') },
      { id: 'computer_vision', name: 'Computer Vision', category: 'Machine Learning', logo: SvgIcon('<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>', '%2338bdf8') },
      { id: 'movie_recommendations', name: 'Movie Recommendation Systems', category: 'Machine Learning', logo: SvgIcon('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>', '%23f59e0b') },
    ]
  },
  {
    id: '05',
    title: 'Tools & Deployment',
    description: 'Version control, build tooling, package management, and cloud deployment pipelines powering live services.',
    type: 'technical',
    items: [
      { id: 'git', name: 'Git', category: 'Tool', logo: gitLogo },
      { id: 'github_tool', name: 'GitHub', category: 'Tool', logo: githubLogo },
      { id: 'npm_tool', name: 'npm', category: 'Tool', logo: SvgIcon('<path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>', '%23ef4444') },
      { id: 'render_deployment', name: 'Render Deployment', category: 'Tool', logo: SvgIcon('<path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m16 16-4-4-4 4"/>', '%2346e3b7') },
      { id: 'env_config', name: 'Environment Configuration', category: 'Tool', logo: SvgIcon('<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>', '%2338bdf8') },
    ]
  }
];
