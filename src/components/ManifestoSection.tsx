'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const statements = [
  {
    text: 'The human body is an unfinished prototype.',
    size: 'text-[clamp(48px,8vw,130px)]',
    color: 'text-text-primary',
  },
  {
    text: 'You were born with sensory limits the modern world has already outpaced.',
    size: 'text-[clamp(16px,2vw,28px)]',
    color: 'text-text-dim/60',
    sub: true,
  },
  {
    text: 'To remain human is to evolve.',
    size: 'text-[clamp(56px,10vw,160px)]',
    color: 'text-accent-crimson',
  },
  {
    text: 'Tactility engineers the seamless interface.',
    size: 'text-[clamp(32px,5vw,90px)]',
    color: 'text-accent-cyan',
  },
];

export default function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const stmts = container.querySelectorAll('.manifesto-statement');
    stmts.forEach((stmt, i) => {
      const text = stmt.querySelector('.manifesto-text');
      const isCrimson = i === 2; // The evolve statement
      if (text) {
        // Main statements: dramatic scale + fade reveal
        // Sub statement: simple fade up (quick)
        if (i === 1) {
          gsap.from(text, {
            scrollTrigger: { trigger: stmt, start: 'top 75%', end: 'top 35%', scrub: 0.8 },
            opacity: 0,
            y: 30,
            ease: 'power2.out',
          });
        } else if (isCrimson) {
          // The crimson climax: scale up from 0.7 - SLOW for emphasis
          gsap.from(text, {
            scrollTrigger: { trigger: stmt, start: 'top 80%', end: 'top 25%', scrub: 4 },
            opacity: 0,
            scale: 0.7,
            y: 40,
            ease: 'power2.out',
          });
          // Add a subtle pulse glow behind it
          gsap.from(stmt.querySelector('.pulse-glow'), {
            scrollTrigger: { trigger: stmt, start: 'top 80%', end: 'top 25%', scrub: 4 },
            opacity: 0,
            scale: 0.5,
            ease: 'power2.out',
          });
        } else {
          // Statement 0 and 3: moderate pace
          gsap.from(text, {
            scrollTrigger: { trigger: stmt, start: 'top 75%', end: 'top 35%', scrub: i === 0 ? 1.5 : 2 },
            opacity: 0,
            x: i === 0 ? -60 : 60,
            y: 30,
            ease: 'power2.out',
          });
        }
      }
    });

    // Parallax for background elements
    const ring = container.querySelector('.parallax-ring') as HTMLElement;
    const boot = container.querySelector('.parallax-boot') as HTMLElement;
    
    if (ring) {
      gsap.to(ring, {
        scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: 1 },
        y: -100,
        ease: 'none',
      });
    }
    
    if (boot) {
      gsap.to(boot, {
        scrollTrigger: { trigger: container, start: 'top bottom', end: 'bottom top', scrub: 1.5 },
        y: 80,
        ease: 'none',
      });
    }

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="manifesto"
      data-scroll-section="manifesto"
      ref={containerRef}
      className="relative bg-bg-primary"
    >
      {/* Animated text blocks */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(to right,#00F0FF 1px,transparent 1px),linear-gradient(to bottom,#00F0FF 1px,transparent 1px)',
          backgroundSize: 'calc(100vw / 3) calc(100vh / 3)',
        }}
      />

      {/* Transparent ring — more present behind the right side */}
      <div
        className="parallax-ring absolute right-[-5%] top-[15%] w-[45vw] max-w-[600px] opacity-[0.08] pointer-events-none hidden lg:block z-0 will-change-transform"
        aria-hidden="true"
      >
        <img
          src="/images/webp/ring-transparent-bg.webp"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {/* Hero boot — atmospheric at the bottom */}
      <div
        className="parallax-boot absolute left-[-10%] bottom-[10%] w-[35vw] max-w-[500px] opacity-[0.05] pointer-events-none hidden lg:block z-0 will-change-transform"
        aria-hidden="true"
      >
        <img
          src="/images/webp/footwear-red-accen-transparent-bgt.webp"
          alt=""
          className="w-full h-full object-contain"
        />
      </div>

      {statements.map((s, i) => (
        <div
          key={i}
          className={`manifesto-statement flex items-center justify-center px-6 sm:px-10 lg:px-16 xl:px-24 text-center relative z-10 ${
            i === 2 ? 'min-h-[70vh] sm:min-h-[80vh]' : 'min-h-[50vh] sm:min-h-[60vh]'
          }`}
        >
          {/* Crimson climax: backdrop glow with pulse */}
          {i === 2 && (
            <div
              className="pulse-glow absolute w-[70vw] h-[50vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent-crimson/8 blur-[150px] rounded-full pointer-events-none animate-pulse-slow"
              aria-hidden="true"
            />
          )}

          <p
            className={`manifesto-text font-heading font-bold leading-[1.05] max-w-[1100px] ${
              s.size
            } ${s.color} ${
              s.sub ? 'font-body font-light tracking-[0.08em] max-w-[700px]' : ''
            }`}
          >
            {s.text}
          </p>
        </div>
      ))}

      {/* Section marker — "MANIFESTO" floating, tiny */}
      <div className="sticky bottom-6 left-6 sm:left-10 lg:left-16 xl:left-24 z-20 pointer-events-none">
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-text-dim/20">
          manifesto
        </span>
      </div>
    </section>
  );
}
