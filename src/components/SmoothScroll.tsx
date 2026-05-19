'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // ── Lenis — optimized for performance ──
    const lenis = new Lenis({
      duration: 1.0,         // Reduced from 1.2
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,  // Reduced from 1
      touchMultiplier: 1.2,  // Reduced from 2
    });
    lenisRef.current = lenis;

    // ── GSAP + Lenis — efficient ticker ──
    lenis.on('scroll', ScrollTrigger.update);
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    // ── Nav scroll handler — throttled via Lenis ──
    lenis.on('scroll', (e: Lenis) => {
      const nav = document.querySelector('.nav');
      if (nav) {
        nav.classList.toggle('scrolled', (e.animatedScroll || 0) > 150);
      }
    });

    // ── Signal cut — reduced to essential sections ──
    const sections = document.querySelectorAll('[data-scroll-section]');
    const signalCuts: ScrollTrigger[] = [];
    sections.forEach((section, i) => {
      // Only apply signal cuts between major section changes (skip manifestos)
      const id = section.id;
      const isMajor = ['fullbleed', 'bento', 'kinetic', 'horizontal-carousel'].includes(id);
      if (!isMajor) return;

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'top center',
        once: true,
        onEnter: () => {
          const flash = document.createElement('div');
          flash.style.cssText = 'position:fixed;inset:0;background:#0A0A0A;z-index:9999;pointer-events:none;opacity:0;transition:opacity 0.1s ease';
          document.body.appendChild(flash);
          requestAnimationFrame(() => {
            flash.style.opacity = '1';
            setTimeout(() => {
              flash.style.opacity = '0';
              setTimeout(() => flash.remove(), 200);
            }, 80);  // Reduced from 150ms
          });
        },
      });
      signalCuts.push(st);
    });

    // ── Refresh ──
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      signalCuts.forEach((st) => st.kill());
      lenis.destroy();
      gsap.ticker.remove(tickerFn);
    };
  }, []);

  return <>{children}</>;
}
