'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });
    }
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'TACTILITY', section: 'hero' },
    { label: 'MANIFESTO', section: 'manifesto' },
    { label: 'KINETIC', section: 'kinetic' },
    { label: 'LOCOMOTION', section: 'locomotion' },
    { label: 'NEURAL', section: 'neural' },
    { label: 'CONNECT', section: 'cta' },
  ];

  // Desktop navigation (9-column grid)
  const desktopItems = [
    { type: 'empty' as const },
    { type: 'link' as const, ...navItems[0] },
    { type: 'link' as const, ...navItems[1] },
    { type: 'link' as const, ...navItems[2] },
    { type: 'empty' as const },
    { type: 'link' as const, ...navItems[3] },
    { type: 'link' as const, ...navItems[4] },
    { type: 'link' as const, ...navItems[5] },
    { type: 'empty' as const },
  ];

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-accent-cyan origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* Desktop Navigation */}
      <nav 
        className="nav fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 bg-bg-primary/60 backdrop-blur-md hidden md:block"
        aria-label="Main navigation"
      >
        <div className="grid grid-cols-9 w-full h-12 sm:h-14 border-b border-white/10">
          {desktopItems.map((item, i) => {
            if (item.type === 'empty') {
              return (
                <div
                  key={i}
                  className="border-r border-white/10 last:border-r-0 first:border-l border-l-white/10 transition-all duration-300 hover:bg-white/[0.03]"
                />
              );
            }
            return (
              <button
                key={i}
                onClick={() => item.section && scrollTo(item.section)}
                className={`
                  font-mono text-[8px] sm:text-[9px] lg:text-[10px]
                  tracking-[0.15em] uppercase
                  border-r border-white/10 last:border-r-0 first:border-l border-l-white/10
                  flex items-center justify-center
                  transition-all duration-300 cursor-pointer
                  text-white/70 hover:text-accent-cyan hover:bg-white/[0.05]
                `}
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav 
        className="nav fixed top-0 left-0 right-0 z-50 w-full transition-all duration-400 bg-bg-primary/80 backdrop-blur-md md:hidden"
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between h-12 px-4 border-b border-white/10">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-mono text-[10px] tracking-[0.15em] uppercase text-white/70 hover:text-accent-cyan"
            aria-label="Go to home"
          >
            TACTILITY
          </button>

          {/* Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-1.5 cursor-pointer"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={`w-5 h-0.5 bg-white/70 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-white/70 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-white/70 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div 
          className={`absolute top-full left-0 right-0 bg-bg-primary/95 backdrop-blur-md border-b border-white/10 overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className="flex flex-col py-2">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollTo(item.section)}
                className="font-mono text-[11px] tracking-[0.15em] uppercase text-white/70 hover:text-accent-cyan hover:bg-white/[0.05] py-3 px-4 text-left transition-all duration-300"
                aria-label={`Navigate to ${item.label}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}
