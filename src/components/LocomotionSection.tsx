'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const floatingData = [
  { label: 'CADENCE', value: '142', color: 'text-accent-crimson', x: '2%', y: '12%' },
  { label: 'IMPACT', value: '3.4G', color: 'text-accent-crimson', x: '24%', y: '10%' },
  { label: 'TERRAIN', value: 'LOCKED', color: 'text-accent-cyan', x: '24%', y: '85%' },
  { label: 'MPA', value: '500+', color: 'text-accent-amber', x: '2%', y: '88%' },
];

// Product data
const products = [
  {
    name: 'Apex-1',
    category: 'URBAN',
    image: '/images/webp/footwear-red-accent.webp',
    specs: ['MULTI-TIERED SOLE // MAX TRACTION', 'BIOLUMINESCENT HAPTIC SOLE', 'SUB-DERMAL TERRAIN MAPPING'],
    featured: true,
    accent: 'crimson',
  },
  {
    name: 'Strider-X',
    category: 'TACTICAL',
    image: '/images/webp/bootwear.webp',
    specs: ['T-9 CARBON LATTICE TOE-CAPS', '500+ MPa COMPRESSIVE FORCE', 'ANKLE STABILIZATION SYSTEM'],
    featured: false,
    accent: 'white',
  },
  {
    name: 'Phantom',
    category: 'STEALTH',
    image: '/images/webp/footwear-red-accent.webp',
    specs: ['ACOUSTIC DAMPING SOLES', 'THERMAL REGULATION MATRIX', 'ZERO-LATENCY SENSORS'],
    featured: false,
    accent: 'cyan',
  },
];

export default function LocomotionSection() {
  const s = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const dr = useRef<(HTMLDivElement | null)[]>([]);
  const capRef = useRef<HTMLParagraphElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setDR = (i: number) => (el: HTMLDivElement | null) => { dr.current[i] = el; };
  const setProductRef = (i: number) => (el: HTMLDivElement | null) => { productsRef.current[i] = el; };

  useEffect(() => {
    const sec = s.current;
    if (!sec) return;

    // Skip if reduced motion is preferred
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // LOCOMOTION: Rise from bottom (footwear theme) - product-specific reveal
      gsap.from(titleRef.current, {
        scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 45%', scrub: 1.5 },
        opacity: 0,
        y: 60,
        ease: 'power3.out',
      });

      // ── Text: fade up with slight rotation (3D effect) ──
      gsap.from(textRef.current, {
        scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 40%', scrub: 1.5 },
        opacity: 0,
        y: 80,
        ease: 'power3.out',
      });

      // ── Image: rise from bottom (footwear stepping up) ──
      gsap.from(imgRef.current, {
        scrollTrigger: { trigger: sec, start: 'top 80%', end: 'top 40%', scrub: 1.5 },
        opacity: 0,
        y: 120,
        ease: 'power2.out',
      });

      // Image idle float (continuous, not scroll-triggered)
      gsap.to(imgRef.current, { 
        y: -12, 
        duration: 4.5, 
        repeat: -1, 
        yoyo: true, 
        ease: 'sine.inOut' 
      });

      // ── Data readouts — progressive reveal to fix dead scroll ──
      const dataEls = dr.current.filter(Boolean);
      dataEls.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sec,
            start: `${15 + i * 12}% top`,
            end: `${30 + i * 12}% top`,
            scrub: 1.2,
          },
          opacity: 0,
          y: 25,
          ease: 'power2.out',
        });
      });

      // ── Caption: fade up ──
      gsap.from(capRef.current, {
        scrollTrigger:{ trigger:sec, start:'top 55%', end:'top 30%', scrub: 1.5 }, 
        opacity:0, 
        y:30, 
        ease:'power3.out' 
      });
      
      // ── Products: clip-path reveal with stagger ──
      const productCards = productsRef.current.filter(Boolean);
      productCards.forEach((card, i) => {
        // Image reveal from bottom
        const img = card?.querySelector('.product-image') as HTMLElement;
        if (img) {
          gsap.fromTo(img, 
            { clipPath: 'inset(100% 0 0 0)', scale: 1.2 },
            { 
              clipPath: 'inset(0% 0 0 0)', 
              scale: 1, 
              duration: 0.8, 
              ease: 'power3.out',
              scrollTrigger: { 
                trigger: card, 
                start: 'top 85%', 
                end: 'top 45%', 
                scrub: 1.2 
              }
            }
          );
        }
        
        // Card content fade up
        gsap.fromTo(card,
          { opacity: 0, y: 60 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: { 
              trigger: card, 
              start: 'top 85%', 
              end: 'top 50%', 
              scrub: 1.2 
            }
          }
        );
      });

      // Exit transition: footwear fades down toward Neural ring position
      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: sec,
          start: 'bottom 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 0.3,
        scale: 0.8,
        ease: 'power2.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="locomotion" data-scroll-section="locomotion" ref={s} className="relative min-h-[200vh] bg-bg-primary overflow-hidden">
      {/* Grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage:'linear-gradient(to right,#FF0044 1px,transparent 1px),linear-gradient(to bottom,#FF0044 1px,transparent 1px)', backgroundSize:'calc(100vw / 3) calc(100vh / 3)' }}
      />
      
      {/* Sticky container */}
      <div className="sticky top-0 min-h-screen flex flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-24">
        
        {/* Title: LEFT side */}
        <div ref={titleRef} className="absolute top-8 sm:top-10 lg:top-14 left-6 sm:left-10 lg:left-16 xl:left-24 z-30">
          <span className="font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase text-accent-crimson/40">02 // LOCOMOTION</span>
        </div>

        {/* Main content: Image LEFT, Text CENTER-RIGHT */}
        <div className="relative w-full h-full flex items-center">
          
          {/* Image: LEFT side - LARGER */}
          <div ref={imgRef} className="absolute left-[0%] sm:left-[2%] lg:left-[6%] top-1/2 -translate-y-1/2 w-[clamp(350px,55vw,700px)] pointer-events-none z-20 will-change-transform">
            <Image 
              src="/images/webp/footwear-red-accen-transparent-bgt.webp" 
              alt="Cybernetic Locomotion footwear" 
              width={700} 
              height={700} 
              className="w-full h-auto object-contain"
              priority
            />
            {/* Glow effect */}
            <div className="absolute -bottom-[15%] left-[5%] right-[5%] h-[25%] bg-accent-crimson/20 blur-[60px] rounded-full" aria-hidden="true" />
          </div>

          {/* Text: CENTER-RIGHT area - moved away from edge */}
          <div ref={textRef} className="absolute left-[42%] sm:left-[44%] lg:left-[48%] right-[8%] sm:right-[10%] top-1/2 -translate-y-1/2 select-none will-change-transform" style={{ perspective:'1200px' }}>
            <h2 className="font-heading font-bold text-[clamp(40px,9vw,140px)] leading-[0.78] tracking-[-0.04em] uppercase text-left">
              <span className="block text-accent-crimson">CYBERNETIC</span>
              <span className="block text-text-primary">LOCO</span>
              <span className="block text-accent-crimson/80">MOTION</span>
            </h2>
          </div>
        </div>

        {/* Floating data readouts - positioned outside flex container */}
        {floatingData.map((d,i)=>(
          <div 
            key={d.label} 
            ref={setDR(i)} 
            className={`absolute font-mono text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.12em] uppercase z-30 ${d.color}`}
            style={{left:d.x,top:d.y}}
          >
            <span className="text-text-dim/50">{d.label}</span><span className="ml-1.5">{d.value}</span>
          </div>
        ))}

        {/* Caption: CENTER area */}
        <p ref={capRef} className="absolute bottom-28 sm:bottom-32 lg:bottom-36 left-1/2 -translate-x-1/2 w-full max-w-[600px] text-center z-30 will-change-transform">
          <span className="font-heading font-bold text-[clamp(12px,1.3vw,20px)] uppercase tracking-[0.05em] text-text-primary/80">
            A revolution in footwear geometry.<br />The ground before you feel it.
          </span>
        </p>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-text-dim/30">↓ scroll for dossier</span>
        </div>
      </div>

      {/* Product dossier section - Enhanced layout */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-10 lg:px-16 xl:px-24">
        <div ref={prodRef} className="max-w-[1600px] mx-auto w-full">
          {/* Section header */}
          <div className="mb-6 sm:mb-8 lg:mb-10">
            <span className="font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase text-accent-crimson/40">03 // PRODUCT DOSSIER</span>
          </div>
          
          {/* Products grid - Featured + 2 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6">
            {products.map((product, i) => (
              <div
                key={product.name}
                ref={setProductRef(i)}
                className={`
                  product-card group relative
                  ${product.featured ? 'lg:col-span-8' : 'lg:col-span-4'}
                  bg-bg-card/40 backdrop-blur-sm
                  border-t-2 overflow-hidden
                  ${product.accent === 'crimson' ? 'border-accent-crimson/40' : product.accent === 'cyan' ? 'border-accent-cyan/40' : 'border-white/10'}
                  cursor-pointer transition-all duration-500
                  hover:bg-bg-card/70
                `}
              >
                {/* Image container with clip-path reveal */}
                <div className="relative aspect-[16/10] lg:aspect-[4/3] bg-bg-primary/50 overflow-hidden">
                  <div 
                    className="product-image absolute inset-0 w-full h-full"
                    style={{ clipPath: 'inset(100% 0 0 0)' }}
                  >
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill
                      className="w-full h-full object-contain p-4 sm:p-6 lg:p-8 group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 1024px) 100vw, (max-width: 1440px) 66vw, 50vw"
                    />
                  </div>
                  
                  {/* Hover overlay gradient */}
                  <div className={`
                    absolute inset-0 pointer-events-none
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500
                    ${product.accent === 'crimson' 
                      ? 'bg-gradient-to-t from-accent-crimson/10 via-transparent to-transparent' 
                      : product.accent === 'cyan'
                      ? 'bg-gradient-to-t from-accent-cyan/10 via-transparent to-transparent'
                      : 'bg-gradient-to-t from-white/5 via-transparent to-transparent'
                    }
                  `} />
                  
                  {/* Corner accent */}
                  <div className={`
                    absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16
                    border-t-2 border-r-2 transition-all duration-500
                    ${product.accent === 'crimson' 
                      ? 'border-accent-crimson/0 group-hover:border-accent-crimson/60' 
                      : product.accent === 'cyan'
                      ? 'border-accent-cyan/0 group-hover:border-accent-cyan/60'
                      : 'border-white/0 group-hover:border-white/30'
                    }
                  `} />
                </div>
                
                {/* Product info */}
                <div className="p-4 sm:p-5 lg:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className="font-heading font-bold text-sm sm:text-base lg:text-lg uppercase tracking-[0.08em] text-text-primary">
                      {product.name}
                    </span>
                    <span className={`
                      font-mono text-[7px] sm:text-[8px] lg:text-[9px] tracking-[0.15em] uppercase
                      ${product.accent === 'crimson' ? 'text-accent-crimson/50' : product.accent === 'cyan' ? 'text-accent-cyan/50' : 'text-text-dim/40'}
                    `}>
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Specs */}
                  <div className="space-y-1">
                    {product.specs.map((spec, idx) => (
                      <p key={idx} className="font-mono text-[8px] sm:text-[9px] lg:text-[10px] leading-relaxed text-text-dim/60 uppercase tracking-[0.04em]">
                        {spec}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}