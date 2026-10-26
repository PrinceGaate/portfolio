import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { Panel } from '../ui/Panel';
import { getProjectMedia, type ProjectMediaItem } from '../../generated/projectMedia';
import { useOverlay } from '../../hooks/useOverlay';
import type { ProjectData } from '../../types/project';

export type { ProjectData };

interface ProjectDetailModalProps {
  project: ProjectData;
  onClose: () => void;
}

const getCollagePosition = (index: number, total: number) => {
  if (total === 1) {
    return { left: '12%', top: '12%', width: '76%', height: '76%', rotate: '-1.5deg' };
  }
  if (total === 2) {
    const twoPositions = [
      { left: '8%', top: '10%', width: '60%', height: '56%', rotate: '-3deg' },
      { left: '32%', top: '34%', width: '60%', height: '56%', rotate: '2.5deg' },
    ];
    return twoPositions[index];
  }
  if (total === 3) {
    const threePositions = [
      { left: '10%', top: '8%', width: '48%', height: '42%', rotate: '-4deg' },
      { left: '44%', top: '24%', width: '46%', height: '44%', rotate: '3deg' },
      { left: '18%', top: '50%', width: '50%', height: '40%', rotate: '-2deg' },
    ];
    return threePositions[index];
  }
  const multiPositions = [
    { left: '6%', top: '6%', width: '46%', height: '40%', rotate: '-4deg' },
    { left: '48%', top: '8%', width: '46%', height: '40%', rotate: '3.5deg' },
    { left: '10%', top: '48%', width: '48%', height: '42%', rotate: '-2.5deg' },
    { left: '46%', top: '46%', width: '48%', height: '42%', rotate: '3deg' },
    { left: '26%', top: '26%', width: '48%', height: '42%', rotate: '-1deg' },
    { left: '18%', top: '16%', width: '45%', height: '39%', rotate: '2deg' },
    { left: '38%', top: '36%', width: '45%', height: '39%', rotate: '-3deg' },
    { left: '22%', top: '42%', width: '47%', height: '41%', rotate: '1.5deg' },
  ];
  return multiPositions[index % multiPositions.length];
};

const getModalStatusBadgeClass = (status: string) => {
  const normalized = status.toUpperCase();
  if (normalized === 'ACTIVE') {
    return 'project-badge-active';
  }
  if (normalized === 'COMPLETED') {
    return 'project-badge-completed';
  }
  return 'border-gray-700 bg-gray-900 text-gray-400 shadow-[0_0_10px_rgba(0,0,0,0.5)]';
};

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [activeMediaIndex, setActiveMediaIndex] = useState<number>(0);
  const [zoomedMediaIndex, setZoomedMediaIndex] = useState<number | null>(null);
  const [imageScale, setImageScale] = useState<number>(1);

  // Register main project modal overlay
  useOverlay(true, onClose, `project-modal-${project.id}`);

  // Register nested image zoom overlay so Android Back closes zoom first
  useOverlay(
    zoomedMediaIndex !== null,
    () => {
      setZoomedMediaIndex(null);
      setImageScale(1);
    },
    `project-zoom-${project.id}`
  );

  // Automatically load media items from the project's folder manifest
  const mediaItems: ProjectMediaItem[] = useMemo(() => {
    const discovered = getProjectMedia(project.id);
    if (discovered && discovered.length > 0) {
      return discovered;
    }
    if (project.images && project.images.length > 0) {
      return project.images.map((src, idx) => ({
        id: `${project.id}-legacy-${idx}`,
        projectSlug: project.id,
        type: 'image',
        src,
        filename: src.split('/').pop() || `image-${idx}`,
        title: `Asset ${idx + 1}`
      }));
    }
    return [];
  }, [project.id, project.images]);

  // Circular navigation for zoomed preview
  const handlePrevZoom = useCallback(() => {
    if (zoomedMediaIndex !== null && mediaItems.length > 0) {
      setZoomedMediaIndex((prev) => (prev === 0 ? mediaItems.length - 1 : (prev as number) - 1));
      setImageScale(1);
    }
  }, [zoomedMediaIndex, mediaItems.length]);

  const handleNextZoom = useCallback(() => {
    if (zoomedMediaIndex !== null && mediaItems.length > 0) {
      setZoomedMediaIndex((prev) => (prev === mediaItems.length - 1 ? 0 : (prev as number) + 1));
      setImageScale(1);
    }
  }, [zoomedMediaIndex, mediaItems.length]);

  const increaseScale = () => setImageScale((prev) => Math.min(prev + 0.15, 2.0));
  const decreaseScale = () => setImageScale((prev) => Math.max(prev - 0.15, 0.5));
  const resetScale = () => setImageScale(1);

  // Keyboard navigation & closing
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        if (zoomedMediaIndex !== null) {
          setZoomedMediaIndex(null);
          setImageScale(1);
        } else {
          onClose();
        }
      } else if (zoomedMediaIndex !== null && mediaItems.length > 1) {
        if (e.key === 'ArrowLeft') handlePrevZoom();
        if (e.key === 'ArrowRight') handleNextZoom();
      }
    },
    [onClose, zoomedMediaIndex, mediaItems.length, handlePrevZoom, handleNextZoom]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKey, true);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const currentZoomedItem = zoomedMediaIndex !== null ? mediaItems[zoomedMediaIndex] : null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/95 font-terminal-code text-gray-300 p-1 sm:p-3 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
      onClick={() => {
        if (zoomedMediaIndex !== null) setZoomedMediaIndex(null);
        else onClose();
      }}
    >
      {/* Dimmed Background for Zoom */}
      <div
        className={`fixed inset-0 bg-black/90 z-[100000] transition-opacity duration-300 ease-out ${
          zoomedMediaIndex !== null ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => {
          e.stopPropagation();
          setZoomedMediaIndex(null);
          setImageScale(1);
        }}
      />

      <div
        className="w-full max-w-[1400px] h-full flex flex-col os-scanlines-container relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 min-h-0 flex flex-col bg-[#080b08] border border-primary/30 shadow-[0_0_30px_rgba(51,255,51,0.05)] relative overflow-hidden">
          {/* ── Header ── */}
          <div className="shrink-0 flex justify-between items-start gap-4 p-4 sm:p-6 border-b border-primary/20 bg-primary/5">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-primary/70 tracking-widest text-[10px] mb-2 uppercase font-mono">
                <span>PRINCE.OS / PROJECTS / {project.id}</span>
              </div>
              <h1 className="text-gray-100 font-bold text-2xl sm:text-3xl tracking-widest uppercase font-mono">
                {project.name}
              </h1>
              <div className="text-gray-400 tracking-wider uppercase text-xs mt-1 font-mono">
                {project.type}
              </div>

              {/* Action Buttons Directly Below Subtitle */}
              {project.links && project.links.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mt-3">
                  {project.links.map((link, idx) => {
                    const isDeployment =
                      link.label.toLowerCase() === 'deployment' ||
                      link.label.toLowerCase() === 'live demo';
                    const isGitHub = link.label.toLowerCase() === 'github';

                    const btnClass = isDeployment
                      ? 'project-action-primary focus:ring-sky-400'
                      : isGitHub
                      ? 'project-action-secondary focus:ring-gray-300'
                      : 'border-primary/30 bg-primary/10 text-primary hover:text-white transition-colors focus:ring-primary';

                    return (
                      <a
                        key={idx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 border px-3 py-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase focus:outline-none focus:ring-1 ${btnClass}`}
                      >
                        [{link.label}]
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="flex flex-col items-end gap-2 shrink-0">
              <button
                onClick={onClose}
                className="text-primary/70 hover:text-primary transition-colors text-[10px] tracking-widest focus:outline-none focus:underline uppercase flex items-center gap-1.5 font-mono"
                autoFocus
              >
                [ ESC ] CLOSE
              </button>
              <span
                className={`text-[10px] tracking-widest border px-2 py-1 uppercase mt-2 font-mono ${getModalStatusBadgeClass(
                  project.status
                )}`}
              >
                {project.status}
              </span>
            </div>
          </div>

          {/* ── Main Content Area: Single Scrollable View ── */}
          <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar p-4 sm:p-6 flex flex-col">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">
              {/* Left Column: Project Documentation & Details */}
              <div className="lg:col-span-7 flex flex-col h-full min-h-0">
                <Panel label="PROJECT.MD" className="flex-1 min-h-0 flex flex-col">
                  <div className="h-full flex flex-col justify-start space-y-5 text-xs leading-relaxed text-gray-300 overflow-y-auto custom-scrollbar pr-2 font-mono">
                    {/* A. Project Overview */}
                    <div>
                      <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold block mb-1.5 font-mono">
                        PROJECT_OVERVIEW
                      </span>
                      <p className="text-gray-200 text-xs leading-relaxed">
                        {project.overview || project.description}
                      </p>
                    </div>

                    {/* B. How It Works (Workflow Steps) */}
                    {project.workflow && project.workflow.length > 0 && (
                      <div className="pt-3 border-t border-primary/10">
                        <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold block mb-2 font-mono">
                          HOW_IT_WORKS
                        </span>
                        <div className="space-y-2">
                          {project.workflow.map((item) => (
                            <div
                              key={item.step}
                              className="p-2.5 bg-black/60 border border-gray-800 rounded-sm text-[11px]"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-primary font-bold">
                                  0{item.step}.
                                </span>
                                <span className="text-gray-200 font-semibold uppercase">
                                  {item.title}
                                </span>
                              </div>
                              <p className="text-gray-400 leading-relaxed pl-5">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* C. Simple Visual Flowchart */}
                    {project.flowchart && project.flowchart.length > 0 && (
                      <div className="pt-3 border-t border-primary/10">
                        <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold block mb-2 font-mono">
                          SYSTEM_FLOWCHART
                        </span>
                        <div className="flex flex-wrap items-center gap-2 p-3 bg-black/70 border border-primary/20 rounded-sm overflow-x-auto custom-scrollbar">
                          {project.flowchart.map((node, idx) => (
                            <React.Fragment key={idx}>
                              <div className="px-2.5 py-2 border border-primary/30 bg-primary/5 text-gray-200 text-[11px] font-mono rounded-sm flex flex-col items-center shadow-[0_0_8px_rgba(51,255,51,0.05)] min-w-[110px] text-center">
                                <div className="flex items-center gap-1.5 mb-1">
                                  <span className="text-[8px] text-primary/70 font-bold uppercase tracking-wider font-mono">
                                    {node.stage}
                                  </span>
                                  {node.layer && (
                                    <span className="text-[7px] px-1 py-0.2 border border-primary/30 text-primary/80 uppercase tracking-widest font-mono">
                                      {node.layer}
                                    </span>
                                  )}
                                </div>
                                <span className="font-semibold text-gray-200 text-xs">
                                  {node.label}
                                </span>
                                {node.detail && (
                                  <span className="text-[9px] text-gray-400 mt-0.5 leading-tight">
                                    {node.detail}
                                  </span>
                                )}
                              </div>
                              {idx < project.flowchart.length - 1 && (
                                <span className="text-primary font-bold text-sm select-none px-0.5">
                                  →
                                </span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* D. Key Implementation */}
                    {project.keyImplementation && (
                      <div className="pt-3 border-t border-primary/10">
                        <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold block mb-1.5 font-mono">
                          KEY_IMPLEMENTATION
                        </span>
                        <p className="text-gray-300 text-[11px] leading-relaxed">
                          {project.keyImplementation}
                        </p>
                      </div>
                    )}

                    {/* Technologies Stack Manifest */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="pt-3 border-t border-primary/10">
                        <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold block mb-2 font-mono">
                          STACK_MANIFEST
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] border border-primary/20 bg-primary/5 text-gray-300 px-2 py-0.5 tracking-wider font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Future Improvements */}
                    {project.futureImprovements && (
                      <div className="pt-3 border-t border-primary/10 text-[11px]">
                        <span className="text-[10px] text-gray-500 tracking-widest uppercase font-bold block mb-1 font-mono">
                          PLANNED_ROADMAP
                        </span>
                        <p className="text-gray-400">
                          {project.futureImprovements}
                        </p>
                      </div>
                    )}
                  </div>
                </Panel>
              </div>

              {/* Right Column: Image & Video Collage / Mobile Gallery (Visual Assets) */}
              <div className="lg:col-span-5 relative flex flex-col rounded border border-gray-800 bg-black/40 p-2 sm:p-3 lg:p-0 lg:flex-1 lg:h-full lg:items-center lg:justify-center overflow-hidden">
                {/* Visual Assets Header */}
                <div className="p-2.5 w-full flex justify-between items-center z-40 lg:absolute lg:top-0 lg:left-0 pointer-events-none">
                  <span className="text-primary/50 text-[9px] tracking-widest font-mono">
                    VISUAL_ASSETS.SYS
                  </span>
                  {mediaItems.length > 0 && (
                    <span className="text-gray-500 text-[9px] tracking-widest font-mono">
                      {mediaItems.length} {mediaItems.length === 1 ? 'FILE' : 'FILES'}
                    </span>
                  )}
                </div>

                {/* ═══ Zoomed Preview Modal (Images & Native Video Player) ═══ */}
                {zoomedMediaIndex !== null && currentZoomedItem && (
                  <div
                    className="fixed inset-0 z-[100002] flex flex-col items-center justify-between p-2 sm:p-4 lg:p-6 select-none bg-black/95"
                    onClick={(e) => {
                      e.stopPropagation();
                      setZoomedMediaIndex(null);
                      setImageScale(1);
                    }}
                  >
                    {/* Top Controls & Info Bar */}
                    <div className="w-full max-w-[1300px] shrink-0 flex justify-between items-center gap-2 px-1 sm:px-2 py-1 z-10">
                      <div className="pointer-events-auto bg-black/90 px-2 sm:px-3 py-1 sm:py-1.5 border border-primary/40 text-primary/80 text-[9px] sm:text-[10px] tracking-widest uppercase font-mono flex items-center gap-1.5 sm:gap-2 truncate max-w-[65%] sm:max-w-none">
                        <span className="shrink-0">
                          {zoomedMediaIndex + 1}/{mediaItems.length}
                        </span>
                        <span className="text-primary/40 shrink-0">|</span>
                        <span className="text-gray-300 font-bold truncate max-w-[110px] sm:max-w-[240px]">
                          {currentZoomedItem.filename}
                        </span>
                        <span className="text-[8px] sm:text-[9px] px-1 border border-primary/30 text-primary/70 shrink-0 hidden xs:inline">
                          {currentZoomedItem.type.toUpperCase()}
                        </span>
                      </div>

                      <div className="flex gap-1.5 sm:gap-2 pointer-events-auto items-center text-primary/80 text-[10px] tracking-widest font-bold bg-black/95 px-2 py-1 sm:py-1.5 border border-primary/40 shadow-[0_0_15px_rgba(0,0,0,0.8)] font-mono">
                        {currentZoomedItem.type === 'image' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseScale();
                              }}
                              className="px-2 sm:px-2.5 py-0.5 hover:text-white transition-colors disabled:opacity-30 focus:outline-none focus:text-white"
                              disabled={imageScale <= 0.5}
                              title="Zoom out"
                              aria-label="Zoom out"
                            >
                              -
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                resetScale();
                              }}
                              className="px-2 sm:px-2.5 py-0.5 hover:text-white transition-colors border-l border-r border-primary/40 focus:outline-none focus:text-white"
                              title="Reset scale"
                              aria-label="Reset scale"
                            >
                              RST
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseScale();
                              }}
                              className="px-2 sm:px-2.5 py-0.5 hover:text-white transition-colors disabled:opacity-30 focus:outline-none focus:text-white"
                              disabled={imageScale >= 2.0}
                              title="Zoom in"
                              aria-label="Zoom in"
                            >
                              +
                            </button>
                          </>
                        )}

                        {currentZoomedItem.type === 'video' && (
                          <span className="text-[9px] text-primary/60 tracking-widest px-1 sm:px-2 uppercase">
                            VIDEO
                          </span>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setZoomedMediaIndex(null);
                            setImageScale(1);
                          }}
                          className="px-2 sm:px-2.5 py-0.5 ml-1 border-l border-primary/40 hover:text-white transition-colors focus:outline-none focus:text-white"
                          title="Close preview"
                          aria-label="Close preview"
                        >
                          [X]
                        </button>
                      </div>
                    </div>

                    {/* Middle: Centered Large Media Container */}
                    <div
                      className="relative w-full flex-1 min-h-0 flex items-center justify-center my-1 sm:my-2 px-1 sm:px-14 lg:px-20"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {mediaItems.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevZoom();
                          }}
                          className="absolute left-1 sm:left-4 z-20 p-2 sm:p-3.5 border border-primary/40 text-primary/80 hover:text-white hover:bg-primary/20 hover:border-primary transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-primary bg-black/85 shadow-[0_0_20px_rgba(0,0,0,0.9)] cursor-pointer"
                          aria-label="Previous item (wraps to last)"
                          title="Previous item"
                        >
                          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                      )}

                      {currentZoomedItem.type === 'image' ? (
                        <div
                          className="relative max-w-full max-h-[75vh] sm:max-h-[85vh] w-auto max-w-[1250px] flex items-center justify-center border border-primary/40 bg-[#080b08] shadow-[0_0_50px_rgba(51,255,51,0.1)] overflow-hidden transition-transform duration-300 ease-out"
                          style={{ transform: `scale(${imageScale})` }}
                        >
                          <img
                            src={currentZoomedItem.src}
                            alt={`${project.name} - ${currentZoomedItem.title}`}
                            className="max-h-[75vh] sm:max-h-[85vh] max-w-full w-auto h-auto object-contain block select-none"
                          />
                        </div>
                      ) : (
                        <div className="relative max-w-full max-h-[75vh] sm:max-h-[85vh] w-auto max-w-[1250px] flex items-center justify-center border border-primary/40 bg-[#080b08] shadow-[0_0_50px_rgba(51,255,51,0.15)] overflow-hidden">
                          <video
                            key={currentZoomedItem.src}
                            src={currentZoomedItem.src}
                            poster={currentZoomedItem.poster}
                            controls
                            playsInline
                            preload="metadata"
                            className="max-h-[75vh] sm:max-h-[85vh] max-w-full w-auto h-auto object-contain block bg-black"
                          >
                            <p className="text-gray-400 p-4 text-xs">
                              Your browser does not support HTML5 video playback.
                            </p>
                          </video>
                        </div>
                      )}

                      {mediaItems.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextZoom();
                          }}
                          className="absolute right-1 sm:right-4 z-20 p-2 sm:p-3.5 border border-primary/40 text-primary/80 hover:text-white hover:bg-primary/20 hover:border-primary transition-all rounded-full focus:outline-none focus:ring-1 focus:ring-primary bg-black/85 shadow-[0_0_20px_rgba(0,0,0,0.9)] cursor-pointer"
                          aria-label="Next item (wraps to first)"
                          title="Next item"
                        >
                          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══ Gallery Views Or Empty State ═══ */}
                {mediaItems.length === 0 ? (
                  <div className="w-full h-full min-h-[180px] lg:min-h-[300px] flex flex-col items-center justify-center p-6 text-center text-gray-500 gap-2.5">
                    <span className="text-xs tracking-widest text-primary/70 font-bold uppercase font-mono">
                      NO MEDIA LINKED
                    </span>
                    <p className="text-[11px] text-gray-400 max-w-[280px] leading-relaxed font-mono">
                      Visual captures for this project are currently pending or in progress.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* A. Responsive Mobile Gallery (Horizontal Scroll with Snap, no overlapping) */}
                    <div className="flex lg:hidden flex-col w-full gap-2 pt-1 pb-2">
                      <div className="flex items-center justify-between text-[10px] text-primary/70 tracking-widest font-mono px-1">
                        <span>GALLERY_PREVIEW [{mediaItems.length}]</span>
                        <span className="text-[9px] text-gray-500 font-mono">[SWIPE • TAP TO ZOOM]</span>
                      </div>

                      <div className="flex gap-3 overflow-x-auto custom-scrollbar snap-x snap-mandatory py-1 px-1 -mx-1">
                        {mediaItems.map((item, index) => {
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => {
                                setActiveMediaIndex(index);
                                setZoomedMediaIndex(index);
                                setImageScale(1);
                              }}
                              className="snap-center shrink-0 w-[80vw] max-w-[320px] aspect-[16/10] bg-[#0c0c0c] border border-primary/30 rounded-sm overflow-hidden relative flex items-center justify-center group focus:outline-none focus:ring-1 focus:ring-primary shadow-[0_0_15px_rgba(0,0,0,0.7)]"
                              aria-label={`View ${item.type}: ${item.title}`}
                            >
                              {item.type === 'video' ? (
                                <div className="relative w-full h-full bg-black flex items-center justify-center">
                                  {item.poster ? (
                                    <img
                                      src={item.poster}
                                      alt={item.title}
                                      className="w-full h-full object-cover pointer-events-none"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <video
                                      src={item.src}
                                      preload="metadata"
                                      muted
                                      className="w-full h-full object-cover pointer-events-none"
                                    />
                                  )}
                                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors pointer-events-none">
                                    <div className="w-9 h-9 rounded-full bg-black/85 border border-primary/70 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(51,255,51,0.3)]">
                                      <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="absolute bottom-1.5 left-1.5 bg-black/85 border border-primary/30 px-1.5 py-0.5 text-[8px] text-primary/80 tracking-widest font-mono uppercase pointer-events-none">
                                    VIDEO
                                  </div>
                                </div>
                              ) : (
                                <div className="relative w-full h-full bg-black flex items-center justify-center p-1.5">
                                  <img
                                    src={item.src}
                                    alt={`${project.name} - ${item.title}`}
                                    className="max-h-full max-w-full w-auto h-auto object-contain block select-none"
                                    loading="lazy"
                                  />
                                  <div className="absolute bottom-1.5 left-1.5 bg-black/85 border border-primary/30 px-1.5 py-0.5 text-[8px] text-primary/80 tracking-widest font-mono uppercase pointer-events-none">
                                    IMG {index + 1}/{mediaItems.length}
                                  </div>
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {mediaItems.length > 1 && (
                        <div className="flex justify-center items-center gap-1.5 pt-1">
                          {mediaItems.map((_, i) => (
                            <span
                              key={i}
                              className={`inline-block w-1.5 h-1.5 rounded-full transition-colors ${
                                activeMediaIndex === i ? 'bg-primary shadow-[0_0_6px_#33ff33]' : 'bg-gray-700'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* B. Original Desktop Collage View (Preserved for lg screens) */}
                    <div className="hidden lg:flex relative w-full max-w-[540px] aspect-square lg:aspect-auto h-full max-h-[92%] items-center justify-center p-4">
                      {mediaItems.map((item, index) => {
                        const pos = getCollagePosition(index, mediaItems.length);
                        const isActive = activeMediaIndex === index;
                        const baseZIndex = (index + 1) * 2;

                        const positionClass = `absolute focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer group ${
                          isActive
                            ? 'z-50 shadow-[0_15px_40px_rgba(0,0,0,0.9)]'
                            : 'shadow-[0_5px_15px_rgba(0,0,0,0.6)] hover:z-40'
                        }`;

                        const style: React.CSSProperties = {
                          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                          zIndex: isActive ? 50 : baseZIndex,
                          left: pos.left,
                          top: pos.top,
                          width: pos.width,
                          height: pos.height,
                          transform: `translate(${isActive ? '0, -4%' : '0, 0'}) rotate(${
                            isActive ? '0deg' : pos.rotate
                          }) scale(${isActive ? 1.04 : 1})`,
                          border: `1px solid ${isActive ? 'rgba(51, 255, 51, 0.6)' : 'rgba(100, 100, 100, 0.35)'}`,
                          backgroundColor: '#0a0a0a',
                          filter: isActive ? 'brightness(1) grayscale(0)' : 'brightness(0.7) grayscale(0.5)',
                        };

                        return (
                          <button
                            key={item.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMediaIndex(index);
                              setZoomedMediaIndex(index);
                              setImageScale(1);
                            }}
                            className={`overflow-hidden rounded-sm ${positionClass}`}
                            style={style}
                            aria-label={`View ${item.type}: ${item.title}`}
                          >
                            {item.type === 'video' ? (
                              <div className="relative w-full h-full bg-black flex items-center justify-center">
                                {item.poster ? (
                                  <img
                                    src={item.poster}
                                    alt={item.title}
                                    className="w-full h-full object-cover pointer-events-none"
                                    loading="lazy"
                                  />
                                ) : (
                                  <video
                                    src={item.src}
                                    preload="metadata"
                                    muted
                                    className="w-full h-full object-cover pointer-events-none"
                                  />
                                )}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/10 transition-colors pointer-events-none">
                                  <div className="w-8 h-8 rounded-full bg-black/85 border border-primary/70 flex items-center justify-center text-primary shadow-[0_0_12px_rgba(51,255,51,0.3)]">
                                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z" />
                                    </svg>
                                  </div>
                                </div>
                                <div className="absolute bottom-1 left-1 bg-black/85 border border-primary/30 px-1.5 py-0.2 text-[8px] text-primary/80 tracking-widest font-mono uppercase pointer-events-none">
                                  VIDEO
                                </div>
                              </div>
                            ) : (
                              <img
                                src={item.src}
                                alt={`${project.name} - ${item.title}`}
                                className="w-full h-full object-cover pointer-events-none select-none"
                                loading="lazy"
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Footer Action Bar ── */}
          <div className="shrink-0 p-3 border-t border-primary/20 bg-black/60 flex justify-between items-center text-[10px] tracking-widest font-mono">
            <span className="text-gray-600 pl-2">END OF FILE</span>
            <span className="text-primary/70 uppercase">STATUS: {project.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
