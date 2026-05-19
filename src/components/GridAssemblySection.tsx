'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══ 3x3 Matrix Data ═══ */
const matrix: { letter: string; label: string }[] = [
  { letter: 'T', label: 'Tactile' },
  { letter: 'A', label: 'Augment' },
  { letter: 'C', label: 'Carry' },
  { letter: 'T', label: 'Terrain' },
  { letter: 'I', label: 'Interface' },
  { letter: 'L', label: 'Locomotion' },
  { letter: 'I', label: 'Integrate' },
  { letter: 'T', label: 'Transmit' },
  { letter: 'Y', label: 'You' },
];

/* ═══ GridAssemblySection ═══ */
export default function GridAssemblySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const systemRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cells = gridRef.current?.querySelectorAll('.matrix-cell');
    if (!section || !cells || cells.length === 0) return;

    // Heading reveal
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        end: 'top 45%',
        scrub: 1,
      },
      opacity: 0,
      y: 20,
      ease: 'power3.out',
    });

    // Staggered cell assembly
    gsap.from(cells, {
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'top 20%',
        scrub: 1.5,
      },
      opacity: 0,
      scale: 0.6,
      rotateY: 60,
      stagger: 0.06,
      ease: 'power3.out',
    });

    // Tagline reveal
    gsap.from(taglineRef.current, {
      scrollTrigger: {
        trigger: section,
        start: 'top 40%',
        end: 'top 25%',
        scrub: 1,
      },
      opacity: 0,
      y: 30,
      ease: 'power3.out',
    });

    // System map text reveal
    gsap.from(systemRef.current, {
      scrollTrigger: {
        trigger: section,
        start: 'top 35%',
        end: 'top 20%',
        scrub: 1,
      },
      opacity: 0,
      y: 20,
      ease: 'power3.out',
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      id="grid-assembly"
      data-scroll-section="grid-assembly"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 lg:px-20 overflow-hidden bg-bg-primary"
    >
      <div className="grid-overlay" aria-hidden="true" />

      {/* Section heading */}
      <p
        ref={headingRef}
        className="font-mono text-xs tracking-[0.1em] uppercase text-accent-amber mb-10 sm:mb-14 relative z-10"
      >
        06 | The Tactility Matrix
      </p>

      {/* 3x3 Matrix Grid */}
      <div
        ref={gridRef}
        className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3 lg:gap-4 perspective-[1200px]"
      >
        {matrix.map((item, idx) => {
          const isCenter = idx === 4;
          return (
            <div
              key={idx}
              className="matrix-cell group flex flex-col items-center"
            >
              {/* Cell */}
              <div
                className={`
                  w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[110px] lg:h-[110px]
                  flex items-center justify-center
                  font-heading font-bold text-[28px] sm:text-[36px] lg:text-[48px]
                  transition-all duration-400 cursor-default
                  ${isCenter
                    ? 'text-accent-crimson border-accent-crimson/30'
                    : 'text-accent-cyan border-accent-cyan/15'
                  }
                `}
                style={{
                  background: 'rgba(20,20,20,0.9)',
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  transformStyle: 'preserve-3d',
                  perspective: '1200px',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = isCenter ? '#FF0044' : '#00F0FF';
                  el.style.transform = 'translateZ(24px) rotateX(4deg) rotateY(-4deg)';
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = isCenter
                    ? 'rgba(255,0,68,0.3)'
                    : 'rgba(0,240,255,0.15)';
                  el.style.transform = 'translateZ(0) rotateX(0deg) rotateY(0deg)';
                }}
              >
                {item.letter}
              </div>

              {/* Label beneath */}
              <span
                className={`
                  mt-1.5 sm:mt-2
                  font-mono text-[9px] sm:text-[10px] lg:text-[11px]
                  tracking-[0.12em] uppercase
                  text-text-dim group-hover:text-text-primary
                  transition-colors duration-300
                `}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="relative z-10 mt-8 sm:mt-10 lg:mt-12 font-heading text-sm sm:text-base lg:text-lg tracking-[0.08em] uppercase text-text-primary text-center max-w-[600px]"
      >
        Nine primary neural contact points. One unified interface.
      </p>

      {/* System map declaration */}
      <p
        ref={systemRef}
        className="relative z-10 mt-3 sm:mt-4 font-mono text-[10px] sm:text-xs tracking-[0.18em] uppercase text-text-dim text-center max-w-[500px] leading-relaxed"
      >
        This is not merely a logo. It is a system map.
      </p>
    </section>
  );
}
