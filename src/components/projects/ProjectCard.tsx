import React from 'react';
import { Panel } from '../ui/Panel';
import type { ProjectLink } from '../../types/project';

export interface ProjectCardProps {
  id: string;
  name: string;
  type?: string;
  status: string;
  description: string;
  technologies?: string[];
  links?: ProjectLink[];
  onClick: () => void;
}

const getStatusBadgeClass = (status: string) => {
  const normalized = status.toUpperCase();
  if (normalized === 'ACTIVE') {
    return 'project-badge-active';
  }
  if (normalized === 'COMPLETED') {
    return 'project-badge-completed';
  }
  return 'border-gray-700 bg-gray-900/50 text-gray-400';
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  status,
  description,
  technologies = [],
  links = [],
  onClick
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View details for ${name}`}
      className="cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary h-full min-h-fit w-full block rounded-sm"
    >
      <Panel
        label={`PROJECT_${id.toUpperCase()}`}
        className="flex flex-col h-full min-h-fit w-full group hover:border-primary/40 transition-colors pointer-events-none"
      >
        <div className="flex flex-col flex-1 h-full min-h-0 pointer-events-auto">
          {/* ── HEADER ── */}
          <div className="flex justify-between items-start gap-4 pb-2 border-b border-gray-800 shrink-0">
            <h2 className="text-gray-100 font-bold text-sm tracking-wider uppercase group-hover:text-primary transition-colors font-mono">
              {name}
            </h2>
            <span
              className={`text-[9px] tracking-widest border px-1.5 py-0.5 shrink-0 uppercase font-mono ${getStatusBadgeClass(
                status
              )}`}
            >
              {status}
            </span>
          </div>

          {/* ── MIDDLE BLOCK ── */}
          <div className="flex-1 py-3 flex flex-col justify-between space-y-3">
            <p className="text-gray-400 text-[11px] leading-relaxed">
              {description}
            </p>

            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-[9px] px-1.5 py-0.5 border border-primary/20 bg-primary/5 text-gray-300 font-mono tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* ── FOOTER ── */}
          <div className="mt-auto pt-2 border-t border-gray-800 flex justify-between items-center shrink-0 min-w-0">
            <div className="flex items-center gap-2">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-[10px] text-gray-400 hover:text-primary font-mono uppercase tracking-wider transition-colors"
                >
                  [{link.label}]
                </a>
              ))}
            </div>

            <span className="text-gray-500 group-hover:text-primary transition-colors text-[10px] whitespace-nowrap font-bold flex items-center gap-1.5 font-mono">
              VIEW DETAILS
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </span>
          </div>
        </div>
      </Panel>
    </div>
  );
};
