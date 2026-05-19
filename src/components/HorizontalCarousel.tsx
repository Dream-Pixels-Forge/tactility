'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

/* ═══════════════════════════════════════
   HORIZONTAL CAROUSEL — Product Line Showcase
   Vertical scroll → horizontal translation
   GSAP ScrollTrigger with pin + snap
   ═══════════════════════════════════════ */

interface Product {
  name: string;
  image: string;
  category: string;
  accent: string;
}

const products: Product[] = [
  { name: 'T-9 Vanguard',   image: '/images/webp/bag-1.webp',              category: 'BAG',      accent: '#00F0FF' },
  { name: 'T-9 Ghost',      image: '/images/webp/bag-3.webp',              category: 'BAG',      accent: '#FFFFFF' },
  { name: 'Apex-1',         image: '/images/webp/footwear-red-accent.webp', category: 'FOOTWEAR', accent: '#FF0044' },
  { name: 'Strider-X',      image: '/images/webp/bootwear.webp',           category: 'BOOT',     accent: '#FFB000' },
  { name: 'Synapse Ring',   image: '/images/webp/ring-red-accent.webp',    category: 'HAPTIC',   accent: '#FF0044' },
  { name: 'Optic Overlay',  image: '/images/webp/smart-glasses-1.webp',    category: 'AR',       accent: '#00F0FF' },
];

export default function HorizontalCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const progressTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const totalOverflow = track.scrollWidth - window.innerWidth;
      if (totalOverflow <= 0) return; // bail if track fits within viewport

      // ── Horizontal scroll — vertical scrub drives horizontal translation ──
      gsap.to(track, {
        x: -totalOverflow,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalOverflow}`,
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (products.length - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.out',
          },
          onUpdate: (self) => {
            // Update card depth based on scroll position
            const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
            const progress = self.progress;
            cards.forEach((card, i) => {
              const cardProgress = Math.abs(progress - (i / (cards.length - 1)));
              const isActive = cardProgress < 0.15;
              if (isActive) {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
                // Update progress indicator
                if (progressTextRef.current) {
                  progressTextRef.current.textContent = `${i + 1}/${cards.length}`;
                }
              } else {
                card.style.opacity = '0.6';
                card.style.transform = 'scale(0.92)';
              }
            });
          },
        },
      });

      // ── Header — fades in as section enters view ──
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5,
          },
          opacity: 0,
          y: 40,
          ease: 'power3.out',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      data-scroll-section="products"
      ref={sectionRef}
      className="relative bg-bg-primary"

    >
      {/* ═══ STICKY VIEWPORT ═══ */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ═══ HEADER ═══ */}
        <div
          ref={headerRef}
          className="absolute top-6 sm:top-8 lg:top-10 left-6 sm:left-10 lg:left-16 xl:left-24 z-30 pointer-events-none"
        >
          <h2 className="font-heading font-bold text-[clamp(20px,3vw,48px)] uppercase tracking-[-0.02em] text-text-primary leading-none">
            THE PRODUCT<br />LINE
          </h2>
          <p className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-text-dim/50 mt-2">
            ↓ SCROLL TO EXPLORE
          </p>
        </div>

        {/* ═══ CARDS TRACK ═══ */}
        <div
          ref={trackRef}
          className="flex h-full items-center gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-10 lg:px-16 xl:px-24"
        >
          {products.map((product, index) => (
            <div
              key={product.name}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="carousel-card relative min-w-[85vw] sm:min-w-[55vw] md:min-w-[45vw] lg:min-w-[40vw] aspect-[4/3] bg-bg-card/40 backdrop-blur-sm rounded overflow-hidden group cursor-pointer flex-shrink-0 transition-all duration-500 hover:scale-[1.03]"
              style={{
                opacity: 0.7,
                transform: 'scale(0.92)',
              }}
            >
              {/* ═══ HOVER GLOW BORDER ═══ */}
              <div
                className="absolute inset-0 rounded z-10 pointer-events-none transition-all duration-500"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = product.accent;
                  el.style.boxShadow = `0 0 30px ${product.accent}55, inset 0 0 30px ${product.accent}22`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.borderColor = 'transparent';
                  el.style.boxShadow = 'none';
                }}
              />

              {/* ═══ IMAGE ═══ */}
              <div className="relative w-full h-full p-4 sm:p-6 lg:p-8">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={450}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 55vw, 40vw"
                />
              </div>

              {/* ═══ CATEGORY TAG (top-right) ═══ */}
              <span
                className="absolute top-2 sm:top-3 right-2 sm:right-3 font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase z-20"
                style={{ color: product.accent + '99' }}
              >
                {product.category}
              </span>

              {/* ═══ PRODUCT NAME (bottom-left) ═══ */}
              <span className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 font-heading font-bold text-xs sm:text-sm lg:text-base uppercase tracking-[0.06em] text-text-primary z-20">
                {product.name}
              </span>
            </div>
          ))}
        </div>

        {/* ═══ SCROLL PROGRESS INDICATOR (bottom center) ═══ */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.25em] uppercase text-text-dim/30">
            explore the line
          </span>
          <span ref={progressTextRef} className="font-mono text-sm text-accent-cyan/60">
            1/{products.length}
          </span>
          <span className="text-accent-cyan/40 text-lg leading-none bounce-soft block">→</span>
        </div>
      </div>

      {/* ═══ DECORATIVE GRID OVERLAY ═══ */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
          backgroundSize: 'calc(100vw / 3) calc(100vh / 3)',
        }}
      />
    </section>
  );
}
