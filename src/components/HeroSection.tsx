'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const gridLetters = [
  { letter: 'T', label: 'TACTILE', i: 0 },
  { letter: 'A', label: 'AUGMENT', i: 1 },
  { letter: 'C', label: 'CARRY', i: 2 },
  { letter: 'T', label: 'TERRAIN', i: 3 },
  { letter: 'I', label: 'INTERFACE', i: 4, crimson: true },
  { letter: 'L', label: 'LOCOMOTION', i: 5 },
  { letter: 'I', label: 'INTEGRATE', i: 6 },
  { letter: 'T', label: 'TRANSMIT', i: 7 },
  { letter: 'Y', label: 'YOU', i: 8 },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bagRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Grid — always visible, no entrance animation
      const gridCells = gridRef.current?.querySelectorAll('.grid-cell');
      if (gridCells && gridCells.length > 0) {
        gsap.set(gridCells, {
          scale: 1,
          opacity: 1,
        });
      }

      // Bag — slides in from the right, HUGE
      gsap.from(bagRef.current, {
        x: 300,
        scale: 0.7,
        duration: 2,
        ease: 'power3.out',
        delay: 1.2,
      });

      // Bag — continuous gentle float
      gsap.to(bagRef.current, {
        y: -18,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 3,
      });

      // Terminal typing
      const lines = ['> INITIALIZE NEURAL INTERFACE', '> SYNC STATUS: ESTABLISHED', '> WELCOME TO THE NEXT PHASE'];
      let li = 0, ci = 0, cur = '';
      const term = terminalRef.current;
      if (term) {
        const cursor = term.querySelector('.cursor') as HTMLSpanElement;
        const type = () => {
          if (li >= lines.length) {
            if (cursor) cursor.style.display = 'inline-block';
            gsap.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power3.out' });
            gsap.to(indicatorRef.current, { opacity: 1, duration: 0.5, delay: 0.6 });
            return;
          }
          const line = lines[li];
          const el = term.querySelector(`[data-tl="${li}"]`) as HTMLSpanElement;
          if (ci < line.length) {
            cur += line[ci];
            if (el) el.textContent = cur;
            ci++;
            setTimeout(type, 18 + Math.random() * 12);
          } else {
            cur = ''; ci = 0; li++;
            setTimeout(type, 160);
          }
        };
        setTimeout(type, 1500);
      }
    });

    // Set initial hidden states
    gsap.set(taglineRef.current, { opacity: 0, y: 20 });
    gsap.set(indicatorRef.current, { opacity: 0 });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      data-scroll-section="hero"
      ref={sectionRef}
      className="relative min-h-screen bg-bg-primary overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Persistent grid fade */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(to right,#00F0FF 1px,transparent 1px),linear-gradient(to bottom,#00F0FF 1px,transparent 1px)',
          backgroundSize: 'calc(100vw / 3) calc(100vh / 3)',
        }}
      />

      {/* MASSIVE 3x3 GRID — center */}
      <div ref={gridRef} className="relative z-10" style={{ perspective: '1200px', transform: 'translateX(-3.5%)' }}>
        <div className="grid grid-cols-3 gap-[4px] sm:gap-[6px] w-[clamp(260px,60vw,650px)] h-[clamp(260px,60vw,650px)]">
          {gridLetters.map((cell) => (
            <div
              key={cell.i}
              className={`
                grid-cell group relative flex flex-col items-center justify-center
                font-heading font-bold text-[clamp(48px,12vw,130px)]
                transition-all duration-300 cursor-default
                ${cell.crimson ? 'text-accent-crimson border-accent-crimson/50' : 'text-accent-cyan border-accent-cyan/30'}
              `}
              style={{
                background: cell.crimson ? 'rgba(255,0,68,0.08)' : 'rgba(0,240,255,0.06)',
                border: '1px solid',
                backdropFilter: 'blur(4px)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = cell.crimson ? '#FF0044' : '#00F0FF';
                el.style.transform = 'scale(1.08) translateZ(20px)';
                el.style.background = cell.crimson ? 'rgba(255,0,68,0.12)' : 'rgba(0,240,255,0.08)';
                el.style.zIndex = '10';
                const label = el.querySelector('.cell-label') as HTMLSpanElement;
                if (label) label.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = cell.crimson ? 'rgba(255,0,68,0.4)' : 'rgba(0,240,255,0.2)';
                el.style.transform = 'scale(1) translateZ(0)';
                el.style.background = cell.crimson ? 'rgba(255,0,68,0.06)' : 'rgba(0,240,255,0.04)';
                el.style.zIndex = '1';
                const label = el.querySelector('.cell-label') as HTMLSpanElement;
                if (label) label.style.opacity = '0';
              }}
            >
              {cell.letter}
              <span className="cell-label font-mono text-[6px] sm:text-[7px] lg:text-[8px] tracking-[0.25em] text-text-dim/40 uppercase absolute -bottom-4 sm:-bottom-5 opacity-0 transition-opacity duration-300">
                {cell.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* BIG BAG — overlapping grid from right side - hidden on mobile */}
      <div
        ref={bagRef}
        className="absolute z-20 pointer-events-none will-change-transform hidden md:block"
        style={{
          width: 'clamp(350px, 65vw, 800px)',
          top: '48%',
          left: '65%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image
          src="/images/webp/bag-transparent-bg.webp"
          alt=""
          width={800}
          height={800}
          className="w-full h-auto object-contain drop-shadow-[0_0_150px_rgba(0,240,255,0.25)]"
          priority
        />
        <div className="absolute -bottom-[20%] left-[5%] right-[5%] h-[30%] bg-accent-cyan/15 blur-[100px] rounded-full" aria-hidden="true" />
      </div>

      {/* TERMINAL — bottom left - adjusted for mobile */}
      <div className="absolute bottom-32 sm:bottom-24 lg:bottom-28 left-4 sm:left-10 lg:left-16 xl:left-24 z-30 max-w-[200px] sm:max-w-none">
        <div ref={terminalRef} className="font-mono text-[8px] sm:text-[10px] lg:text-xs text-text-dim/50 leading-relaxed">
          {[0,1,2].map((i) => (
            <div key={i} className="h-4 sm:h-5"><span data-tl={i}></span></div>
          ))}
          <span className="cursor cursor-blink inline-block w-1.5 h-3 bg-accent-cyan align-text-bottom ml-0.5" />
        </div>
      </div>

      {/* TAGLINE — bottom right - adjusted for mobile */}
      <p ref={taglineRef} className="absolute bottom-32 sm:bottom-24 lg:bottom-28 right-4 sm:right-10 lg:right-16 xl:right-24 z-30 text-right max-w-[180px] sm:max-w-none">
        <span className="font-heading font-bold text-[clamp(16px,2.5vw,36px)] uppercase tracking-[0.08em] text-text-primary/80 leading-[1.1] block">
          The Biological<br />Interface
        </span>
      </p>

      {/* SCROLL INDICATOR */}
      <div ref={indicatorRef} className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5">
        <span className="font-mono text-[6px] sm:text-[7px] tracking-[0.3em] uppercase text-text-dim/25">scroll</span>
        <span className="text-accent-cyan/30 text-base leading-none bounce-soft block">↓</span>
      </div>
    </section>
  );
}
