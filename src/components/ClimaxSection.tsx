'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══════════════════════════════════════
   CLIMAX SECTION — The Peak Moment
   Shows the complete ecosystem unified
   Dolly-in camera effect with grid activation
   ═══════════════════════════════════════ */

export default function ClimaxSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Skip complex animations on mobile for performance
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Dolly-in effect: scale background up (simplified on mobile)
      if (!isMobile && !prefersReducedMotion) {
        gsap.fromTo(section.querySelector('.climax-bg'),
          { scale: 1 },
          {
            scale: 1.15,
            scrollTrigger: {
              trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      );
      }

      // Text reveal with moderate scrub
      if (!prefersReducedMotion) {
      gsap.from(textRef.current, {
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 2,
        },
        opacity: 0,
        y: 80,
        scale: 0.9,
        ease: 'power2.out',
      });
      }

      // Grid cells activate in sequence - delayed start with pan effect
      const cells = gridRef.current?.querySelectorAll('.climax-cell');
      if (cells && !prefersReducedMotion) {
        cells.forEach((cell, i) => {
          gsap.fromTo(cell,
            { opacity: 0.2, scale: 0.8, x: -20 },
            {
              opacity: 1,
              scale: 1,
              x: 0,
              scrollTrigger: {
                trigger: section,
                start: `${45 + i * 6}% top`,
                end: `${60 + i * 6}% top`,
                scrub: 1,
              },
              ease: 'back.out(1.2)',
            }
          );
          
          // Chained pulse - each cell triggers after previous
          gsap.to(cell, {
            boxShadow: '0 0 40px rgba(0, 240, 255, 0.4), inset 0 0 30px rgba(0, 240, 255, 0.15)',
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.15,
          });
        });
      }

      // Glow pulse (simplified on mobile)
      if (!isMobile && !prefersReducedMotion) {
        gsap.from(glowRef.current, {
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 2,
          },
          opacity: 0,
          scale: 0.5,
          ease: 'power2.out',
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="climax"
      data-scroll-section="climax"
      ref={sectionRef}
      className="relative min-h-[100vh] sm:min-h-[110vh] bg-bg-primary overflow-hidden flex items-center justify-center"
    >
      {/* Background with dolly effect */}
      <div className="climax-bg absolute inset-0 z-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
      </div>

      {/* Central glow - dual layer for visibility */}
      <div
        ref={glowRef}
        className="absolute w-[80vw] h-[60vh] bg-accent-cyan/15 blur-[200px] rounded-full pointer-events-none will-change-transform"
        aria-hidden="true"
      />
      {/* Secondary crimson glow for color evolution */}
      <div
        className="absolute w-[50vw] h-[40vh] bg-accent-crimson/10 blur-[150px] rounded-full pointer-events-none translate-x-1/3 will-change-transform"
        aria-hidden="true"
      />

      {/* Grid activation — 3x3 like hero but unified */}
      <div
        ref={gridRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
      >
        <div className="grid grid-cols-3 gap-3 sm:gap-4 w-[clamp(200px,40vw,400px)] h-[clamp(200px,40vw,400px)]">
          {['T', 'A', 'C', 'T', 'I', 'L', 'I', 'T', 'Y'].map((letter, i) => (
            <div
              key={i}
              data-hero-letter={letter}
              className="climax-cell relative flex items-center justify-center font-heading font-bold text-[clamp(24px,5vw,48px)] text-accent-cyan/60 border border-accent-cyan/20 bg-accent-cyan/5 backdrop-blur-sm will-change-transform transition-all duration-300"
              style={{
                opacity: 0.2,
              }}
            >
              {letter}
            </div>
          ))}
        </div>
      </div>

      {/* Main text */}
      <div
        ref={textRef}
        className="relative z-20 text-center px-6 will-change-transform"
      >
        <p className="font-heading font-bold text-[clamp(28px,5vw,64px)] text-text-primary leading-[1.1] tracking-[-0.02em] uppercase">
          Nine products.<br />
          <span className="text-accent-cyan">One interface.</span><br />
          Your next phase.
        </p>
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-text-dim/50 mt-6 sm:mt-8">
          THE INTERFACE IS COMPLETE
        </p>
        {/* Doubt moment - creates contrast for CTA */}
        <div className="mt-10 sm:mt-12 pt-6 border-t border-text-dim/10">
          <p className="font-mono text-xs sm:text-sm text-text-dim/40 tracking-[0.1em]">
            Not everyone is ready for the next phase.
          </p>
          <p className="font-heading font-bold text-xl sm:text-2xl text-accent-cyan mt-2">
            Are you?
          </p>
        </div>
      </div>

      {/* Section marker */}
      <div className="absolute bottom-6 left-6 sm:left-10 lg:left-16 xl:left-24 z-20 pointer-events-none">
        <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-text-dim/20">
          climax
        </span>
      </div>
    </section>
  );
}
