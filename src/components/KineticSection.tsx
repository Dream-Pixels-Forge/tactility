'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const floatingData = [
  { label: 'BATT', value: '87%', color: 'text-accent-amber', x: '15%', y: '22%' },
  { label: 'SYNC', value: 'ACTIVE', color: 'text-accent-cyan', x: '72%', y: '18%' },
  { label: 'SHIELD', value: 'ENGAGED', color: 'text-accent-cyan', x: '78%', y: '68%' },
  { label: 'CELL', value: '100Wh', color: 'text-accent-amber', x: '18%', y: '72%' },
];

export default function KineticSection() {
  const s = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const dr = useRef<(HTMLDivElement | null)[]>([]);
  const capRef = useRef<HTMLParagraphElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);
  const setDR = (i: number) => (el: HTMLDivElement | null) => { dr.current[i] = el; };

  useEffect(() => {
    const sec = s.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      // KINETIC: Slide from right (bag theme) - product-specific reveal
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 35%', scrub: 1.5 },
      });
      tl.from(textRef.current, { opacity: 0, x: 100, ease: 'power2.out' })
        .from(imgRef.current, { opacity: 0, x: 150, ease: 'power2.out' }, '-=0.3');

      // Continuous float on image only
      gsap.to(imgRef.current, { y: -12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Data readouts — progressive reveal to fix dead scroll
      const dataEls = dr.current.filter(Boolean);
      dataEls.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sec,
            start: `${20 + i * 15}% top`,
            end: `${35 + i * 15}% top`,
            scrub: 1.2,
          },
          opacity: 0,
          x: 30,
          ease: 'power2.out',
        });
      });

      // Caption + products — single batch
      gsap.from([capRef.current, prodRef.current], {
        scrollTrigger: { trigger: sec, start: 'top 55%', end: 'top 25%', scrub: 1.5 },
        opacity: 0,
        y: 40,
        ease: 'power2.out',
      });

      // Exit transition: bag fades down-left toward Locomotion boot position
      gsap.to(imgRef.current, {
        scrollTrigger: {
          trigger: sec,
          start: 'bottom 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 0.3,
        y: 100,
        x: -50,
        ease: 'power2.inOut',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="kinetic" data-scroll-section="kinetic" ref={s} className="relative min-h-[200vh] bg-bg-primary overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage:'linear-gradient(to right,#00F0FF 1px,transparent 1px),linear-gradient(to bottom,#00F0FF 1px,transparent 1px)', backgroundSize:'calc(100vw / 3) calc(100vh / 3)' }}
      />
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-24">
        <div ref={textRef} className="absolute top-1/2 -translate-y-1/2 right-6 sm:right-10 lg:right-16 xl:right-24 select-none text-right" style={{ perspective:'1200px' }}>
          <h2 className="font-heading font-bold text-[clamp(60px,12vw,180px)] leading-[0.78] tracking-[-0.04em] uppercase text-text-primary">
            <span className="block">KINETIC</span>
            <span className="block text-accent-cyan/80">CARRY</span>
            <span className="block">SYSTEMS</span>
          </h2>
        </div>
        <div ref={imgRef} className="absolute top-1/2 left-[32%] -translate-x-1/2 -translate-y-1/2 w-[clamp(380px,60vw,850px)] pointer-events-none z-20 will-change-transform">
          <Image
            src="/images/webp/bag-transparent-bg.webp"
            alt=""
            width={650}
            height={650}
            className="w-full h-auto object-contain"
            priority
          />
          <div className="absolute -bottom-[15%] left-[5%] right-[5%] h-[25%] bg-accent-cyan/20 blur-[60px] rounded-full" aria-hidden="true" />
        </div>
        {floatingData.map((d,i)=>(
          <div key={d.label} ref={setDR(i)} className={`absolute font-mono text-[9px] sm:text-[11px] tracking-[0.15em] uppercase z-30 ${d.color}`} style={{left:d.x,top:d.y}}>
            <span className="text-text-dim/40">{d.label}</span><span className="ml-2">{d.value}</span>
          </div>
        ))}
        <div className="absolute top-8 sm:top-10 lg:top-14 left-6 sm:left-10 lg:left-16 xl:left-24 z-30">
          <span className="font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase text-accent-amber/40">01 // Kinetic</span>
        </div>
        <p ref={capRef} className="absolute bottom-28 sm:bottom-32 lg:bottom-36 left-6 sm:left-10 lg:left-16 xl:left-24 right-6 sm:right-10 lg:right-16 xl:right-24 z-30">
          <span className="font-heading font-bold text-[clamp(12px,1.3vw,20px)] uppercase tracking-[0.05em] text-text-primary/80">The Vanguard is not a backpack.<br className="block sm:hidden" /> It is an external spine.</span>
        </p>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-text-dim/30">↓ scroll for dossier</span>
        </div>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-end pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div ref={prodRef} className="w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 gap-4 sm:gap-5 auto-rows-[minmax(180px,auto)]">
            {/* T-9 Vanguard — full width hero */}
            <div className="col-span-2 group bg-bg-card/40 backdrop-blur-sm border-t border-accent-cyan/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/bag-1.webp" alt="T-9 Vanguard" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-hover:via-accent-cyan/5 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">T-9 Vanguard</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-accent-cyan/40">HARD-SHELL</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`DUAL-CHANNEL ILLUMINATION // CYAN+LATENCY\nINTEGRATED 100Wh MODULAR POWER CELL\nSIGNAL-SHIELDED FARADAY POCKET`}</pre>
              </div>
            </div>

            {/* T-9 Ghost */}
            <div className="group bg-bg-card/40 backdrop-blur-sm border-t border-white/5 rounded-lg overflow-hidden cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/bag-3.webp" alt="T-9 Ghost" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">T-9 Ghost</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-text-dim/30">LOW-PROFILE</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`SEAMLESS MONOCHROME COMPOSITE\nACTIVE THERMAL MANAGEMENT SYSTEM\nHIDDEN MAGNETIC CLOSURES`}</pre>
              </div>
            </div>

            {/* T-9 Field Kit */}
            <div className="group bg-bg-card/40 backdrop-blur-sm border-t border-white/5 rounded-lg overflow-hidden cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/hero-2.webp" alt="T-9 Field Kit" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">T-9 Field Kit</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-accent-cyan/40">DEPLOYMENT</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`RAPID-DEPLOY MODULAR SYSTEM\nENVIRONMENT-SEALED CARGO\nTACTICAL STRAP INTERFACE`}</pre>
              </div>
            </div>

            {/* T-9 Detail — full width */}
            <div className="col-span-2 group bg-bg-card/40 backdrop-blur-sm border-t border-accent-cyan/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/bag-closeup.webp" alt="T-9 Detail" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-hover:via-accent-cyan/5 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">T-9 Detail</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-accent-cyan/40">MACRO</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`PRECISION-MILLED ALUMINUM LATCHES\nMIL-SPEC ZINC ALLOY HARDWARE\nTOOL-FREE STRAP ADJUSTMENT`}</pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
