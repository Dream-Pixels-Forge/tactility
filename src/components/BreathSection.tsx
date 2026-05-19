'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* ═══════════════════════════════════════
   BREATH SECTION — A moment of stillness
   Minimal content, maximal impact
   ═══════════════════════════════════════ */

export default function BreathSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const text = textRef.current;
    if (!text) return;

    // Fade in on scroll
    gsap.from(text, {
      scrollTrigger: {
        trigger: text,
        start: 'top 80%',
        end: 'top 50%',
        scrub: 1,
      },
      opacity: 0,
      y: 20,
      ease: 'power2.out',
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section
      id="breath"
      data-scroll-section="breath"
      className="relative min-h-[50vh] sm:min-h-[60vh] bg-bg-primary flex items-center justify-center"
    >
      {/* Single centered text with motion */}
      <div ref={textRef} className="relative z-10 text-center px-6 will-change-transform">
        <p className="font-mono text-[10px] sm:text-xs tracking-[0.3em] uppercase text-text-dim/40">
          The interface is loading.
        </p>
        <p className="font-heading font-bold text-lg sm:text-xl text-text-dim/60 mt-3">
          Are you ready?
        </p>
      </div>

      {/* Minimal grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.01]"
        style={{
          backgroundImage: 'linear-gradient(to right,#00F0FF 1px,transparent 1px),linear-gradient(to bottom,#00F0FF 1px,transparent 1px)',
          backgroundSize: 'calc(100vw / 3) calc(100vh / 3)',
        }}
      />
    </section>
  );
}
