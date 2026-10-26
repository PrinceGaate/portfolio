import React, { useState } from 'react';
import type { CertificateItem } from '../../data/certificationsData';

interface CertificateCardProps {
  certificate: CertificateItem;
  onClick: (el: HTMLElement) => void;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate, onClick }) => {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (cardRef.current) {
      onClick(cardRef.current);
    }
  };

  const toggleMobileDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileExpanded(prev => !prev);
  };

  const hasImages = Array.isArray(certificate.images) && certificate.images.length > 0 && !imageError;
  const previewImage = hasImages ? certificate.images[0] : null;
  const previewAlt = certificate.imageAlts?.[0] || certificate.title;
  const imageCount = Array.isArray(certificate.images) && !imageError ? certificate.images.length : 0;

  return (
    <div
      ref={cardRef}
      className="cert-card relative flex flex-col h-[360px] overflow-hidden border rounded-sm group cursor-pointer select-none focus:outline-none focus:ring-1 focus:ring-primary"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`View certificate record: ${certificate.title}`}
    >
      {/* ── Top System Header Strip ── */}
      <div className="shrink-0 flex justify-between items-center px-3 py-1.5 border-b border-gray-800/80 bg-[#161616] text-[10px] text-primary/70 tracking-widest font-mono z-10">
        <div className="flex items-center gap-1.5 truncate pr-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/70 shrink-0" />
          <span className="truncate">CERT_RECORD // {certificate.id.toUpperCase()}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasImages ? (
            <span className="text-[9px] px-1.5 py-0.5 border border-primary/40 bg-primary/10 text-primary tracking-wider uppercase project-badge-completed font-mono">
              {imageCount > 1 ? `${imageCount}_ATTACHMENTS` : 'DOCUMENTED'}
            </span>
          ) : (
            <span className="text-[9px] px-1.5 py-0.5 border border-gray-700 bg-gray-900/60 text-gray-400 tracking-wider uppercase font-mono">
              INDEXED
            </span>
          )}
          {/* Mobile Info Toggle Button */}
          <button
            type="button"
            onClick={toggleMobileDetails}
            className="md:hidden text-[9px] px-1.5 py-0.5 border border-gray-700 text-gray-300 bg-gray-900/60 hover:border-primary/40 hover:text-primary transition-colors"
            aria-label={mobileExpanded ? 'Collapse certificate description' : 'Expand certificate description'}
          >
            {mobileExpanded ? 'HIDE' : 'INFO'}
          </button>
        </div>
      </div>

      {/* ── Certificate Preview (approx 65–70% visible height) ── */}
      <div className="relative flex-1 min-h-0 bg-[#0c0c0c] p-3.5 pb-20 flex items-center justify-center overflow-hidden">
        {previewImage ? (
          <>
            <img
              src={previewImage}
              alt={previewAlt}
              onError={() => setImageError(true)}
              className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]"
              loading="lazy"
              decoding="async"
            />
            {imageCount > 1 && (
              <div className="absolute top-2 right-2 bg-black/85 border border-primary/30 text-primary text-[9px] font-mono px-1.5 py-0.5 shadow-md flex items-center gap-1 pointer-events-none">
                <span className="material-symbols-outlined text-xs">collections</span>
                <span>{imageCount} ARTIFACTS</span>
              </div>
            )}
            {/* Subtle CRT hover view prompt */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none pb-14">
              <span className="text-[10px] text-primary tracking-widest bg-black/85 px-2.5 py-1 border border-primary/40 font-mono shadow-[0_0_12px_rgba(51,255,51,0.2)]">
                [ CLICK TO ENLARGE ]
              </span>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center border border-dashed border-primary/20 bg-black/40 p-4 text-center select-none">
            <span className="material-symbols-outlined text-3xl text-primary/40 mb-2">
              description
            </span>
            <div className="text-[11px] font-mono font-bold text-gray-300 tracking-wider uppercase mb-1">
              CREDENTIAL RECORD INDEXED
            </div>
            <div className="text-[10px] font-mono text-gray-500 tracking-wide max-w-[240px]">
              DOCUMENT SCAN AWAITING ARCHIVE MOUNT
            </div>
            <div className="text-[9px] font-mono text-primary/50 tracking-widest mt-2 border border-primary/20 bg-primary/5 px-2 py-0.5">
              public/media/certifications/{certificate.id}/
            </div>
          </div>
        )}
      </div>

      {/* ── Sliding Information Panel ── */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-20 bg-[#141414] border-t border-gray-800 p-3.5 sm:p-4 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_-6px_16px_rgba(0,0,0,0.8)] ${
          mobileExpanded ? 'bg-[#181818]' : ''
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <h3 className="text-gray-100 font-bold text-xs sm:text-sm tracking-wide leading-snug transition-colors group-hover:text-primary">
            {certificate.title}
          </h3>

          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              mobileExpanded
                ? 'max-h-40 opacity-100 pt-1'
                : 'max-h-6 opacity-80 group-hover:max-h-40 group-hover:opacity-100 group-hover:pt-1'
            }`}
          >
            <p className="text-gray-400 text-[11px] leading-relaxed line-clamp-1 group-hover:line-clamp-none transition-colors whitespace-pre-line">
              {certificate.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
