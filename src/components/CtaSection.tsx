'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══ CtaSection ═══ */
export default function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const promptRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ── Typing effect on scroll ──
  useEffect(() => {
    const promptEl = promptRef.current;
    const cursorEl = cursorRef.current;
    const section = sectionRef.current;
    if (!promptEl || !cursorEl || !section) return;

    const fullText = '> CONNECT? (Y/N)';
    let currentIdx = 0;

    // Set initial state
    gsap.set(promptEl, { opacity: 0 });
    gsap.set(cursorEl, { opacity: 0 });

    const typeNext = () => {
      if (currentIdx <= fullText.length) {
        promptEl.textContent = fullText.slice(0, currentIdx);
        currentIdx++;
        gsap.delayedCall(0.04 + Math.random() * 0.03, typeNext);
      } else {
        // Show cursor when typing finishes
        gsap.to(cursorEl, { opacity: 1, duration: 0.2 });
      }
    };

    ScrollTrigger.create({
      trigger: section,
      start: 'top 70%',
      onEnter: () => {
        gsap.set(promptEl, { opacity: 1 });
        typeNext();
      },
      once: true,
    });

    // Heading reveal
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 55%',
        scrub: 1,
      },
      opacity: 0,
      y: 40,
      ease: 'power3.out',
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // ── Handle prompt click ──
  const handlePromptClick = useCallback(() => {
    setShowInput(true);
    // Hide cursor when clicked
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { opacity: 0, duration: 0.2 });
    }
    if (promptRef.current) {
      // Keep the prompt text visible
      gsap.set(promptRef.current, { opacity: 1 });
    }
    // Focus input after animation
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  // ── Handle email submit ──
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      
      const trimmedEmail = email.trim();
      
      if (!trimmedEmail) {
        setError('Email address required');
        return;
      }
      
      if (!isValidEmail(trimmedEmail)) {
        setError('Invalid email format');
        return;
      }

      // Call real API endpoint
      setIsLoading(true);
      setError('');
      
      try {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Subscription failed');
        }
        
        setSubmitted(true);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Connection failed. Please try again.');
        setIsLoading(false);
      }
    },
    [email]
  );

  // ── Handle Y/N input (legacy support) ──
  const handleLegacyInput = useCallback(
    (val: string) => {
      const trimmed = val.trim().toUpperCase();
      
      if (trimmed === 'Y' || trimmed === 'YES') {
        // Switch to email mode
        setShowInput(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      } else if (trimmed === 'N' || trimmed === 'NO') {
        setSubmitted(true);
      } else {
        setError('Type Y/N or enter your email');
      }
    },
    []
  );

  // ── Reset to start over ──
  const handleReset = useCallback(() => {
    setShowInput(false);
    setEmail('');
    setSubmitted(false);
    setError('');
    if (promptRef.current) {
      promptRef.current.textContent = '> CONNECT? (Y/N)';
    }
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { opacity: 1 });
    }
  }, []);

  return (
    <section
      id="cta"
      data-scroll-section="cta"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 bg-bg-primary overflow-hidden"
    >
      <div className="grid-overlay" aria-hidden="true" />

      {/* Heading */}
      <h1
        ref={headingRef}
        className="relative z-10 font-heading font-bold text-[clamp(48px,10vw,96px)] tracking-[0.06em] uppercase text-accent-cyan text-center leading-[0.9] mb-12 sm:mb-16"
      >
        FEEL THE FUTURE
      </h1>

      {/* Terminal prompt area */}
      <div className="relative z-10 flex flex-col items-center gap-4 sm:gap-6">
        {!showInput && !submitted && (
          <button
            ref={promptRef}
            onClick={handlePromptClick}
            className="font-mono text-sm sm:text-base lg:text-lg tracking-[0.12em] text-text-primary bg-transparent border-none cursor-pointer outline-none
              hover:text-accent-cyan transition-colors duration-300"
            aria-label="Click to connect"
          >
            {'> CONNECT? (Y/N)'}
          </button>
        )}

        {!showInput && !submitted && (
          <span
            ref={cursorRef}
            className="font-mono text-sm sm:text-base lg:text-lg text-accent-cyan cursor-blink"
          >
            _
          </span>
        )}

        {/* Input field (revealed on prompt click) - Email capture */}
        {showInput && !submitted && (
          <div className="flex flex-col items-center gap-3">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="font-mono text-sm sm:text-base lg:text-lg text-text-dim">
                {'>'}
              </span>
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    // If Enter pressed with empty or Y/N, handle legacy
                    if (!email.trim()) {
                      e.preventDefault();
                      handleLegacyInput('');
                    }
                  }
                }}
                className="font-mono text-sm sm:text-base lg:text-lg text-accent-cyan bg-transparent border-none outline-none
                  border-b border-accent-cyan/30 focus:border-accent-cyan transition-colors duration-300
                  caret-accent-cyan w-[200px] sm:w-[280px] tracking-[0.05em]"
                placeholder="your@email.com"
                autoFocus
                maxLength={254}
                aria-label="Enter your email address"
                disabled={isLoading}
              />
              <span className="cursor-blink font-mono text-sm sm:text-base lg:text-lg text-accent-cyan">
                _
              </span>
            </form>

            {error && (
              <p className="font-mono text-[11px] sm:text-xs tracking-[0.1em] text-accent-crimson uppercase">
                {error}
              </p>
            )}

            <div className="flex items-center gap-4 mt-2">
              <button
                type="submit"
                onClick={handleSubmit as unknown as React.MouseEventHandler<HTMLButtonElement>}
                disabled={isLoading}
                className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-accent-cyan hover:text-white transition-colors duration-300 bg-transparent border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '[CONNECTING...]' : '[ENTER]'}
              </button>
              
              <button
                type="button"
                onClick={handleReset}
                className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-text-dim hover:text-accent-cyan transition-colors duration-300 bg-transparent border-none cursor-pointer"
              >
                [CANCEL]
              </button>
            </div>

            <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.1em] text-text-dim/50 mt-2 text-center max-w-[300px]">
              Or type Y to join the network
            </p>
          </div>
        )}

        {/* Confirmation */}
        {submitted && (
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="font-mono text-sm sm:text-base tracking-[0.12em] text-accent-cyan">
              {'> CONNECTION ESTABLISHED.'}
            </p>
            <p className="font-mono text-[11px] sm:text-xs tracking-[0.15em] text-text-dim max-w-[400px] leading-relaxed">
              {email 
                ? `Welcome to the network, ${email.split('@')[0]}. We'll be in touch.`
                : 'Neural handshake complete. You are now part of the network.'
              }
            </p>

            <button
              onClick={handleReset}
              className="font-mono text-[10px] sm:text-xs tracking-[0.15em] uppercase text-accent-cyan/60 hover:text-accent-cyan transition-colors duration-300 bg-transparent border-none cursor-pointer mt-2"
            >
              [RECONNECT]
            </button>
          </div>
        )}
      </div>
    </section>
  );
}