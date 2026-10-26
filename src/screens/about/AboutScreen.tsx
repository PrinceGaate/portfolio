import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { AppState } from '../../types/navigation';
import princeProfile from '../../assets/images/prince-profile.jpg';
import { Panel } from '../../components/ui/Panel';
import { useOverlay } from '../../hooks/useOverlay';

interface AboutScreenProps {
  onNavigate: (screen: AppState) => void;
}

// ── Data ────────────────────────────────────────────────────────────────────

const sysFields: { key: string; val: string }[] = [
  { key: 'USER_ID', val: 'PRINCE' },
  { key: 'ROLE', val: 'SOFTWARE DEVELOPER' },
  { key: 'STATUS', val: 'ACTIVE DEVELOPMENT' },
  { key: 'FOCUS', val: 'BACKEND / WEB / AI' },
  { key: 'MODE', val: 'BUILDING' },
  { key: 'INTERESTS', val: 'SOFTWARE / AI / SYS' },
];

const focusAreas: { label: string; items: string }[] = [
  { label: 'BACKEND', items: 'Node.js / Express / REST APIs' },
  { label: 'WEB', items: 'React / Vite / Tailwind CSS' },
  { label: 'AI / ML', items: 'Machine Learning / PyTorch / LLMs' },
  { label: 'SOFTWARE', items: 'Systems / Architecture / DBs' },
];

const educationData = [
  {
    period: '2022—2026',
    degree: "BACHELOR'S DEGREE IN COMPUTER SCIENCE",
    school: 'Samrat Ashok Technological Institute',
    gpa: '7.84'
  },
  {
    period: '2020—2021',
    degree: "HIGHER SECONDARY CERTIFICATE IN SCIENCE",
    school: 'Kendriya Vidyalaya Balaghat',
    gpa: '8.13'
  },
  {
    period: '2018—2019',
    degree: "SECONDARY SCHOOL CERTIFICATE IN SCIENCE",
    school: 'Kendriya Vidyalaya Malanjkhand',
    gpa: '7.85'
  }
];

const techStackGroups: { category: string; items: { name: string; fill: number; total: number; status: 'ACTIVE' | 'LEARNING' | 'EXPLORING' }[] }[] = [
  {
    category: 'LANGUAGES',
    items: [
      { name: 'JavaScript', fill: 8, total: 10, status: 'ACTIVE' },
      { name: 'Python', fill: 7, total: 10, status: 'ACTIVE' },
      { name: 'SQL', fill: 6, total: 10, status: 'ACTIVE' },
      { name: 'HTML/CSS', fill: 7, total: 10, status: 'ACTIVE' },
    ]
  },
  {
    category: 'WEB / BACKEND',
    items: [
      { name: 'React', fill: 6, total: 10, status: 'LEARNING' },
      { name: 'Vite', fill: 5, total: 10, status: 'LEARNING' },
      { name: 'Node.js', fill: 7, total: 10, status: 'ACTIVE' },
      { name: 'Express', fill: 6, total: 10, status: 'LEARNING' },
      { name: 'REST APIs', fill: 7, total: 10, status: 'ACTIVE' },
      { name: 'FastAPI', fill: 4, total: 10, status: 'LEARNING' },
    ]
  },
  {
    category: 'AI / DATA',
    items: [
      { name: 'Machine Learning', fill: 5, total: 10, status: 'ACTIVE' },
      { name: 'PyTorch', fill: 4, total: 10, status: 'LEARNING' },
      { name: 'AI / LLM integration', fill: 5, total: 10, status: 'ACTIVE' },
      { name: 'NumPy', fill: 4, total: 10, status: 'LEARNING' },
      { name: 'Pandas', fill: 4, total: 10, status: 'LEARNING' },
      { name: 'Matplotlib', fill: 3, total: 10, status: 'EXPLORING' },
      { name: 'Seaborn', fill: 3, total: 10, status: 'EXPLORING' },
      { name: 'Scikit-Learn', fill: 3, total: 10, status: 'EXPLORING' },
    ]
  },
  {
    category: 'TOOLS',
    items: [
      { name: 'GitHub', fill: 6, total: 10, status: 'ACTIVE' },
    ]
  }
];

const statusCls: Record<string, string> = {
  ACTIVE: 'text-primary',
  LEARNING: 'text-amber-400',
  EXPLORING: 'text-gray-400',
};

const interests = [
  'Movies / Series',
  'Gaming',
  'Sports',
  'Future Tech',
  'AI / Robotics / Space / Sci-Fi'
];

const beyondCode = [
  {
    role: 'HEAD GRAPHIC DESIGNER',
    org: 'Training & Placement Cell, SATI',
    desc: 'Led design efforts and coordinated with teams for events and initiatives.'
  },
  {
    role: 'GRAPHIC DESIGNER',
    org: 'Entrepreneurship Cell, SATI',
    desc: 'Managed visual design, promotional graphics, event branding and maintained visual identity.'
  }
];

const certs = [
  {
    name: 'NCACSIT 2025',
    desc: 'Presented a team paper on Technology-Driven Rescue and Welfare Systems for Stray Animals.'
  },
  {
    name: 'Smart India Hackathon',
    desc: 'Participated in the institute-level internal hackathon in 2025.'
  },
  {
    name: 'IBM SkillBuild',
    desc: 'Participated in IBM SkillBuild workshop and completed Enterprise Data Science-related certifications.'
  }
];

// ── Photo Lightbox ───────────────────────────────────────────────────────────
const PhotoLightbox: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey, true);
    return () => window.removeEventListener('keydown', handleKey, true);
  }, [handleKey]);

  // When lightbox opens, we want to trap focus. For simplicity, autoFocus on the close button or container.
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Profile photo enlarged view"
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 9999 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/95" />
      <div
        className="relative flex flex-col items-center gap-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[10px] text-primary/60 tracking-widest font-terminal-code">
          PRINCE.OS / USER_PROFILE / PROFILE_IMAGE
        </div>
        <div
          className="relative"
          style={{
            border: '1px solid rgba(51, 255, 51, 0.5)',
            boxShadow: '0 0 20px rgba(51, 255, 51, 0.15)',
          }}
        >
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary" />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary" />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-primary" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-primary" />
          <img
            src={princeProfile}
            alt="Prince Gaate — profile photograph"
            style={{
              display: 'block',
              maxWidth: '85vw',
              maxHeight: '75vh',
              width: 'auto',
              height: 'auto',
              filter: 'none',
            }}
          />
        </div>
        <div className="text-[10px] text-primary/60 tracking-widest font-terminal-code flex items-center gap-3">
          <span>STATUS: ONLINE</span>
          <span className="text-primary/30">|</span>
          <button
            autoFocus
            onClick={onClose}
            className="text-primary/80 hover:text-primary transition-colors focus:outline-none focus:text-primary focus:underline"
          >
            [ ESC ] CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main Component ───────────────────────────────────────────────────────────

export const AboutScreen: React.FC<AboutScreenProps> = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useOverlay(lightboxOpen, () => setLightboxOpen(false), 'about-photo-lightbox');

  // Fix for "OPENS FROM BOTTOM" bug
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">
      {lightboxOpen && <PhotoLightbox onClose={() => setLightboxOpen(false)} />}

      {/* ── Exec lines ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5">
        <span><span className="text-primary mr-1.5">&gt;</span>execute ./about.sh</span>
        <span className="text-gray-500 text-[10px]">Loading user profile... Done.</span>
      </div>

      {/* ── Scrollable content ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 p-1 pb-4 pr-2">

        {/* ══ USER_IDENTITY ══ */}
        <Panel label="USER_IDENTITY">
          <div className="flex flex-col md:flex-row gap-5">
            {/* Left: CRT-treated thumbnail */}
            <div className="shrink-0 flex flex-col items-center gap-2">
              <div className="relative" style={{ width: 140 }}>
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-primary/50 z-10 pointer-events-none" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-primary/50 z-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-primary/50 z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-primary/50 z-10 pointer-events-none" />

                <button
                  onClick={() => setLightboxOpen(true)}
                  aria-label="View profile photo enlarged"
                  className="relative block overflow-hidden cursor-crosshair group focus:outline-none focus:ring-1 focus:ring-primary"
                  style={{ width: 140, height: 160, border: '1px solid rgba(51, 255, 51, 0.2)' }}
                >
                  <img
                    src={princeProfile}
                    alt="Prince Gaate"
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                    style={{ filter: 'grayscale(20%) contrast(1.05) brightness(0.9)' }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)', zIndex: 1 }}
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(51,255,51,0.03)', zIndex: 2 }} />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)', zIndex: 3 }} />
                  <div className="absolute inset-0 flex items-end justify-center pb-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-150 pointer-events-none" style={{ zIndex: 4 }}>
                    <span className="text-[10px] text-primary tracking-widest bg-black/80 px-2 py-0.5 border border-primary/30">
                      [ VIEW ]
                    </span>
                  </div>
                </button>
              </div>

              <div className="text-[10px] text-gray-500 tracking-widest flex flex-col items-center gap-0.5">
                <span>PROFILE_IMAGE</span>
                <span className="text-gray-600">USER_ID: PRINCE</span>
                <span className="flex items-center gap-1.5 mt-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary/80">STATUS: ONLINE</span>
                </span>
              </div>
            </div>

            {/* Right: identity data */}
            <div className="flex-1 flex flex-col gap-3 justify-between min-w-0 py-1">
              <div>
                <h1 className="text-gray-100 font-bold tracking-widest uppercase leading-none mb-1.5" style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }}>
                  PRINCE GAATE
                </h1>
                <div className="text-gray-400 tracking-[0.2em] uppercase text-[11px] mb-3 font-semibold">
                  SOFTWARE DEVELOPER
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="border border-primary/40 text-primary/90 px-2 py-0.5 text-[10px] tracking-widest bg-primary/5">
                    ACTIVE DEVELOPMENT
                  </span>
                  <span className="border border-gray-700 text-gray-400 px-2 py-0.5 text-[10px] tracking-widest">
                    BACKEND / WEB / AI
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-y-1.5 border-t border-gray-800 pt-3">
                {sysFields.map(({ key, val }) => (
                  <div key={key} className="flex gap-3 text-[11px]">
                    <span className="text-gray-500 w-24 shrink-0 tracking-widest">{key}</span>
                    <span className="text-gray-300 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Panel>

        {/* ══ ROW 2: ABOUT.MD & INTERESTS.LOG ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Panel label="ABOUT.MD">
            <div className="space-y-3 text-[12px] leading-relaxed text-gray-300">
              <p>
                I’m Prince, a Computer Science graduate interested in building practical software, understanding how systems work, and exploring the intersection of web development and AI.
              </p>
              <p>
                I enjoy taking an idea from a rough concept to a working system — designing APIs, working with databases, building interfaces, and integrating AI where it actually adds value.
              </p>
              <p>
                Currently strengthening my software engineering foundations while building with JavaScript, Python, SQL, React, Node.js and AI/LLM technologies.
              </p>
            </div>
          </Panel>

          <Panel label="INTERESTS.LOG">
            <div className="flex flex-wrap gap-2">
              {interests.map(item => (
                <span key={item} className="border border-gray-700 bg-gray-900/50 text-gray-400 px-2.5 py-1 text-[11px]">
                  {item}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-[11px] mt-4 leading-relaxed italic">
              Outside of coding, I’m a movie and series enthusiast, enjoy gaming and sports, and have a strong interest in future technologies, robotics, space and science fiction.
            </p>
          </Panel>
        </div>

        {/* ══ ROW 3: CURRENT_FOCUS & BEYOND_CODE ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Panel label="CURRENT_FOCUS">
            <ul className="flex flex-col gap-2">
              {focusAreas.map((area) => (
                <li key={area.label} className="grid grid-cols-[80px_1fr] items-start gap-2">
                  <span className="text-primary/70 tracking-widest text-[10px] pt-0.5">
                    {area.label}
                  </span>
                  <span className="text-gray-400 text-[11px] leading-snug">
                    {area.items}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel label="BEYOND_CODE">
            <div className="flex flex-col gap-4">
              {beyondCode.map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-primary/80 tracking-widest text-[11px] font-bold">{item.role}</span>
                  </div>
                  <div className="text-gray-400 text-[10px] tracking-wider uppercase">{item.org}</div>
                  <div className="text-gray-400 text-[11px] leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* ══ ROW 4: CERTS.LOG ══ */}
        <Panel label="CERTS.LOG">
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {certs.map((cert, i) => (
              <li key={i} className="flex flex-col gap-1">
                <div className="flex items-start gap-1.5">
                  <span className="text-primary/50 text-[10px] pt-0.5">&gt;</span>
                  <span className="text-gray-200 tracking-wider text-[11px] font-bold">{cert.name}</span>
                </div>
                <p className="text-gray-400 text-[11px] leading-relaxed pl-3">
                  {cert.desc}
                </p>
              </li>
            ))}
          </ul>
        </Panel>

        {/* ══ ROW 5: EDU.DAT & TECH_STACK ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Panel label="EDU.DAT">
            <div className="flex flex-col gap-5">
              {educationData.map((edu, idx) => (
                <div key={idx} className="flex flex-col gap-1 relative pl-6 border-l border-primary/20">
                  <span className="absolute -left-[14px] top-0 bg-[#050505] text-primary/60 text-[9px] px-0.5 tracking-widest">
                    [{String(idx + 1).padStart(2, '0')}]
                  </span>
                  <div className="text-gray-500 text-[10px] tracking-widest">{edu.period}</div>
                  <div className="text-primary/90 font-bold tracking-wider text-[11px] uppercase mt-0.5">{edu.degree}</div>
                  <div className="text-gray-300 text-[11px]">{edu.school}</div>
                  <div className="text-gray-400 text-[10px] mt-0.5">GPA: <span className="text-gray-200">{edu.gpa}</span></div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel label="TECH_STACK">
            <div className="flex flex-col gap-4">
              {techStackGroups.map((group) => (
                <div key={group.category} className="flex flex-col gap-1.5">
                  <div className="text-[10px] text-primary/50 tracking-widest border-b border-gray-800/50 pb-0.5">{group.category}</div>
                  <div className="flex flex-col gap-1">
                    {group.items.map(tech => (
                      <div key={tech.name} className="flex items-center justify-between text-[11px]">
                        <span className="text-gray-300 w-28 shrink-0 truncate">{tech.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-terminal-code tracking-tight text-primary/80">
                            {'■'.repeat(tech.fill)}
                            <span className="text-gray-700">{'□'.repeat(tech.total - tech.fill)}</span>
                          </span>
                          <span className={`text-[9px] w-[50px] text-right tracking-widest ${statusCls[tech.status]}`}>
                            {tech.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-gray-800/50 text-[9px] tracking-widest justify-between">
              <span className="text-gray-500 flex items-center gap-1.5">
                <span className="font-terminal-code tracking-tight text-primary/80">■■■■</span> ACTIVE / CURRENT
              </span>
              <span className="text-gray-500 flex items-center gap-1.5">
                <span className="font-terminal-code tracking-tight"><span className="text-primary/80">■■■</span><span className="text-gray-700">□</span></span> DEVELOPING
              </span>
              <span className="text-gray-500 flex items-center gap-1.5">
                <span className="font-terminal-code tracking-tight"><span className="text-primary/80">■■</span><span className="text-gray-700">□□</span></span> EXPLORING
              </span>
            </div>
          </Panel>
        </div>

        {/* Terminal cursor */}
        <div className="flex items-center gap-1.5 text-gray-500 px-0.5 text-[11px] mt-1">
          <span>&gt;</span>
        </div>

      </div>
    </div>
  );
};
