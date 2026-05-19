/* ═══════════════════════════════════════════
   TACTILITY — Animations & Interactions
   ═══════════════════════════════════════════ */

// ─── Wait for DOM ───
document.addEventListener('DOMContentLoaded', () => {

  // ─── Lenis Smooth Scroll ───
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  });

  // ─── GSAP + Lenis Integration ───
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // ─── Nav Scroll Effect ───
  const nav = document.querySelector('.nav');
  lenis.on('scroll', (e) => {
    const scrollY = e.animatedScroll || e.targetScroll || 0;
    if (scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Update nav link active states
    const sections = document.querySelectorAll('[data-section]');
    let currentSection = '';
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 200) {
        currentSection = section.dataset.section;
      }
    });

    document.querySelectorAll('.nav-links a').forEach((link) => {
      link.classList.toggle('active', link.dataset.section === currentSection);
    });
  });

  // ─── Nav Link Click ───
  document.querySelectorAll('.nav-links a, .nav-connect').forEach((el) => {
    el.addEventListener('click', (e) => {
      const target = e.currentTarget.dataset.section;
      if (target) {
        const section = document.querySelector(`[data-section="${target}"]`);
        if (section) {
          lenis.scrollTo(section, { duration: 1.5 });
        }
      }
    });
  });

  // ─── 1. HERO: Terminal Typing Effect ───
  const terminalEl = document.getElementById('hero-terminal');
  if (terminalEl) {
    const lines = [
      { text: '> INITIALIZE NEURAL INTERFACE', delay: 300 },
      { text: '> SYNC STATUS: ESTABLISHED', delay: 200 },
      { text: '> WELCOME TO THE NEXT PHASE', delay: 200 },
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let currentLine = '';
    const cursorEl = terminalEl.querySelector('.cursor');

    function typeNextChar() {
      if (lineIndex >= lines.length) {
        if (cursorEl) cursorEl.style.display = 'inline-block';
        // Show the main headline
        gsap.to('.hero-headline', {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
        });
        gsap.to('.hero-sub', {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.8,
          ease: 'power3.out',
        });
        gsap.to('.hero-scroll-indicator', {
          opacity: 1,
          duration: 0.5,
          delay: 1.2,
        });
        return;
      }

      const line = lines[lineIndex];
      const textEl = terminalEl.querySelector(`[data-line="${lineIndex}"]`);

      if (charIndex < line.text.length) {
        currentLine += line.text[charIndex];
        if (textEl) textEl.textContent = currentLine;
        charIndex++;
        setTimeout(typeNextChar, 30 + Math.random() * 20);
      } else {
        currentLine = '';
        charIndex = 0;
        lineIndex++;
        setTimeout(typeNextChar, line.delay);
      }
    }

    // Initialize terminal lines
    const terminalContent = terminalEl.querySelector('.terminal-content');
    lines.forEach((line, i) => {
      const p = document.createElement('p');
      p.dataset.line = i;
      p.innerHTML = '<span></span>';
      terminalContent.appendChild(p);
    });

    // Start typing after a brief pause
    setTimeout(typeNextChar, 500);
  }

  // ─── 2. MANIFESTO: Scroll-Triggered Text Reveals ───
  gsap.utils.toArray('.manifesto-statement').forEach((statement) => {
    const text = statement.querySelector('.heading-xl, .heading-lg, .text-body');
    if (text) {
      gsap.from(text, {
        scrollTrigger: {
          trigger: statement,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      });
    }
  });

  // ─── 3-5. PRODUCT SECTIONS: Card Reveals ───
  gsap.utils.toArray('.product-section').forEach((section) => {
    const header = section.querySelector('.section-number');
    const cards = section.querySelectorAll('.product-card');

    if (header) {
      gsap.from(header, {
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          end: 'top 40%',
          scrub: 1,
        },
        opacity: 0,
        x: -30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }

    cards.forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          end: 'top 60%',
          scrub: 1,
        },
        opacity: 0,
        y: 40,
        duration: 0.7,
        delay: i * 0.15,
        ease: 'power3.out',
      });

      // Counter animation for spec data
      const specEl = card.querySelector('.product-card-spec');
      if (specEl) {
        const percentMatch = specEl.textContent.match(/(\d+)(?=%|Hz|MPa)/g);
        if (percentMatch) {
          ScrollTrigger.create({
            trigger: card,
            start: 'top 70%',
            onEnter: () => {
              percentMatch.forEach((val) => {
                const num = parseInt(val);
                if (num > 0 && num < 10000) {
                  // Simple counter animation placeholder
                  // In production, use gsap.to with onUpdate
                }
              });
            },
          });
        }
      }
    });
  });

  // ─── 5b. Neural Peripherals: Scan-line effect ───
  const glassesCard = document.querySelector('[data-product="optic-overlay"]');
  if (glassesCard) {
    const img = glassesCard.querySelector('img');
    if (img) {
      // Add subtle scan-line animation on hover
      const scanOverlay = document.createElement('div');
      scanOverlay.style.cssText = `
        position: absolute; inset: 0;
        background: repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 240, 255, 0.02) 2px,
          rgba(0, 240, 255, 0.02) 4px
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
      `;
      img.parentElement.appendChild(scanOverlay);
      glassesCard.addEventListener('mouseenter', () => { scanOverlay.style.opacity = '1'; });
      glassesCard.addEventListener('mouseleave', () => { scanOverlay.style.opacity = '0'; });
    }
  }

  // ─── 6. GRID ASSEMBLY: Staggered Reveal ───
  const gridCells = document.querySelectorAll('.grid-cell');
  const gridSection = document.querySelector('.grid-assembly-section');

  if (gridCells.length && gridSection) {
    const cellObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cells = entry.target.querySelectorAll('.grid-cell');
            cells.forEach((cell, i) => {
              setTimeout(() => {
                cell.classList.add('visible');
                // Light up connections
                const connections = cell.querySelector('.grid-connections');
                if (connections) {
                  gsap.to(connections, { opacity: 1, duration: 0.5, delay: 0.2 });
                }
              }, i * 120);
            });
            cellObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    cellObserver.observe(gridSection);

    // Grid heading fade-in
    gsap.from('.grid-assembly-heading', {
      scrollTrigger: {
        trigger: '.grid-assembly-heading',
        start: 'top 80%',
        end: 'top 60%',
        scrub: 1,
      },
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });
  }

  // ─── 6b. Grid label hover effect ───
  gridCells.forEach((cell) => {
    const label = cell.querySelector('.grid-cell-label');
    if (label) {
      cell.addEventListener('mouseenter', () => {
        gsap.to(label, { opacity: 1, duration: 0.3, ease: 'power2.out' });
      });
      cell.addEventListener('mouseleave', () => {
        gsap.to(label, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      });
    }
  });

  // ─── 6c. Grid connection SVG lines ───
  const gridContainer = document.querySelector('.grid-assembly');
  if (gridContainer) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'grid-connections');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:-1;';
    gridContainer.appendChild(svg);

    // Draw connecting lines between grid cells
    const drawConnections = () => {
      const cells = gridContainer.querySelectorAll('.grid-cell');
      if (cells.length < 9) return;

      const cellRects = [];
      cells.forEach((c) => {
        const rect = c.getBoundingClientRect();
        const parentRect = gridContainer.getBoundingClientRect();
        cellRects.push({
          x: rect.left - parentRect.left + rect.width / 2,
          y: rect.top - parentRect.top + rect.height / 2,
        });
      });

      // Connect cells horizontally and vertically
      const connections = [
        [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8], // horizontal
        [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8], // vertical
      ];

      connections.forEach(([from, to]) => {
        if (cellRects[from] && cellRects[to]) {
          const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
          line.setAttribute('x1', cellRects[from].x);
          line.setAttribute('y1', cellRects[from].y);
          line.setAttribute('x2', cellRects[to].x);
          line.setAttribute('y2', cellRects[to].y);
          line.setAttribute('stroke', 'rgba(0, 240, 255, 0.15)');
          line.setAttribute('stroke-width', '1');
          line.style.opacity = '0';
          svg.appendChild(line);

          // Fade in after cells are visible
          setTimeout(() => {
            line.style.transition = 'opacity 0.5s ease';
            line.style.opacity = '1';
          }, 2000);
        }
      });
    };

    // Wait for cells to be in DOM
    setTimeout(drawConnections, 500);
    window.addEventListener('resize', drawConnections);
  }

  // ─── 7. CTA: Terminal Prompt ───
  const ctaTerminal = document.querySelector('.cta-terminal');
  const ctaInputWrapper = document.querySelector('.cta-input-wrapper');
  const ctaInput = document.querySelector('.cta-input');

  if (ctaTerminal && ctaInputWrapper) {
    const ctaText = ctaTerminal.querySelector('.cta-text');
    const ctaCursor = ctaTerminal.querySelector('.cursor');
    const promptText = '> CONNECT? (Y/N)';

    // Type the prompt on scroll into view
    ScrollTrigger.create({
      trigger: '.cta-section',
      start: 'top 60%',
      onEnter: () => {
        if (ctaText && ctaText.textContent === '') {
          let i = 0;
          const typePrompt = () => {
            if (i < promptText.length) {
              ctaText.textContent += promptText[i];
              i++;
              setTimeout(typePrompt, 60 + Math.random() * 40);
            } else {
              // Enable click to reveal input
              ctaTerminal.addEventListener('click', () => {
                ctaInputWrapper.classList.add('open');
                gsap.to(ctaInputWrapper, {
                  maxHeight: 100,
                  opacity: 1,
                  duration: 0.5,
                  ease: 'power3.out',
                });
                setTimeout(() => ctaInput?.focus(), 500);
                if (ctaCursor) ctaCursor.style.display = 'none';
              });
            }
          };
          setTimeout(typePrompt, 500);
        }
      },
      once: true,
    });

    // Enter key submits
    ctaInput?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && ctaInput.value.trim()) {
        // Visual confirmation
        ctaInput.style.borderBottomColor = '#00FF88';
        ctaInput.value = '';

        // Change terminal text
        const ctaText = ctaTerminal.querySelector('.cta-text');
        if (ctaText) {
          gsap.to(ctaText, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              ctaText.textContent = '> CONNECTION ESTABLISHED. WELCOME.';
              ctaText.style.color = '#00FF88';
              gsap.to(ctaText, { opacity: 1, duration: 0.5 });
            },
          });
        }

        ctaInputWrapper.classList.remove('open');
        gsap.to(ctaInputWrapper, {
          maxHeight: 0,
          opacity: 0,
          duration: 0.3,
        });
      }
    });
  }

  // ─── Hero Section: Parallax on the 3x3 grid ───
  const heroGrid = document.querySelector('.hero-grid-cubes');
  if (heroGrid) {
    gsap.to(heroGrid, {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      scale: 0.8,
      opacity: 0.3,
      ease: 'power2.out',
    });
  }

  // ─── Hero Headline & Sub default state ───
  gsap.set('.hero-headline', { opacity: 0, y: 40 });
  gsap.set('.hero-sub', { opacity: 0, y: 20 });
  gsap.set('.hero-scroll-indicator', { opacity: 0 });

  // ─── Section transition effects (signal cut) ───
  const sections = document.querySelectorAll('.section');
  sections.forEach((section, index) => {
    if (index === 0) return; // Skip first

    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'top center',
      onEnter: () => {
        // Subtle flash effect
        const flash = document.createElement('div');
        flash.style.cssText = `
          position: fixed; inset: 0;
          background: #0A0A0A;
          z-index: 998;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
        `;
        document.body.appendChild(flash);
        requestAnimationFrame(() => {
          flash.style.opacity = '1';
          setTimeout(() => {
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 300);
          }, 150);
        });
      },
      once: true,
    });
  });

  // ─── Handle mobile grid connection refresh ───
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Refresh grid connection positions
      const svg = document.querySelector('.grid-assembly svg');
      if (svg) {
        svg.innerHTML = '';
        const cells = document.querySelectorAll('.grid-cell');
        if (cells.length >= 9) {
          const cellRects = [];
          const gridContainer = document.querySelector('.grid-assembly');
          cells.forEach((c) => {
            const rect = c.getBoundingClientRect();
            const parentRect = gridContainer.getBoundingClientRect();
            cellRects.push({
              x: rect.left - parentRect.left + rect.width / 2,
              y: rect.top - parentRect.top + rect.height / 2,
            });
          });

          const connections = [
            [0, 1], [1, 2], [3, 4], [4, 5], [6, 7], [7, 8],
            [0, 3], [3, 6], [1, 4], [4, 7], [2, 5], [5, 8],
          ];

          connections.forEach(([from, to]) => {
            if (cellRects[from] && cellRects[to]) {
              const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
              line.setAttribute('x1', cellRects[from].x);
              line.setAttribute('y1', cellRects[from].y);
              line.setAttribute('x2', cellRects[to].x);
              line.setAttribute('y2', cellRects[to].y);
              line.setAttribute('stroke', 'rgba(0, 240, 255, 0.15)');
              line.setAttribute('stroke-width', '1');
              line.setAttribute('opacity', '0.5');
              svg.appendChild(line);
            }
          });
        }
      }
    }, 300);
  });

  // ─── Refresh ScrollTrigger on load ───
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000);

  console.log('TACTILITY — Interface initialized.');
  console.log('%c FEEL THE FUTURE ', 'background: #0A0A0A; color: #00F0FF; font: bold 16px monospace; padding: 4px 8px;');
});
