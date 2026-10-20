import React, { useEffect, useRef, useState } from 'react';
import { CommandPrompt } from '../../components/terminal/CommandPrompt';
import { Panel } from '../../components/ui/Panel';
import { ProjectCard, ProjectDetailModal } from '../../components/projects';
import { projectsData } from '../../data/projectsData';
import type { ProjectData } from '../../types/project';
import type { AppState } from '../../types/navigation';

interface ProjectsScreenProps {
  onNavigate: (screen: AppState) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* ── Exec lines ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5 border-b border-primary/10 mb-2">
        <span>
          <span className="text-primary mr-1.5">&gt;</span>execute ./projects.exe
        </span>
        <span className="text-gray-500 text-[10px]">
          Loading technical specifications and architecture diagrams... Done.
        </span>
      </div>

      {/* ── Scrollable content ── */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 p-1 pb-4 pr-2"
      >
        {/* Status Panel */}
        <Panel label="SYSTEM_RECORDS">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-1">
            <div>
              <h1
                className="text-gray-100 font-bold tracking-widest uppercase leading-none mb-1.5 font-mono"
                style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }}
              >
                PROJECTS.EXE
              </h1>
              <p className="text-gray-400 tracking-[0.1em] text-[11px] font-mono">
                Production systems, deep learning research pipelines, and technical architecture specifications.
              </p>
            </div>

            <div className="flex gap-4 text-[10px] tracking-widest font-mono">
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">TOTAL_PROJECTS</span>
                <span className="text-primary/90 font-bold">
                  {String(projectsData.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">SYSTEM_INDEX</span>
                <span className="text-primary/90 font-bold animate-pulse">VERIFIED</span>
              </div>
            </div>
          </div>
        </Panel>

        {/* Projects List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projectsData.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              type={project.type}
              status={project.status}
              description={project.description}
              technologies={project.technologies}
              links={project.links}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Footer Command Prompt */}
      <CommandPrompt onNavigate={onNavigate} />
    </div>
  );
};
