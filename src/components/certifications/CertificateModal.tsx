import React, { useEffect, useCallback, useState, useRef } from 'react';
import type { CertificateItem } from '../../data/certificationsData';

interface CertificateModalProps {
  certificate: CertificateItem;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose, triggerElement }) => {
  const images = Array.isArray(certificate.images) ? certificate.images : [];
  const hasImages = images.length > 0;
  const hasMultiple = images.length > 1;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [scale, setScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const isCurrentImageValid = hasImages && !imageErrors[currentIndex];

  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const panStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hasMovedRef = useRef<boolean>(false);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(
    triggerElement || (typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null)
  );

  // Keep triggerElement updated in ref if provided
  useEffect(() => {
    if (triggerElement) {
      previousFocusRef.current = triggerElement;
    }
  }, [triggerElement]);

  // Focus close button on mount
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Restore focus to the element that triggered the modal upon closing (unmount only)
  useEffect(() => {
    return () => {
      const opener = previousFocusRef.current;
      if (opener && typeof opener.focus === 'function') {
        requestAnimationFrame(() => {
          if (document.body.contains(opener)) {
            opener.focus();
          }
        });
      }
    };
  }, []);

  // Zoom helpers
  const increaseScale = useCallback(() => {
    setScale((prev) => {
      const next = Math.min(Number((prev + 0.2).toFixed(2)), 2.6);
      return next;
    });
  }, []);

  const decreaseScale = useCallback(() => {
    setScale((prev) => {
      const next = Math.max(Number((prev - 0.2).toFixed(2)), 0.6);
      if (next <= 1) {
        setPan({ x: 0, y: 0 });
      }
      return next;
    });
  }, []);

  const resetScale = useCallback(() => {
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const toggleZoom = useCallback(() => {
    if (scale > 1) {
      resetScale();
    } else {
      setScale(1.6);
      setPan({ x: 0, y: 0 });
    }
  }, [scale, resetScale]);

  // Image cycling
  const handleNext = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, [hasMultiple, images.length]);

  const handlePrev = useCallback(() => {
    if (!hasMultiple) return;
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
    setPan({ x: 0, y: 0 });
  }, [hasMultiple, images.length]);

  // Keyboard navigation & closing
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        onClose();
      } else if (e.key === 'ArrowRight' && hasMultiple) {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft' && hasMultiple) {
        e.preventDefault();
        handlePrev();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        increaseScale();
      } else if (e.key === '-') {
        e.preventDefault();
        decreaseScale();
      } else if (e.key === '0') {
        e.preventDefault();
        resetScale();
      }
    },
    [onClose, hasMultiple, handleNext, handlePrev, increaseScale, decreaseScale, resetScale]
  );

  // Prevent background scrolling while open & attach capture keydown
  useEffect(() => {
    window.addEventListener('keydown', handleKey, true);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKey, true);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleKey]);

  // Mouse drag handlers for panning when zoomed in
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
    setIsDraggingState(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
    }
  };

  // Touch drag handlers for mobile devices
  const handleTouchStart = (e: React.TouchEvent) => {
    if (scale <= 1 || e.touches.length !== 1) return;
    const touch = e.touches[0];
    isDraggingRef.current = true;
    hasMovedRef.current = false;
    dragStartRef.current = { x: touch.clientX, y: touch.clientY };
    panStartRef.current = { ...pan };
    setIsDraggingState(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    const dy = touch.clientY - dragStartRef.current.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMovedRef.current = true;
    }
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy,
    });
  };

  const handleTouchEnd = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (!isCurrentImageValid) return;
    if (e.deltaY < 0) {
      increaseScale();
    } else {
      decreaseScale();
    }
  };

  // Close when clicking dimmed backdrop, unless user just finished dragging
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      hasMovedRef.current = false;
      return;
    }
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const currentAlt =
    certificate.imageAlts?.[currentIndex] ||
    `${certificate.title} credential artifact ${hasMultiple ? `${currentIndex + 1} of ${images.length}` : ''}`;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/95 backdrop-blur-sm font-terminal-code text-gray-300 p-2 sm:p-4 lg:p-6 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate details: ${certificate.title}`}
      onClick={onClose}
    >
      <div
        className="w-full max-w-[1300px] max-h-[95vh] h-full flex flex-col os-scanlines-container relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 min-h-0 flex flex-col bg-[#121212] border border-primary/20 shadow-[0_0_30px_rgba(0,0,0,0.85)] relative overflow-hidden">
          {/* ── Top Header Bar ── */}
          <div className="shrink-0 flex flex-wrap justify-between items-center gap-2 sm:gap-3 p-2.5 sm:p-4 border-b border-gray-800/80 bg-[#161616]">
            <div className="flex-1 min-w-0 pr-2">
              <div className="flex items-center gap-2 text-primary/70 tracking-widest text-[9px] sm:text-[10px] uppercase font-mono mb-0.5 sm:mb-1">
                <span>PRINCE.OS // CERTIFICATIONS // {certificate.id.toUpperCase()}</span>
                {certificate.issuer && (
                  <>
                    <span className="text-gray-600">|</span>
                    <span className="text-gray-400 truncate">{certificate.issuer}</span>
                  </>
                )}
              </div>
              <h2 className="text-gray-100 font-bold text-xs sm:text-base tracking-wider uppercase truncate">
                {certificate.title}
              </h2>
              {certificate.description && (
                <p className="text-gray-400 text-[10px] sm:text-[11px] leading-relaxed mt-0.5 sm:mt-1 font-mono whitespace-pre-line max-w-4xl line-clamp-2 sm:line-clamp-none">
                  {certificate.description}
                </p>
              )}
            </div>

            {/* Right Controls: Scale, Multiple-image pagination, and Close */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Pagination controls for multiple images only */}
              {hasMultiple && (
                <div className="flex items-center bg-[#141414] px-1.5 sm:px-2 py-1 border border-primary/40 text-primary text-[10px] tracking-wider font-mono shadow-[0_0_10px_rgba(0,0,0,0.7)]">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="px-1.5 py-0.5 hover:text-white transition-colors focus:outline-none focus:text-white"
                    title="Previous certificate image (Left Arrow)"
                    aria-label="Previous certificate image"
                  >
                    &lt; PREV
                  </button>
                  <span className="px-1.5 text-gray-200 font-bold border-l border-r border-gray-800">
                    [{currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {images.length < 10 ? `0${images.length}` : images.length}]
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-1.5 py-0.5 hover:text-white transition-colors focus:outline-none focus:text-white"
                    title="Next certificate image (Right Arrow)"
                    aria-label="Next certificate image"
                  >
                    NEXT &gt;
                  </button>
                </div>
              )}

              {/* Zoom Scale Controls (active when image exists) */}
              {isCurrentImageValid && (
                <div className="flex items-center text-gray-300 text-[10px] tracking-widest font-bold bg-[#141414] px-1 sm:px-2 py-1 border border-gray-800 shadow-[0_0_10px_rgba(0,0,0,0.7)] font-mono">
                  <button
                    type="button"
                    onClick={decreaseScale}
                    className="px-1.5 sm:px-2 py-0.5 hover:text-primary transition-colors disabled:opacity-30 focus:outline-none focus:text-primary"
                    disabled={scale <= 0.6}
                    title="Zoom out (- key)"
                    aria-label="Zoom out certificate"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    onClick={resetScale}
                    className="px-1.5 sm:px-2 py-0.5 hover:text-primary transition-colors border-l border-r border-gray-800 focus:outline-none focus:text-primary"
                    title="Reset scale (0 key)"
                    aria-label="Reset zoom level"
                  >
                    {scale === 1 ? 'RST' : `${Math.round(scale * 100)}%`}
                  </button>
                  <button
                    type="button"
                    onClick={increaseScale}
                    className="px-1.5 sm:px-2 py-0.5 hover:text-primary transition-colors disabled:opacity-30 focus:outline-none focus:text-primary"
                    disabled={scale >= 2.6}
                    title="Zoom in (+ key)"
                    aria-label="Zoom in certificate"
                  >
                    +
                  </button>
                </div>
              )}

              {/* Close Button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="text-primary/70 hover:text-primary transition-colors text-[10px] tracking-widest focus:outline-none focus:underline uppercase flex items-center gap-1.5 px-1 py-1"
                autoFocus
                aria-label="Close certificate preview"
              >
                <span>[ ESC ] CLOSE</span>
              </button>
            </div>
          </div>

          {/* ── Center Stage: Large Centered Certificate Viewport ── */}
          <div
            className={`flex-1 min-h-0 flex items-center justify-center p-3 sm:p-6 overflow-hidden bg-[#0a0a0a] relative select-none ${
              scale > 1
                ? isDraggingState
                  ? 'cursor-grabbing'
                  : 'cursor-grab'
                : 'cursor-zoom-in'
            }`}
            onClick={handleBackdropClick}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
          >
            {isCurrentImageValid ? (
              <>
                {/* Floating Navigation Arrows when multiple images are present */}
                {hasMultiple && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrev();
                      }}
                      className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 bg-black/85 hover:bg-black border border-primary/40 hover:border-primary text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary shadow-xl"
                      aria-label="Previous image"
                      title="Previous image (Left Arrow)"
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl block leading-none">chevron_left</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNext();
                      }}
                      className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-2.5 bg-black/85 hover:bg-black border border-primary/40 hover:border-primary text-primary transition-colors focus:outline-none focus:ring-1 focus:ring-primary shadow-xl"
                      aria-label="Next image"
                      title="Next image (Right Arrow)"
                    >
                      <span className="material-symbols-outlined text-lg sm:text-xl block leading-none">chevron_right</span>
                    </button>
                  </>
                )}

                {/* Scalable & Pannable Image Container */}
                <div
                  className="relative max-h-full max-w-full flex items-center justify-center select-none"
                  style={{
                    transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${scale})`,
                    transition: isDraggingState ? 'none' : 'transform 300ms cubic-bezier(0.16, 1, 0.3, 1)',
                    transformOrigin: 'center center',
                  }}
                  onMouseDown={handleMouseDown}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onDoubleClick={toggleZoom}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hasMovedRef.current) {
                      hasMovedRef.current = false;
                      return;
                    }
                    if (scale === 1) {
                      toggleZoom();
                    }
                  }}
                >
                  <img
                    src={images[currentIndex]}
                    alt={currentAlt}
                    onError={() => setImageErrors((prev) => ({ ...prev, [currentIndex]: true }))}
                    className="max-h-[66vh] sm:max-h-[72vh] max-w-[88vw] sm:max-w-[85vw] w-auto h-auto object-contain block select-none border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.9)] bg-black pointer-events-none"
                    draggable={false}
                  />
                </div>
              </>
            ) : (
              <div
                className="border border-dashed border-primary/30 bg-[#101010] p-6 sm:p-8 max-w-lg text-center flex flex-col items-center gap-3 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="material-symbols-outlined text-4xl text-primary/40">
                  description
                </span>
                <div className="text-sm font-bold text-gray-200 tracking-wider uppercase font-mono">
                  CREDENTIAL RECORD INDEXED
                </div>
                <p className="text-gray-400 text-xs leading-relaxed max-w-md font-mono">
                  The technical credential for <span className="text-primary font-bold">{certificate.title}</span> is indexed. The certificate image is awaiting placement in the designated media folder.
                </p>
                <div className="text-[10px] text-gray-400 border border-gray-800 bg-black/60 p-2 font-mono text-left w-full mt-2">
                  <div className="text-primary/70 mb-1">&gt; upload destination:</div>
                  <code className="text-gray-200 break-all">public/media/certifications/{certificate.id}/</code>
                </div>
              </div>
            )}
          </div>

          {/* ── Bottom Information Bar ── */}
          <div className="shrink-0 p-2.5 sm:p-3.5 border-t border-gray-800/80 bg-[#141414] flex flex-wrap justify-between items-center gap-2 sm:gap-3 text-[10px] tracking-wider font-mono">
            <div className="flex flex-wrap items-center gap-3 text-gray-400">
              {certificate.issueDate && (
                <div className="flex items-center gap-1.5">
                  <span className="text-gray-500">ISSUED:</span>
                  <span className="text-gray-300">{certificate.issueDate}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <span className="text-gray-500">MEDIA_STATUS:</span>
                <span className={isCurrentImageValid ? 'text-primary font-bold' : 'text-gray-400'}>
                  {hasMultiple
                    ? `MULTI_ARTIFACT (${images.length} FILES)`
                    : isCurrentImageValid
                    ? 'SINGLE_ARTIFACT'
                    : 'AWAITING_UPLOAD'}
                </span>
              </div>
              {isCurrentImageValid && (
                <div className="hidden sm:flex items-center gap-1.5 text-gray-500">
                  <span>NAV:</span>
                  <span className="text-primary/70">
                    {scale > 1
                      ? `[ DRAG TO PAN // ZOOM ${Math.round(scale * 100)}% ]`
                      : '[ CLICK / SCROLL TO ZOOM ]'}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-600 hidden sm:inline">
                EOF // STATUS_AUTHENTICATED
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
