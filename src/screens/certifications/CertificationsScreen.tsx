import React, { useEffect, useRef, useState } from 'react';
import { Panel } from '../../components/ui/Panel';
import { CertificateCard, CertificateModal } from '../../components/certifications';
import { certificationsData, type CertificateItem } from '../../data/certificationsData';
import type { AppState } from '../../types/navigation';

interface CertificationsScreenProps {
  onNavigate: (screen: AppState) => void;
}

export const CertificationsScreen: React.FC<CertificationsScreenProps> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<CertificateItem | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">
      {/* ── Zoom Modal ── */}
      {selectedCert && (
        <CertificateModal
          certificate={selectedCert}
          triggerElement={triggerElement}
          onClose={() => {
            setSelectedCert(null);
          }}
        />
      )}

      {/* ── Exec lines ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5 border-b border-primary/10 mb-2">
        <span>
          <span className="text-primary mr-1.5">&gt;</span>execute ./certifications.exe
        </span>
        <span className="text-gray-500 text-[10px]">
          Loading credential verification manifests... Done.
        </span>
      </div>

      {/* ── Scrollable Content Area ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-3 p-1 pb-4 pr-2">
        {/* Status Panel */}
        <Panel label="SYSTEM_RECORDS // CREDENTIALS">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 py-1">
            <div>
              <h1
                className="text-gray-100 font-bold tracking-widest uppercase leading-none mb-1.5"
                style={{ fontSize: '1.25rem', letterSpacing: '0.15em' }}
              >
                CERTIFICATIONS.EXE
              </h1>
              <p className="text-gray-400 tracking-[0.1em] text-[11px]">
                Verified technical credentials, professional certifications, and accredited coursework.
              </p>
            </div>

            <div className="flex gap-4 text-[10px] tracking-widest">
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">TOTAL_CREDENTIALS</span>
                <span className="text-primary/90 font-bold">
                  {certificationsData.length < 10 ? `0${certificationsData.length}` : certificationsData.length}
                </span>
              </div>
              <div className="flex flex-col gap-1 border-l border-primary/20 pl-3">
                <span className="text-gray-500">STATUS</span>
                <span className={`font-bold ${certificationsData.length > 0 ? 'text-primary/90 animate-pulse' : 'text-gray-500'}`}>
                  {certificationsData.length > 0 ? 'VERIFIED' : 'STANDBY'}
                </span>
              </div>
            </div>
          </div>
        </Panel>

        {/* ── Certifications Grid or Empty State ── */}
        {certificationsData.length === 0 ? (
          <div className="terminal-panel p-8 text-center flex flex-col items-center justify-center gap-3 border border-dashed border-primary/30 my-4">
            <span className="material-symbols-outlined text-4xl text-primary/50">
              workspace_premium
            </span>
            <div className="text-sm font-bold text-gray-200 tracking-wider uppercase">
              NO CERTIFICATES LOADED
            </div>
            <p className="text-gray-400 text-xs max-w-md leading-relaxed">
              Certification records are currently unpopulated. Verified technical credentials and accredited coursework will be indexed here once authenticated.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificationsData.map((cert) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                onClick={(el) => {
                  setTriggerElement(el);
                  setSelectedCert(cert);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
