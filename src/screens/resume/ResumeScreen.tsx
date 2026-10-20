import React, { useState, useEffect } from 'react';
import type { AppState } from '../../types/navigation';
import { Panel } from '../../components/ui/Panel';

interface ResumeScreenProps {
  onNavigate: (screen: AppState) => void;
}

const RESUME_PATH = '/resume.pdf';
const RESUME_FILENAME = 'Prince-Gaate-Resume.pdf';

export const ResumeScreen: React.FC<ResumeScreenProps> = () => {
  const [pdfStatus, setPdfStatus] = useState<'checking' | 'available' | 'missing'>('checking');

  // Verify availability of the PDF asset at /resume.pdf
  useEffect(() => {
    let isMounted = true;

    fetch(RESUME_PATH, { method: 'HEAD' })
      .then((res) => {
        if (!isMounted) return;
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            setPdfStatus('missing');
          } else {
            setPdfStatus('available');
          }
        } else {
          setPdfStatus('missing');
        }
      })
      .catch(() => {
        if (isMounted) {
          setPdfStatus('missing');
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const isAvailable = pdfStatus === 'available';

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">
      
      {/* ── Terminal Exec Line ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5 border-b border-primary/10 mb-2">
        <span><span className="text-primary mr-1.5">&gt;</span>execute ./resume.pdf</span>
        <span className="text-gray-500 text-[10px]">Document reference loaded.</span>
      </div>

      {/* ── Header Panel ── */}
      <Panel label="DOCUMENTS / RESUME" className="shrink-0">
        <div className="py-0.5">
          <h1 
            className="text-gray-100 font-bold tracking-widest uppercase leading-none mb-1"
            style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }}
          >
            My Resume
          </h1>
          <p className="text-gray-400 tracking-[0.1em] text-[11px]">
            View or download my latest resume.
          </p>
        </div>
      </Panel>

      {/* ── Centered Compact Resume Card Area ── */}
      <div className="flex-1 min-h-0 flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 overflow-hidden">
        <div className="terminal-panel border border-primary/30 bg-[#0a0f0a]/90 p-4 sm:p-5 w-full max-w-[390px] flex flex-col gap-3.5 shadow-[0_0_20px_rgba(51,255,51,0.07)]">
          
          {/* Card Details: Icon + Metadata */}
          <div className="flex items-start gap-3">
            {/* Small Document Icon */}
            <div className="p-1.5 border border-primary/30 bg-primary/10 text-primary shrink-0 flex items-center justify-center">
              <span 
                className="material-symbols-outlined text-2xl" 
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                picture_as_pdf
              </span>
            </div>

            {/* Document Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-[10px] text-primary/70 tracking-widest uppercase font-bold">
                  PDF DOCUMENT
                </span>
                {!isAvailable && pdfStatus !== 'checking' && (
                  <span className="text-[9px] text-amber-400 tracking-wider uppercase border border-amber-500/30 px-1.5 py-0.5">
                    NOT CONNECTED
                  </span>
                )}
              </div>

              <h2 
                className="text-gray-100 font-bold tracking-wider text-xs sm:text-sm truncate" 
                title={RESUME_FILENAME}
              >
                {RESUME_FILENAME}
              </h2>
              
              <p className="text-gray-400 text-[11px] tracking-wide mt-0.5">
                Software Engineer · Resume
              </p>
            </div>
          </div>

          {/* Missing Fallback Notice */}
          {!isAvailable && pdfStatus === 'missing' && (
            <div className="border border-amber-500/20 bg-amber-500/5 p-2 text-[10px] text-gray-400 leading-relaxed">
              <span className="text-amber-400 font-semibold">&gt; NOTICE:</span> Resume PDF file is awaiting attachment at <code className="text-primary/80">public/resume.pdf</code>.
            </div>
          )}

          {/* Bottom Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2 border-t border-primary/20">
            {/* View Resume Action */}
            <a
              href={isAvailable ? RESUME_PATH : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 border text-[10px] tracking-widest font-bold uppercase transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                isAvailable
                  ? 'border-primary/50 bg-primary/15 text-primary hover:bg-primary hover:text-black hover:border-primary shadow-[0_0_12px_rgba(51,255,51,0.15)] cursor-pointer'
                  : 'border-gray-800 bg-gray-900/50 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
              aria-label="View Resume in a new browser tab"
              aria-disabled={!isAvailable}
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                visibility
              </span>
              <span>[ VIEW RESUME ]</span>
            </a>

            {/* Download PDF Action */}
            <a
              href={isAvailable ? RESUME_PATH : undefined}
              download={isAvailable ? RESUME_FILENAME : undefined}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 sm:py-2 border text-[10px] tracking-widest font-bold uppercase transition-all focus:outline-none focus:ring-1 focus:ring-primary ${
                isAvailable
                  ? 'border-gray-700 bg-gray-900/90 text-gray-300 hover:border-primary/70 hover:text-primary hover:bg-primary/10 cursor-pointer'
                  : 'border-gray-800 bg-gray-900/50 text-gray-500 cursor-not-allowed pointer-events-none'
              }`}
              aria-label="Download resume PDF file"
              aria-disabled={!isAvailable}
            >
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                download
              </span>
              <span>[ DOWNLOAD PDF ]</span>
            </a>
          </div>

        </div>
      </div>

    </div>
  );
};
