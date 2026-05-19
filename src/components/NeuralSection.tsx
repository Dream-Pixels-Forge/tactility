'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

const floatingData = [
  { label: 'HAPTIC', value: 'ON', color: 'text-accent-cyan', x: '10%', y: '18%' },
  { label: 'NERVE', value: 'L5', color: 'text-accent-crimson', x: '78%', y: '20%' },
  { label: 'GRID', value: '3x3', color: 'text-accent-cyan', x: '14%', y: '70%' },
  { label: 'SYNC', value: 'ALL', color: 'text-accent-cyan', x: '76%', y: '76%' },
];

const suppProducts = [
  { name:'Haptic Gloves', img:'/images/webp/smart-glooves.webp', spec:'[TOUCH: ACTIVE | SYNC: LINKED]' },
  { name:'Chronos Watch', img:'/images/webp/smart-watch.webp', spec:'[BIO: MONITORING | TIME: SYNCED]' },
];

export default function NeuralSection() {
  const s = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const dr = useRef<(HTMLDivElement | null)[]>([]);
  const capRef = useRef<HTMLParagraphElement>(null);
  const prodRef = useRef<HTMLDivElement>(null);
  const suppRef = useRef<HTMLDivElement>(null);
  const setDR = (i: number) => (el: HTMLDivElement | null) => { dr.current[i] = el; };

  useEffect(() => {
    const sec = s.current;
    if (!sec) return;
    const ctx = gsap.context(() => {
      // NEURAL: Scale from center (ring theme) - product-specific reveal
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sec, start: 'top 90%', end: 'top 40%', scrub: 1.5 }
      });
      tl.from(textRef.current, { opacity: 0, scale: 0.8, ease: 'power2.out' }, 0);
      tl.from(imgRef.current, { opacity: 0, scale: 0.5, rotation: -30, ease: 'back.out(1.5)' }, 0);

      // Image idle float
      gsap.to(imgRef.current, { y: -10, duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      // Data readouts — progressive reveal to fix dead scroll
      const dataEls = dr.current.filter(Boolean);
      const dirs = [{x:-60,y:-40},{x:80,y:-50},{x:-50,y:70},{x:60,y:60}];
      dataEls.forEach((el, i) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: sec,
            start: `${18 + i * 12}% top`,
            end: `${35 + i * 12}% top`,
            scrub: 1.2,
          },
          opacity: 0,
          x: dirs[i].x,
          y: dirs[i].y,
          scale: 0.5,
          ease: 'power3.out',
        });
        // Idle float
        gsap.to(el, { y: -4+i*5, x: 4-i*2, duration: 4+i*0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });

      gsap.from(capRef.current, { scrollTrigger:{ trigger:sec, start:'top 60%', end:'top 35%', scrub:1.5 }, opacity:0, y:30, ease:'power3.out' });
      gsap.from(prodRef.current, { scrollTrigger:{ trigger:sec, start:'top 55%', end:'top 25%', scrub:1.5 }, opacity:0, y:100, ease:'power3.out' });
      gsap.from(suppRef.current, { scrollTrigger:{ trigger:sec, start:'top 45%', end:'top 15%', scrub:1.5 }, opacity:0, y:60, ease:'power3.out' });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="neural" data-scroll-section="neural" ref={s} className="relative min-h-[200vh] bg-bg-primary overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{ backgroundImage:'linear-gradient(to right,#00F0FF 1px,transparent 1px),linear-gradient(to bottom,#00F0FF 1px,transparent 1px)', backgroundSize:'calc(100vw / 3) calc(100vh / 3)' }}
      />
      <div className="sticky top-0 min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 sm:px-10 lg:px-16 xl:px-24">
        <div ref={textRef} className="relative w-full select-none" style={{ perspective:'1200px' }}>
          <h2 className="font-heading font-bold text-[clamp(60px,12vw,180px)] leading-[0.78] tracking-[-0.04em] uppercase text-center">
            <span className="block text-accent-cyan">NEURAL</span>
            <span className="block text-text-primary">PERI</span>
            <span className="block text-accent-cyan/80">PHERALS</span>
          </h2>
        </div>
        <div ref={imgRef} className="absolute top-1/2 left-[35%] -translate-x-1/2 -translate-y-1/2 w-[clamp(320px,50vw,700px)] pointer-events-none z-20 will-change-transform">
          <Image src="/images/webp/ring-transparent-bg.webp" alt="" width={600} height={600} className="w-full h-auto object-contain" />
          <div className="absolute -bottom-[15%] left-[5%] right-[5%] h-[25%] bg-accent-cyan/20 blur-[60px] rounded-full" aria-hidden="true" />
        </div>
        {floatingData.map((d,i)=>(
          <div key={d.label} ref={setDR(i)} className={`absolute font-mono text-[9px] sm:text-[11px] tracking-[0.15em] uppercase z-30 will-change-transform ${d.color}`} style={{left:d.x,top:d.y}}>
            <span className="text-text-dim/40">{d.label}</span><span className="ml-2">{d.value}</span>
          </div>
        ))}
        <div className="absolute top-8 sm:top-10 lg:top-14 left-6 sm:left-10 lg:left-16 xl:left-24 z-30">
          <span className="font-mono text-[9px] sm:text-xs tracking-[0.2em] uppercase text-accent-cyan/40">03 // Neural</span>
        </div>
        <p ref={capRef} className="absolute bottom-28 sm:bottom-32 lg:bottom-36 left-6 sm:left-10 lg:left-16 xl:left-24 right-6 sm:right-10 lg:right-16 xl:right-24 z-30 text-center will-change-transform">
          <span className="font-heading font-bold text-[clamp(12px,1.3vw,20px)] uppercase tracking-[0.05em] text-text-primary/80">The nerve endings of the Tactility ecosystem.</span>
        </p>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
          <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-text-dim/30">↓ scroll for dossier</span>
        </div>
      </div>
      <div className="relative z-10 min-h-screen flex flex-col justify-end pb-12 sm:pb-16 lg:pb-20 px-6 sm:px-10 lg:px-16 xl:px-24">
        <div ref={prodRef} className="max-w-[1440px] mx-auto w-full will-change-transform">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <div className="lg:col-span-2 group bg-bg-card/40 backdrop-blur-sm border-t border-t-accent-cyan/30 cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/ring-red-accent.webp" alt="Synapse Ring" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" loading="eager" />
                <div className="absolute inset-0 bg-gradient-to-t from-accent-cyan/0 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-hover:via-accent-cyan/5 transition-opacity duration-500 pointer-events-none" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">Synapse Ring</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-accent-cyan/40">HAPTIC</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`3x3 GRID-ETCHED HAPTIC INTERFACE\nDISTINCT VIBRATION PATTERNS\nT-9 GRID ECOSYSTEM SYNC`}</pre>
              </div>
            </div>
            <div className="group bg-bg-card/40 backdrop-blur-sm border-t border-t-accent-cyan/20 cursor-pointer transition-all duration-400 hover:bg-bg-card/60">
              <div className="relative aspect-[4/3] bg-bg-primary/60 overflow-hidden">
                <Image src="/images/webp/smart-glasses-1.webp" alt="Optic Overlay V-1" width={600} height={450} className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-[1.04] transition-transform duration-700" />
              </div>
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <span className="font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.08em] text-text-primary">Optic Overlay V-1</span>
                  <span className="font-mono text-[8px] sm:text-[9px] tracking-[0.15em] uppercase text-accent-cyan/40">AR</span>
                </div>
                <pre className="font-mono text-[9px] sm:text-[10px] leading-loose text-text-dim uppercase tracking-[0.05em] whitespace-pre-line">{`HIGH-FIDELITY AUGMENTED REALITY\nREAL-TIME BIOMETRIC MONITORING\nENVIRONMENTAL SCANNING OVERLAY`}</pre>
              </div>
            </div>
          </div>
          <div ref={suppRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-4 sm:mt-6 will-change-transform">
            {suppProducts.map((p) => (
              <div key={p.name} className="group bg-bg-card/30 backdrop-blur-sm border-t border-t-accent-cyan/10 cursor-pointer transition-all duration-400 hover:bg-bg-card/50">
                <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 bg-bg-primary/60 rounded overflow-hidden">
                    <Image src={p.img} alt={p.name} width={80} height={80} className="w-full h-full object-contain p-2" />
                  </div>
                  <div>
                    <p className="font-heading font-bold text-xs uppercase tracking-[0.08em] mb-0.5">{p.name}</p>
                    <pre className="font-mono text-[8px] sm:text-[9px] text-text-dim uppercase tracking-[0.05em]">{p.spec}</pre>
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
