import React, { useState, useEffect, useRef } from 'react';
import { CommandPrompt } from '../../components/terminal/CommandPrompt';
import type { AppState } from '../../types/navigation';
import { Panel } from '../../components/ui/Panel';
import githubLogo from '../../assets/images/skills/github.png';

const LINKEDIN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#0a66c2"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
const EMAIL_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>`;

const contactData = [
  {
    label: 'EMAIL',
    value: 'princegaate2003@gmail.com',
    iconType: 'svg',
    icon: EMAIL_SVG,
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=princegaate2003%40gmail.com',
  },
  {
    label: 'GITHUB',
    value: 'github.com/PrinceGaate',
    iconType: 'img',
    icon: githubLogo,
    href: 'https://github.com/PrinceGaate',
  },
  {
    label: 'LINKEDIN',
    value: 'linkedin.com/in/prince-gaate',
    iconType: 'svg',
    icon: LINKEDIN_SVG,
    href: 'https://www.linkedin.com/in/prince-gaate',
  },
];

interface ContactScreenProps {
  onNavigate: (screen: AppState) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef<boolean>(true);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeControllerRef = useRef<AbortController | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'IDLE' | 'TRANSMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState({ name: false, email: false, message: false });

  // Fix for "OPENS FROM BOTTOM" bug - ensure scroll starts at top
  useEffect(() => {
    isMountedRef.current = true;
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
    
    // Ping the backend health endpoint to wake up the Render free instance
    // This helps mitigate the cold start delay.
    fetch('https://contact-service-7gsz.onrender.com/health').catch(() => {});

    return () => {
      isMountedRef.current = false;
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
      if (requestTimeoutRef.current) {
        clearTimeout(requestTimeoutRef.current);
        requestTimeoutRef.current = null;
      }
      if (activeControllerRef.current) {
        activeControllerRef.current.abort();
        activeControllerRef.current = null;
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const validate = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      message: formData.message.trim() === ''
    };
    setErrors(newErrors);
    return !Object.values(newErrors).includes(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setFormStatus('TRANSMITTING');
    setErrorMessage('');

    const controller = new AbortController();
    activeControllerRef.current = controller;
    const timeoutId = setTimeout(() => controller.abort(), 40000); // 40-second timeout for Render free tier cold starts
    requestTimeoutRef.current = timeoutId;

    try {
      const response = await fetch(
        'https://contact-service-7gsz.onrender.com/api/contact',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          signal: controller.signal,
        }
      );
      
      clearTimeout(timeoutId);
      if (requestTimeoutRef.current === timeoutId) {
        requestTimeoutRef.current = null;
      }
      activeControllerRef.current = null;

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(data.message || `Server responded with status ${response.status}`);
      }

      if (!isMountedRef.current) return;

      setFormStatus('SUCCESS');
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
      successTimeoutRef.current = setTimeout(() => {
        if (isMountedRef.current) {
          setFormStatus('IDLE');
        }
        successTimeoutRef.current = null;
      }, 5000);

    } catch (error: any) {
      clearTimeout(timeoutId);
      if (requestTimeoutRef.current === timeoutId) {
        requestTimeoutRef.current = null;
      }
      activeControllerRef.current = null;

      if (!isMountedRef.current) return;

      console.error('Contact form error:', error);
      setFormStatus('ERROR');
      
      if (error.name === 'AbortError') {
        setErrorMessage('Request timed out. The server took too long to wake up or respond. Please retry.');
      } else {
        setErrorMessage(error.message || 'Network error or invalid response.');
      }
    }
  };

  // contactData is defined above the component

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden font-terminal-code text-gray-300 text-xs">

      {/* ── Exec lines ── */}
      <div className="shrink-0 px-1 pt-1.5 pb-0.5 text-[11px] text-gray-400 flex flex-col gap-0.5 border-b border-primary/10 mb-2">
        <span><span className="text-primary mr-1.5">&gt;</span>establishing_connection...</span>
        <span className="text-primary/90 font-bold tracking-widest text-[10px] mt-0.5">
          &gt; connection_status: <span className="animate-pulse">AVAILABLE</span>
        </span>
      </div>

      {/* ── Scrollable content ── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-4 p-1 pb-4 pr-2">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* ══ DIRECT CHANNELS ══ */}
          <Panel label="DIRECT_CHANNELS">
            <div className="flex flex-col gap-2">
              {contactData.map((channel, i) => (
                <a 
                  key={i} 
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col gap-1.5 group cursor-pointer p-2 rounded hover:bg-primary/5 border border-transparent hover:border-primary/20 transition-all focus:outline-none focus:ring-1 focus:ring-primary"
                  aria-label={`Open ${channel.label}`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-[18px] h-[18px] flex items-center justify-center shrink-0 group-hover:-translate-y-0.5 transition-transform duration-300">
                      {channel.iconType === 'img' ? (
                        <img src={channel.icon} alt={`${channel.label} logo`} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full text-primary/70 group-hover:text-primary transition-colors" dangerouslySetInnerHTML={{ __html: channel.icon }} />
                      )}
                    </div>
                    <span className="text-primary/70 tracking-widest font-bold text-[11px] group-hover:text-primary group-hover:brightness-125 transition-all">{channel.label}</span>
                  </div>
                  <div className="pl-6 text-[10.5px] text-gray-400 tracking-wider group-hover:text-gray-200 transition-colors">
                    {channel.value}
                  </div>
                </a>
              ))}
            </div>
          </Panel>

          {/* ══ SEND MESSAGE ══ */}
          <Panel label="TRANSMIT_MESSAGE">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-[11px]">

              {/* NAME */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-primary/70 tracking-widest uppercase">
                  NAME {errors.name && <span className="text-red-400 normal-case ml-2 tracking-normal">- Required</span>}
                </label>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>&gt;</span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="[ enter your name ]"
                    disabled={formStatus === 'TRANSMITTING'}
                    className={`bg-transparent border-b ${errors.name ? 'border-red-500/50 text-red-300' : 'border-gray-800 focus:border-primary/50 text-gray-200'} outline-none w-full p-1 pb-0.5 font-terminal-code transition-colors disabled:opacity-50`}
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-primary/70 tracking-widest uppercase">
                  EMAIL {errors.email && <span className="text-red-400 normal-case ml-2 tracking-normal">- Invalid Email</span>}
                </label>
                <div className="flex items-center gap-2 text-gray-500">
                  <span>&gt;</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="[ enter your email ]"
                    disabled={formStatus === 'TRANSMITTING'}
                    className={`bg-transparent border-b ${errors.email ? 'border-red-500/50 text-red-300' : 'border-gray-800 focus:border-primary/50 text-gray-200'} outline-none w-full p-1 pb-0.5 font-terminal-code transition-colors disabled:opacity-50`}
                  />
                </div>
              </div>

              {/* MESSAGE */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-primary/70 tracking-widest uppercase">
                  MESSAGE {errors.message && <span className="text-red-400 normal-case ml-2 tracking-normal">- Required</span>}
                </label>
                <div className="flex items-start gap-2 text-gray-500">
                  <span className="pt-1.5">&gt;</span>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="[ type your message... ]"
                    rows={4}
                    disabled={formStatus === 'TRANSMITTING'}
                    className={`bg-transparent border ${errors.message ? 'border-red-500/50 text-red-300' : 'border-gray-800 focus:border-primary/50 text-gray-200'} outline-none w-full p-2 font-terminal-code resize-none transition-colors disabled:opacity-50`}
                  />
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={formStatus === 'TRANSMITTING'}
                className="mt-2 self-start border border-primary/40 text-primary/90 px-4 py-1.5 text-[10px] tracking-widest hover:bg-primary/10 hover:border-primary transition-all focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                [ {formStatus === 'TRANSMITTING' ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'} ]
              </button>

              {/* FORM STATUS */}
              {formStatus === 'SUCCESS' && (
                <div className="text-primary/90 mt-2 tracking-wider animate-pulse">
                  &gt; Message transmitted successfully.
                </div>
              )}
              {formStatus === 'ERROR' && (
                <div className="text-red-400 mt-2 tracking-wider max-w-[90%] leading-relaxed">
                  &gt; ERROR: {errorMessage}
                </div>
              )}
            </form>
          </Panel>

        </div>

        {/* Bottom status area */}
        <div className="flex items-center gap-2 text-gray-600 px-1 text-[10px] tracking-widest mt-2 border-t border-gray-900 pt-2">
          <span className="text-primary/40">&gt;</span>
          {formStatus === 'IDLE' ? 'awaiting transmission...' : formStatus === 'TRANSMITTING' ? 'transmitting packet (awaiting server response)...' : 'transmission complete.'}
        </div>

      </div>

      {/* ── Pinned terminal prompt ── */}
      <CommandPrompt onNavigate={onNavigate} />
    </div>
  );
};
