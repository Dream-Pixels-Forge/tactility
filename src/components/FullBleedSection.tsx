'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TAGLINE_TEXT = 'THE NEXT PHASE OF HUMAN LOCOMOTION';

/* ═══ rAF-powered seamless marquee ═══
   No loop reset. Position wraps continuously:
   when pos reaches -halfWidth, it snaps +halfWidth
   forward — visually invisible since the duplicated
   content is identical at both positions. */
function Marquee({ children, speed = 0.4 }: { children: React.ReactNode; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const halfWidth = el.scrollWidth / 2;
    if (halfWidth <= 0) return;

    let pos = 0;
    let rafId: number;
    const innerEl = el;

    function tick() {
      if (!innerEl) return;
      pos -= speed;
      if (pos <= -halfWidth) pos += halfWidth;
      innerEl.style.transform = `translateX(${pos}px)`;
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [speed]);

  return (
    <div className="overflow-hidden whitespace-nowrap w-full leading-none">
      <div ref={trackRef} className="inline-block will-change-transform backface-visibility-hidden">
        {children}
      </div>
    </div>
  );
}

function TimestampContent() {
  const ref = useRef<HTMLTimeElement>(null);

  useEffect(() => {
    if (ref.current) {
      const now = new Date();
      const iso = now.toISOString().replace(/[:-]/g, '').slice(0, 15);
      const text = `SYSTIME:${iso}Z`;
      ref.current.textContent = `${text}  ⏺  ${text}  ⏺  `;
    }
  }, []);

  return (
    <time
      ref={ref}
      className="font-mono text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-text-dim/30 select-none"
    />
  );
}

function TaglineContent() {
  return (
    <span className="font-heading font-bold text-[clamp(14px,2.5vw,36px)] uppercase tracking-[0.08em] text-text-primary/90 whitespace-nowrap">
      {TAGLINE_TEXT} — {TAGLINE_TEXT} —
    </span>
  );
}

export default function FullBleedSection() {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Color shift with scroll
    gsap.to(overlay, {
      scrollTrigger: {
        trigger: overlay.closest('section'),
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
      opacity: 0.4,
      ease: 'none',
    });
  }, []);

  return (
    <section
      id="fullbleed"
      data-scroll-section="fullbleed"
      className="relative min-h-screen bg-bg-primary overflow-hidden"

    >
      {/* Full-bleed image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/webp/hero-2.webp"
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.5) 30%, rgba(10,10,10,0.15) 55%, transparent 70%)',
        }}
      />

      {/* Color overlay with scroll-driven progression */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[9] pointer-events-none opacity-0 will-change-opacity"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.15) 0%, rgba(255,0,68,0.1) 100%)',
        }}
      />

      {/* Timestamp marquee — slow */}
      <div className="absolute top-6 sm:top-8 lg:top-10 left-0 right-0 z-20 pointer-events-none">
        <Marquee speed={0.15}>
          <TimestampContent />
        </Marquee>
      </div>

      {/* Tagline marquee — faster */}
      <div className="absolute bottom-10 sm:bottom-12 lg:bottom-16 left-0 right-0 z-20 pointer-events-none">
        <Marquee speed={0.5}>
          <TaglineContent />
        </Marquee>
      </div>
    </section>
  );
}
