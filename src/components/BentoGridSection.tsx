'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Toast notification component
function ProductToast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
      <div className="bg-bg-card/90 backdrop-blur-md border border-accent-cyan/30 px-6 py-3 rounded-none">
        <p className="font-mono text-xs tracking-[0.1em] uppercase text-accent-cyan">
          {message}
        </p>
      </div>
    </div>
  );
}

// Enhanced bento items with detailed product info
const bentoItems = [
  {
    src: '/images/webp/hero-1.webp',
    alt: 'Tactility flagship',
    label: 'FLAGSHIP',
    desc: 'Nine neural contact points. One unified interface.',
    specs: ['9 Neural Points', 'Haptic Feedback', 'Wireless Sync', '48h Battery'],
    price: '$2,499',
    available: true,
    colSpan: 'col-span-2 md:col-span-2 lg:col-span-4',
    rowSpan: 'row-span-2',
    accent: 'cyan',
  },
  {
    src: '/images/webp/bag-1.webp',
    alt: 'T-9 Vanguard',
    label: 'VANGUARD',
    desc: 'Modular carry. Full-spectrum signal shield.',
    specs: ['Signal Blocking', 'Modular Pockets', 'Waterproof', 'Anti-theft'],
    price: '$899',
    available: true,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    accent: 'cyan',
  },
  {
    src: '/images/webp/footwear-red-accent.webp',
    alt: 'Apex-1',
    label: 'APEX-1',
    desc: 'Multi-tiered sole. Bioluminescent haptics.',
    specs: ['Bio-luminescent', 'Terrain Adapt', 'GPS Tracking', 'Shock Absorb'],
    price: '$1,299',
    available: true,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-2',
    accent: 'crimson',
  },
  {
    src: '/images/webp/heel-1.webp',
    alt: 'Heel detail',
    label: 'HEEL',
    desc: 'Carbon lattice. Sub-dermal mapping.',
    specs: ['Carbon Fiber', 'Pressure Map', 'Gait Analysis', 'Lightweight'],
    price: '$449',
    available: false,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'cyan',
  },
  {
    src: '/images/webp/smart-glasses-1.webp',
    alt: 'Optic overlay',
    label: 'OPTIC',
    desc: 'Real-time biometric AR overlay.',
    specs: ['AR Display', 'Biometric Scan', 'UV Protection', 'Voice Cmd'],
    price: '$1,599',
    available: true,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'cyan',
  },
  {
    src: '/images/webp/ring-transparent-bg.webp',
    alt: 'Synapse Ring',
    label: 'SYNAPSE',
    desc: '3×3 grid-etched haptic interface.',
    specs: ['9 Haptic Zones', 'Gesture Ctrl', 'Sleep Track', 'Titanium'],
    price: '$399',
    available: true,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'cyan',
  },
  {
    src: '/images/webp/smart-watch.webp',
    alt: 'Chronos watch',
    label: 'CHRONOS',
    desc: 'Bio-monitoring. Time-synced ecosystem.',
    specs: ['Heart Monitor', 'ECG Ready', '7-Day Battery', 'OLED Display'],
    price: '$699',
    available: true,
    colSpan: 'col-span-1 md:col-span-1 lg:col-span-1',
    accent: 'cyan',
  },
  {
    src: '/images/webp/smart-glooves.webp',
    alt: 'Haptic Gloves',
    label: 'GLOVES',
    desc: 'Touch active. Sync linked.',
    specs: ['Full Palm Haptics', 'Touch Sync', 'Gesture Match', 'Washable'],
    price: '$799',
    available: true,
    colSpan: 'col-span-2 md:col-span-2 lg:col-span-2',
    accent: 'crimson',
  },
];

export default function BentoGridSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sublabelRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [toast, setToast] = useState<{ message: string; key: number } | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<typeof bentoItems[0] | null>(null);

  const handleProductClick = useCallback((product: typeof bentoItems[0]) => {
    setSelectedProduct(product);
  }, []);

  const handleCloseProduct = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // ── Heading: slide up with slight blur - quick ──
      gsap.from(headingRef.current, {
        scrollTrigger: { trigger: section, start: 'top 85%', end: 'top 50%', scrub: 0.8 },
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
        ease: 'power3.out',
      });

      // ── Sublabel: fade up - quick ──
      gsap.from(sublabelRef.current, {
        scrollTrigger: { trigger: section, start: 'top 80%', end: 'top 45%', scrub: 0.8 },
        opacity: 0,
        y: 20,
        ease: 'power3.out',
      });

      // ── Bento cells: clip-path reveal with stagger ──
      const cells = cellsRef.current.filter(Boolean);
      cells.forEach((cell, i) => {
        const img = cell?.querySelector('.bento-image') as HTMLElement;
        
        // Image clip-path reveal from bottom - moderate pace
        if (img) {
          gsap.fromTo(img,
            { clipPath: 'inset(100% 0 0 0)', scale: 1.3 },
            {
              clipPath: 'inset(0% 0 0 0)',
              scale: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cell,
                start: 'top 85%',
                end: 'top 40%',
                scrub: 1.2,
              }
            }
          );
        }

        // Card entrance with slight rotation - staggered timing
        gsap.fromTo(cell,
          { opacity: 0, y: 50, rotateX: 5 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.05,
            scrollTrigger: {
              trigger: cell,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 1.2,
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  const setCellRef = (i: number) => (el: HTMLDivElement | null) => {
    cellsRef.current[i] = el;
  };

  return (
    <>
    <section
      id="bento"
      data-scroll-section="bento"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-16 xl:px-24 py-16 sm:py-20 lg:py-24 overflow-hidden bg-bg-primary"
    >
      {/* Toast notification */}
      {toast && (
        <ProductToast 
          message={toast.message} 
          onClose={() => setToast(null)} 
        />
      )}

      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: 'linear-gradient(to right, #00F0FF 1px, transparent 1px), linear-gradient(to bottom, #00F0FF 1px, transparent 1px)',
          backgroundSize: 'calc(100vw / 4) calc(100vh / 4)',
        }}
      />

      {/* Heading */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto mb-10 sm:mb-14 lg:mb-18">
        <h2
          ref={headingRef}
          className="font-heading font-bold text-[clamp(32px,6vw,72px)] uppercase tracking-[-0.02em] text-text-primary leading-[0.95] text-center"
        >
          THE ECOSYSTEM
        </h2>
        <p
          ref={sublabelRef}
          className="font-mono text-[9px] sm:text-[10px] lg:text-[11px] tracking-[0.25em] uppercase text-text-dim/40 mt-3 sm:mt-4 text-center"
        >
          THREE PILLARS. FIVE EXTENSIONS. ONE INTERFACE.
        </p>
      </div>

      {/* Bento Grid - Enhanced layout */}
      <div
        ref={gridRef}
        className="relative z-10 w-full max-w-[1600px] mx-auto"
      >
        {/* Grid: 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-[140px] sm:auto-rows-[180px] lg:auto-rows-[200px]">
          {bentoItems.map((item, idx) => (
            <div
              ref={setCellRef(idx)}
              key={idx}
              onClick={() => handleProductClick(item)}
              onKeyDown={(e) => e.key === 'Enter' && handleProductClick(item)}
              role="button"
              tabIndex={0}
              className={`
                bento-cell group relative overflow-hidden cursor-pointer
                ${item.colSpan}
                ${item.rowSpan || ''}
                bg-bg-card/30 backdrop-blur-sm
                border-t-2
                transition-all duration-500
                hover:bg-bg-card/60
                hover:-translate-y-1
                focus:outline-none focus:ring-2 focus:ring-accent-cyan/50
                ${item.accent === 'crimson' 
                  ? 'border-accent-crimson/30 hover:border-accent-crimson/60' 
                  : 'border-accent-cyan/20 hover:border-accent-cyan/50'
                }
              `}
            >
              {/* Image with clip-path reveal */}
              <div 
                className="bento-image absolute inset-0 w-full h-full"
                style={{ clipPath: 'inset(100% 0 0 0)' }}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-contain p-4 sm:p-5 lg:p-6 transition-transform duration-700 ease-out group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  loading={idx < 4 ? 'eager' : 'lazy'}
                />
              </div>

              {/* Hover overlay gradient */}
              <div className={`
                absolute inset-0 pointer-events-none
                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                ${item.accent === 'crimson'
                  ? 'bg-gradient-to-t from-accent-crimson/15 via-transparent to-transparent'
                  : 'bg-gradient-to-t from-accent-cyan/10 via-transparent to-transparent'
                }
              `} />

              {/* Label - top left */}
              <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 z-10">
                <span className={`
                  inline-block font-mono text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.2em] uppercase
                  ${item.accent === 'crimson' ? 'text-accent-crimson/60' : 'text-accent-cyan/50'}
                  group-hover:text-accent-cyan/80 transition-colors duration-300
                `}>
                  {item.label}
                </span>
              </div>

              {/* Description - bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-10">
                <span className={`
                  block font-mono text-[6px] sm:text-[7px] lg:text-[8px] tracking-[0.1em] uppercase
                  text-text-dim/0 group-hover:text-text-dim/50
                  opacity-0 group-hover:opacity-100
                  transition-all duration-500
                  transform translate-y-2 group-hover:translate-y-0
                `}>
                  {item.desc}
                </span>
              </div>

              {/* Corner accent - top right */}
              <div className={`
                absolute top-0 right-0 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12
                border-t-2 border-r-2
                transition-all duration-500
                ${item.accent === 'crimson'
                  ? 'border-accent-crimson/0 group-hover:border-accent-crimson/50'
                  : 'border-accent-cyan/0 group-hover:border-accent-cyan/40'
                }
              `} />

              {/* Bottom accent line */}
              <div className={`
                absolute bottom-0 left-0 h-[2px]
                transition-all duration-500
                ${item.accent === 'crimson'
                  ? 'w-0 group-hover:w-full bg-accent-crimson/40'
                  : 'w-0 group-hover:w-full bg-accent-cyan/30'
                }
              `} />
            </div>
          ))}
        </div>
      </div>
</section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-modal-title"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-bg-primary/90 backdrop-blur-md"
            onClick={handleCloseProduct}
          />
          
          {/* Modal Content */}
          <div className={`
            relative w-full max-w-lg bg-bg-card border-2
            ${selectedProduct.accent === 'crimson' ? 'border-accent-crimson/40' : 'border-accent-cyan/40'}
            p-6 sm:p-8
          `}>
            {/* Close button */}
            <button
              onClick={handleCloseProduct}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center
                text-text-dim/60 hover:text-text-primary transition-colors
                border border-text-dim/20 hover:border-accent-cyan/50"
              aria-label="Close modal"
            >
              ×
            </button>

            {/* Product Image */}
            <div className="relative w-full h-48 mb-6 bg-bg-primary/50">
              <Image
                src={selectedProduct.src}
                alt={selectedProduct.alt}
                fill
                className="object-contain p-4"
              />
            </div>

            {/* Product Title */}
            <h3 
              id="product-modal-title"
              className={`
                font-heading font-bold text-2xl uppercase tracking-[-0.02em] mb-2
                ${selectedProduct.accent === 'crimson' ? 'text-accent-crimson' : 'text-accent-cyan'}
              `}
            >
              {selectedProduct.label}
            </h3>

            {/* Description */}
            <p className="font-mono text-sm text-text-dim/60 mb-4">
              {selectedProduct.desc}
            </p>

            {/* Specs */}
            <div className="mb-6">
              <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-text-dim/40 mb-3">
                SPECIFICATIONS
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.specs?.map((spec, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider
                      bg-bg-primary/50 border border-text-dim/20 text-text-dim/60"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Price & Availability */}
            <div className="flex items-center justify-between pt-4 border-t border-text-dim/10">
              <div>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-dim/40">
                  PRICE
                </span>
                <p className="font-heading font-bold text-xl text-text-primary">
                  {selectedProduct.price}
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-dim/40">
                  STATUS
                </span>
                <p className={`
                  font-mono text-sm uppercase tracking-wider
                  ${selectedProduct.available ? 'text-accent-cyan' : 'text-accent-amber'}
                `}>
                  {selectedProduct.available ? 'Available' : 'Coming Soon'}
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              className={`
                w-full mt-6 py-3 font-mono text-xs uppercase tracking-[0.2em]
                transition-all duration-300
                ${selectedProduct.available 
                  ? 'bg-accent-cyan/20 border border-accent-cyan/40 text-accent-cyan hover:bg-accent-cyan/30' 
                  : 'bg-accent-amber/10 border border-accent-amber/30 text-accent-amber/60 cursor-not-allowed'
                }
              `}
              disabled={!selectedProduct.available}
            >
              {selectedProduct.available ? 'Add to Cart' : 'Notify Me'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}