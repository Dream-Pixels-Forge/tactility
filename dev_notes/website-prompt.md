# TACTILITY — Cinematic Website Prompt

## Creative Brief

- **Type**: Brand / Creative Concept Site (cybernetic wearable ecosystem)
- **Audience**: Digital pioneers, transhumanists, tech-forward individuals who see biological fragility as a limitation, not a given
- **Goal**: Convert visitors from intrigued onlookers to believers in the Tactility vision — make them feel the future is already here and want to be part of it
- **Tone**: Manifesto-grade. Authoritative, sharp, uncompromising. Reads like a tech thriller meets a military briefing.
- **Language**: English — declarative, imperative, technically precise
- **Cinematic Reference**: *Blade Runner 2049* UI terminals × *ACRONYM* product presentation × *Nothing* hardware minimalism

---

## PROJECT

Tactility is a cybernetic brand that engineers the seamless interface between the human nervous system and the digital world. Their product ecosystem spans three pillars — Kinetic Carry Systems, Cybernetic Locomotion, and Neural Peripherals — all unified through the proprietary T-9 Carbon Lattice and the 3x3 grid interface system. The brand's voice is a manifesto: "The human body is an unfinished prototype."

## GOAL

The visitor must feel, within 10 seconds, that this is not a fashion brand or a tech company — it's a *transformation*. Every scroll deepens their conviction that the future of human-machine integration has already been engineered. The site must convert belief into connection — a terminal prompt, not a contact form.

### RULES — NON NEGOTIABLE

DO:

- Use the 3x3 grid as a **structural layout primitive** — every section must reference it
- Enforce **color-function mapping**: Cyan = data/network, Crimson = biological pulse/warning, Amber = power/status, White = stealth/ghost
- Present products as **classified tech dossiers**, not retail listings
- Use the Synapse Ring's 3x3 etched grid as a recurring UI motif across all scroll sections
- Use **mono font (JetBrains Mono)** for all data readouts, specs, and status indicators
- Apply product-specific accent glows on hover (cyan for Vanguard, crimson for Apex-1, ripple for Synapse Ring)
- Use "signal cut" transitions between major sections (brief black wipe before next frame)
- Keep product lighting consistent per product (matte black with cyan edge for Vanguard, high-gloss with red lining for Apex-1, extreme close-up engraved for Synapse Ring)

DO NOT:

- Use stock photography, lifestyle product shots, or models
- Use warm neutrals, pastels, or corporate blues (#007bff style)
- Animate width/height/top/left — use transform only
- Use gradients that fade into grey mush — keep palette razor-clean
- Implement parallax on mobile or more than 2 parallax elements per viewport
- Add hamburger menus on desktop
- Use "shop now" or "buy" language — this is not ecommerce
- Over-animated particle backgrounds — every motion must feel functional, like an interface booting

---

## STYLE FOUNDATION

**Dark Cyber-Industrial Terminal**

- Full black background `#0A0A0A` as the primary surface — the void
- The 3x3 grid is the only constant across all sections — as invisible layout infrastructure and visible decorative motif
- Products exist in absolute darkness with directional edge lighting in their signature accent color
- Data readouts in mono font serve as live-feeling UI atmosphere — static metrics that read like live telemetry
- Typography is the primary storytelling device — the manifesto voice commands full-screen text sections
- No decorative imagery — everything is product render, type-driven content, or data visualization

### COLOR SYSTEM

- Background: `#0A0A0A` (near-black void)
- Surface: `#141414` / `#1A1A1A` (deep charcoal for cards, dossier panels, section dividers)
- Text: `#E8E8E8` (cool white)
- Accent — Cyan (Data Stream): `#00F0FF` → network signals, neural sync indicators, interactive elements, Vanguard data-port glow, Synapse Ring communication light
- Accent — Crimson (Biological Pulse): `#FF0044` → warnings, CTAs, high-energy states, Apex-1 sole illumination, thermal vent glow, the organic signature cutting through cold tech
- Accent — Amber (Power Reserve): `#FFB000` → battery status, energy metrics, system health bars — use sparingly
- Accent — Ghost White: `#FFFFFF` → Ghost shroud products, high-contrast labels on dark surfaces only

### TYPOGRAPHY

- Headings: **Blender Pro** (or **Neue Machina**) — bold 700, all-caps for section markers and product names, tracking +0.05em
- Body/UI: **Inter** (or **Space Grotesk**) — 15–16px, 1.6 line-height, 0 tracking
- Mono: **JetBrains Mono** (or **IBM Plex Mono**) — 12–13px uppercase, tracking +0.1em — the voice of the machine. Use for all data readouts, specs, status bars, grid labels
- Spec values (>500 MPa, 100Wh): mono, slightly larger, accent-colored per product
- Scale: hero headings 120–160px (the 3x3 matrix text), section headings 48–64px, body 15–16px

---

## EXPERIENCE STRUCTURE (SCROLL-DRIVEN)

A single-page scroll journey through 7 acts, structured like booting into a new operating system for the human body. Each act is a full-screen or near-full-screen section with its own mood, lighting, and data readout language. The scroll is linear but cinematic — the user is being guided through the ecosystem.

---

## SECTIONS AND BEHAVIORS

### 1. GRID GENESIS — HERO

Full-screen black void. The 3x3 grid of T-A-C / T-I-L / I-T-Y hovers at center — a slowly rotating cube assembly, each letter a carbon-lattice block, drifting. Cyan particles drift between blocks. Every 5 seconds, a faint crimson pulse ripples across the matrix. No other elements visible.

- The 3x3 grid blocks (geometric, carbon-fibre texture)
- Faint hairline grid rules extending to screen edges at 10% opacity
- Terminal initialization text at bottom, in JetBrains Mono, typing in on load:
  ```
  > INITIALIZE NEURAL INTERFACE
  > SYNC STATUS: ESTABLISHED
  > WELCOME TO THE NEXT PHASE
  ```
- Below terminal text, after 2s delay: "TACTILITY" in Blender Pro 700, then "The Biological Interface" in Inter, then scroll indicator

SCROLL EFFECT:

- Hero pins for the first scroll segment (scroll-pinning via GSAP ScrollTrigger)
- The 3x3 matrix slowly rotates on idle (0.02rad/s), accelerates to 0.05rad/s on mouse move
- Terminal text types in: 0.8s per line, 300ms stagger
- On scroll away: the matrix dissolves into grid lines that become the section divider
- Background: pure black `#0A0A0A`

HOVER:

- Grid blocks: subtle scale 1.02 + cyan glow on individual letters

---

### 2. MANIFESTO — PHILOSOPHY

Full-screen, type-driven. One bold statement per scroll block. The background is `#0A0A0A` with the 3x3 grid visible as faint hairline rules at 5% opacity. No images. The text IS the visual.

- Statement 1: "THE HUMAN BODY IS AN UNFINISHED PROTOTYPE." (Blender Pro 700, 72px, all-caps, `#E8E8E8`)
- Statement 2: "YOU WERE BORN WITH SENSORY LIMITS THE MODERN WORLD HAS ALREADY OUTPACED." (smaller, Inter 24px, `#E8E8E8`)
- Statement 3: "TO REMAIN HUMAN IS TO EVOLVE." (Blender Pro 700, 96px, crimson `#FF0044`)
- Statement 4: "TACTILITY ENGINEERS THE SEAMLESS INTERFACE." (Blender Pro, 64px)

SCROLL EFFECT:

- Each statement fades up individually as it scrolls into center viewport (60% from top)
- Text resolves like a data stream — mask-reveal from bottom, 0.8s per line
- Between statements: the screen goes briefly black (signal cut, 200ms)
- Background: subtle carbon-fibre micro-texture at 3% opacity, gently pulsing with the scroll rhythm

RULES:

- Absolutely no images or decorative elements on this section
- The typeface weight and size hierarchy carries the emotional journey
- The crimson statement (statement 3) is the climax — it should feel like a heartbeat

SKILLS TO USE:

- dpf-movematics — scroll-triggered text resolves with easing curves
- dpf-layout-master — ensure full-screen type sections don't break on any viewport

---

### 3. KINETIC CARRY SYSTEMS — PRODUCT ECOSYSTEM

Full-height, dark backdrop `#141414` with faint 3x3 grid overlay. Two products side-by-side in a 3-column grid zone: Vanguard left (2 cols), Ghost right (1 col). Each product is presented as a dossier card with render + data readout.

- Section header: "01 | KINETIC CARRY SYSTEMS" (JetBrains Mono, all-caps, amber `#FFB000`, tracking +0.1em)
- T-9 Vanguard card: image `/images/bag-1.png` — matte black armor render with cyan data-port edge glow. Hover: switch to `/images/bag-closeup.png` for detail view. Spec readout:
  ```
  [STATUS]
  BATT: 87% | SYNC: ACTIVE | SHIELD: ENGAGED
  DU CH: DUAL | CELL: 100Wh | FP: ARMED
  ```
  Caption: "THE VANGUARD IS NOT A BACKPACK — IT IS AN EXTERNAL SPINE."
- T-9 Ghost card (smaller): image `/images/bag-3.png` — monochrome white render, thermal vent red glow. Spec:
  ```
  [STATUS]
  PROFILE: LOW | THERMAL: ACTIVE | LOAD: IDLE
  ```
  Caption: "STREAMLINED. SEAMLESS. SIGNAL-PROTECTED."

SCROLL EFFECT:

- Section header slides in from left, mono, 0.5s ease-out
- Vanguard card: fades up + scale 0.97→1, 0.7s, with cyan grid lines drawing in behind it
- Ghost card: staggers 200ms after Vanguard, slides in from right
- Data readout numbers animate on viewport entry (87% counts from 0, etc.)
- On scroll exit: screen wipe with brief black (signal cut)

HOVER:

- Vanguard: product scale 1.02, cyan data-port pulse intensifies, data readout line glows
- Ghost: thermal vent slots glow brighter (red), product rotates slightly on Y axis

SKILLS TO USE:

- dpf-movematics — counter animations for data readouts
- dpf-layout-master — 3-column grid layout with 2:1 column split

---

### 4. CYBERNETIC LOCOMOTION — PRODUCT ECOSYSTEM

Full-height, dark backdrop. Apex-1 and Strider-X side-by-side. Same dossier card structure as section 3, but the mood is more aggressive — the crimson accent dominates.

- Section header: "02 | CYBERNETIC LOCOMOTION" (JetBrains Mono, crimson `#FF0044`)
- Apex-1 card: image `/images/footwear-red-accent.png` — high-gloss black render with red inner lining visible, bioluminescent sole pulsing red. Hover: switch to `/images/heel-1.png` for sole detail. Spec:
  ```
  [GAIT ANALYSIS]
  CADENCE: 142 | IMPACT: 3.4G | TERRAIN: LOCKED
  SOLE: BIO-HAPTIC | MAP: SUB-DERMAL
  ```
  Caption: "A REVOLUTION IN FOOTWEAR GEOMETRY. THE GROUND BEFORE YOU FEEL IT."
- Strider-X card: image `/images/bootwear.png` — overbuilt modular straps, industrial red/black, wide footprint. Spec:
  ```
  [STRUCTURAL]
  LOAD: 500+ MPa | MAT: T-9 C | STAB: ACTIVE
  ANKLE: REINFORCED | MODE: TACTICAL
  ```
  Caption: "OVERBUILT BY DESIGN. HOSTILE ENVIRONMENT CERTIFIED."

SCROLL EFFECT:

- Section enters with a crimson pulse (lighting flash over the backdrop, 300ms)
- Apex-1 card fades up with a slow Ken Burns drift on the product image (scale 1.0→1.03, 10s)
- Strider-X slides up from below with 150ms stagger
- The bioluminescent sole on Apex-1 animates in a subtle pulse loop (opacity 0.6→1.0, 2s)
- Data metrics animate as counters on entry

HOVER:

- Apex-1: crimson haptic-pulse ring expands from beneath the product image (radial gradient animation)
- Strider-X: modular strap detail SVG animation — straps tighten visually

SKILLS TO USE:

- dpf-movematics — Ken Burns image pan, counter animations
- svg-master — modular strap animations for Strider-X

---

### 5. NEURAL PERIPHERALS — PRODUCT ECOSYSTEM

Full-height, the most atmospheric section. Darker, closer, more intimate — we're at the "nerve endings" of the system. Synapse Ring and Optic Overlay V-1 take center stage. The 3x3 grid is brighter here, pulsing gently like a heartbeat.

- Section header: "03 | NEURAL PERIPHERALS" (JetBrains Mono, cyan `#00F0FF`)
- Synapse Ring card: image `/images/ring-red-accent.png` — extreme close-up of the 3x3 engraved grid on the ring surface, brushed carbon-lattice texture, micro-cyan glow. Hover: switch to `/images/ring-1.png` or `/images/ring-2.png` for different angles. Spec:
  ```
  [HAPTIC INTERFACE]
  HAPTIC: ON | NERVE: L5 | PROXIMAL: ACTIVE
  GRID: 3x3 ETCH | SYNC: ALL | MODE: PRIMARY
  ```
  Caption: "THE NERVE ENDINGS OF THE TACTILITY ECOSYSTEM."
- Optic Overlay V-1 card: image `/images/smart-glasses-1.png` — wraparound frames with cyan AR overlay on lenses, biometric data visible. Hover: switch to `/images/smart-glasses-2.png` for alternate angle. Spec:
  ```
  [AUGMENTED OVERLAY]
  BIO: MONITORING | ENV: SCANNING | DISPLAY: AR
  FRAME: GHOST-SPEC | LENS: ACTIVE
  ```
  Caption: "SEE WHAT YOU FEEL. THE VISUAL COMPANION TO THE HAPTIC INTERFACE."
- **Supplementary products** (add as expandable sub-cards or ecosystem footer):
  - Haptic Gloves: `/images/smart-glooves.png` — translates digital environments into physical pulses
  - Chronos Watch: `/images/smart-watch.png` — biometric monitoring, digital insight overlay

SCROLL EFFECT:

- Entire section fades in from a brief black pause (longer signal cut — 400ms — to create tension)
- Synapse Ring: extreme close-up renders with a micro-vibration ripple effect on the 3x3 grid surface
- Optic Overlay: scan-line effect across the lenses (horizontal lines, 0.5s cycle, like a display initializing)
- The 3x3 grid background pulses more visibly here — this is the "heartbeat" of the site
- Data metrics cascade in: "HAPTIC: ON" types in, then "SYNC: ALL" appears

HOVER:

- Synapse Ring: haptic ripple expands across the 3x3 grid surface (clip-path circle reveal)
- Optic Overlay: scan lines quicken, AR overlay text becomes brighter

RULES:

- The Synapse Ring's close-up is the single most important product visual on the site — it's where the brand identity (3x3 grid) and the product (haptic ring) converge
- The "SYNC: ALL" status is the narrative climax of the product trilogy — all three pillars are now connected

SKILLS TO USE:

- dpf-movematics — scan-line animations, vibration ripple effects
- dpf-layout-master — full-bleed product close-up with overlaid spec readouts

---

### 6. THE GRID (3x3 MATRIX) — SYSTEM MAP

Full-screen, typography + grid-driven. The 3x3 matrix logo is shown large, but this time as a system map. Each cell labeled: T(actile), A(ugment), C(arry) / T(errain), I(nterface), L(ocomotion) / I(ntegrate), T(ransmit), Y(ou).

- "THE TACTILITY MATRIX" heading (JetBrains Mono, amber)
- The 3x3 grid rendered as a system diagram — each cell has a label and a function
- Below: "NINE PRIMARY NEURAL CONTACT POINTS. ONE UNIFIED INTERFACE."
- Secondary text: "THIS IS NOT MERELY A LOGO. IT IS A SYSTEM MAP."

SCROLL EFFECT:

- The 3x3 grid assembles block by block on scroll (stagger, 200ms per block, left-to-right, top-to-bottom)
- Each block lights up cyan as it snaps into place
- Connecting lines draw between blocks after all 9 are placed (SVG path draw, 1.5s total)
- The grid then pulses gently — the entire system is alive

HOVER:

- Each grid block: on hover, reveals its function label (e.g., "TACTILE INTERFACE", "NEURAL SYNC")
- The connecting lines glow brighter on any cell hover

SKILLS TO USE:

- dpf-movematics — SVG path drawing, staggered block assembly
- svg-master — line-draw connections between grid cells

---

### 7. FEEL THE FUTURE — FINAL CTA

Full-screen, the simplest section. Absolute black `#0A0A0A`. A glowing terminal prompt at center. The 3x3 grid fades in faintly behind it.

- "FEEL THE FUTURE" (Blender Pro 700, 96px, all-caps, `#00F0FF` cyan)
- Below, a terminal prompt in JetBrains Mono:
  ```
  > CONNECT? (Y/N)
  ```
- Below the prompt: a pulsing cursor (blinking block, 1s cycle)
- On click/Enter: a simple input field slides open — just an email or signal address. No form, no label, just the field and a cyan cursor.

SCROLL EFFECT:

- This section is the destination — no scroll exit (the journey ends here)
- "FEEL THE FUTURE" fades up, 1.2s, letter-spacing -0.02em → 0.05em over 0.8s
- Terminal prompt types in character by character (50ms per char)
- Cursor blinks
- Background: the 3x3 grid very faintly assembles in the deep background (10% opacity, slow 3s assembly)

HOVER:

- Terminal prompt: on hover, the "Y/N" text shifts to full green for Y, red for N
- Cursor quickens its blink when input is active

RULES:

- No button. No form. No CTA pill. The terminal prompt IS the CTA
- The aesthetic is: you're not submitting a contact form — you're initiating a connection to the Tactility network

SKILLS TO USE:

- dpf-movematics — character-by-character typing, blink animation

---

## ANIMATION SYSTEM

**PHILOSOPHY:** One well-orchestrated moment beats scattered micro-interactions. Every animation on this site serves one purpose: making the visitor feel like they're interacting with a live cybernetic interface. If the motion doesn't feel functional, it doesn't belong.

### GLOBAL BEHAVIOR

- Smooth scrolling (Lenis) with custom acceleration curve
- **Scroll-triggered animations only** — no autoplay heavy features
- Hero section: animates on page load (3x3 grid rotation + terminal text typing)
- First 2 viewport sections: animate on immediate scroll trigger (30% in view)
- Deeper sections: delayed trigger (element 20% in view)
- Section transitions: all use the "signal cut" pattern — brief full-black wipe (200–400ms) between major sections
- Duration range: 200ms (hovers) to 1.5s (grid assembly)
- Easing: Primary curve `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for reveals, `cubic-bezier(0.16, 1, 0.3, 1)` for playful lifts

### EFFECTS TO USE (Priority Order)

1. **Primary: Fade-up with data-resolution effect** — content doesn't just fade in; it appears to "resolve" from a data stream. A brief grid-line pattern flashes over incoming text, then dissolves. Timing: 0.6s.

2. **Secondary: Stagger on product dossier cards** — when a product section enters, the header appears first (0ms), then the render (200ms), then spec readouts (400ms), then caption (600ms). Creates a dossier-loading feel.

3. **Accent: Product-specific hover glows** — each product lights up in its signature accent on hover. Cyan pulse ring for Vanguard, crimson haptic wave for Apex-1, grid ripple for Synapse Ring.

4. **Ambient: Grid pulse** — the 3x3 grid background element pulses very subtly throughout, like a system heartbeat. Opacity cycles between 3% and 7%, 4s cycle.

### SIGNATURE MOTIONS (Unique to Tactility)

- **Text typing effect**: Used on all terminal-style copy (hero init text, CTA prompt). Characters appear one by one at 50ms per char. Feels like data being received.
- **Signal cut transition**: Between every major section, a full-screen black wipe (200ms for product sections, 400ms for emotional transitions like Neural Peripherals). Creates the feeling of channel-hopping through a neural network.
- **Data resolution**: Text and images don't fade in smoothly — they appear through a grid-line overlay that resolves from top-left to bottom-right, like a CRT monitor waking up. Think: the Matrix's "code rain" resolving into readable text.

### PERFORMANCE RULES (Non-Negotiable)

- Max 3 concurrent animated elements at any time
- **Never** animate `width`, `height`, or `top/left` — use `transform` only
- Use `will-change: transform` on parallax elements and the 3x3 grid hero
- Disable all continuous motion on devices with `prefers-reduced-motion`
- Test on mid-range Android to ensure 60fps — the carbon-fibre texture and grid overlay are CSS, not heavy images
- All product images: pre-rendered PNGs from `/public/images/` — convert to WebP, max 200KB each
- Additional images available for supplementary sections: `/images/smart-glooves.png` (Haptic Gloves), `/images/smart-watch.png` (Chronos Watch) — can be added as supplementary Neural Peripheral products or hover-state extras
- The 3x3 matrix logo animation (hero) must be built in code (Three.js or CSS) — no logo image file is provided

### SCROLL BEHAVIOR

- **Lenis smooth scroll** with `lerp: 0.08` (very smooth, but not nauseating)
- **GSAP ScrollTrigger** for section pinning (Hero) and scroll-linked product reveals
- **Intersection Observer** for data-readout counter triggers and stagger entries
- **No scroll hijacking** — scroll speed amplification at 1.0× (natural). The Lenis effect is for smoothness, not for controlling the scroll pace.

### REDUCED MOTION ACCESSIBILITY (Required)

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
  .grid-background {
    opacity: 0.05 !important;
  }
  .hero-3d-cubes {
    transform: none !important;
  }
}
```

- Disable all parallax, continuous rotation, grid pulsing, and ambient motion
- Keep only essential state reveals: fade from hidden to visible, no transitions
- Terminal text: show all at once (no typing effect)
- Signal cuts: keep the black wipe but reduce to 100ms

### SECTION-SPECIFIC RECIPES

**Hero Section:**
1. 3x3 grid blocks: continuous subtle rotation (0.02rad/s Y-axis)
2. Terminal text: character-by-character typing, 50ms per character, 800ms total
3. Brand name "TACTILITY": fade-up + scale 0.95→1, 0.8s, 1.2s delay
4. Subheading "The Biological Interface": fade-up, 0.6s, 500ms after tagline
5. Scroll indicator: gentle bounce loop (translateY 0→10px, 2s ease-in-out)

**Product Dossier Cards:**
1. Section header: slide from left, mono, uppercase, 0.5s
2. Product render: fade-up with data-resolution overlay, 0.7s
3. Spec readouts: counters animate on viewport entry, 1–1.5s
4. Caption: fades up, 0.6s, 200ms after spec complete
5. Card hover: scale 1.02 + accent glow on product image

**3x3 Grid Assembly (Section 6):**
1. Blocks assemble: staggered emergence, 200ms per block, left-to-right top-to-bottom (1.8s total)
2. Connecting lines: SVG path draw, 1.5s after all blocks placed
3. System pulse: blocks fade between idle and active state (opacity 0.6→1.0, 3s cycle)

**Final CTA Section:**
1. Background: 3x3 grid very slowly assembles in deep background (10% opacity, 3s)
2. Heading "FEEL THE FUTURE": fade-up with letter-spacing expand, 1.2s
3. Terminal prompt: character-by-character typing, 0.5s
4. Cursor blink: infinite, 1s cycle, square block `#00F0FF`

### TOOLS & LIBRARIES

- **Framework**: Lenis (smooth scroll) + GSAP (ScrollTrigger, timeline control)
- **Animation**: CSS animations for reveals and hovers, GSAP for hero pinning and scroll-linked assembly
- **3D**: Three.js or CSS 3D transforms for the rotating 3x3 grid hero
- **IntersectionObserver**: Native API for scroll triggers
- **Skills to reference**: dpf-movematics, dpf-layout-master, svg-master

SKILLS TO USE:

- dpf-movematics — Motion design framework and performance optimization
- dpf-layout-master — Ensure animations don't break the 3x3 grid layout
- svg-master — SVG path animations for grid connecting lines and product detail illustrations

---

## LAYOUT RULES

- Max width: 1440px content, with full-bleed hero and section backgrounds
- Grid: 3-column CSS Grid (`repeat(3, 1fr)`) — the 3x3 Tactility grid — used across all sections
- Vertical section spacing: 100vh per full-screen section (all sections should occupy at least the full viewport height)
- Content padding: 80px left/right (generous horizontal space to let the grid breathe), 60px top/bottom
- Product dossier cards: 2:1 split for featured product (Vanguard), 1:1 split for equal products (Apex-1/Strider-X, Ring/Glasses)
- Data readouts: right-aligned on dossier cards, in JetBrains Mono, 12px, uppercase

SKILLS TO USE:

- dpf-layout-master — responsive 3x3 grid implementation

---

## IMAGERY

- **Source**: All product images from `/public/images/` — pre-rendered PNGs at 768–1024px square
- **Image map**:
  - `/images/bag-1.png` — T-9 Vanguard (main)
  - `/images/bag-closeup.png` — T-9 Vanguard detail (hover state)
  - `/images/bag-3.png` — T-9 Ghost
  - `/images/footwear-red-accent.png` — Apex-1 (urban interceptor)
  - `/images/heel-1.png` — Apex-1 sole detail (hover state)
  - `/images/bootwear.png` — Strider-X (tactical boot)
  - `/images/ring-red-accent.png` — Synapse Ring (main)
  - `/images/ring-1.png`, `/images/ring-2.png` — Synapse Ring alternate angles (hover states)
  - `/images/smart-glasses-1.png` — Optic Overlay V-1 (main)
  - `/images/smart-glasses-2.png` — Optic Overlay V-1 alternate (hover state)
  - `/images/smart-glooves.png`, `/images/glooves-1.png` — Haptic Gloves (neural peripheral, supplementary)
  - `/images/smart-watch.png`, `/images/watch-1.png`, `/images/watch-2.png` — Chronos Watch (neural peripheral, supplementary)
  - `/images/footwear.png`, `/images/footwear-1.png`, `/images/footwer-2.png` — Additional footwear angles (supplementary)
- **Style**: Pure product renders on black backgrounds. No environment, no context, no models. The product exists in the void.
- **Lighting**: Directional edge lighting — products are discovered by their glow. Cyan edge light on Vanguard and Synapse Ring. Crimson sole pulse on Apex-1. Red thermal vent on Ghost.
- **Color grading**: Heavy crush shadows. Highlights retain detail. Cyan or crimson light source from below or side — never flat studio lighting.
- **Textures**: Carbon-fibre weave visible on close-ups. Brushed metal on rings. High-gloss reflectivity on Apex-1. Matte micro-texture on Vanguard armor plates.
- **No overlays**: Products are placed directly on black. No gradient overlays, no glassmorphism, no texture overlays.
- **Performance**: Convert all PNGs to WebP at quality 85 for production. Maintain transparency. Max 200KB per image.

---

## COMPONENT STYLE

Buttons (if any — prefer terminal prompts over buttons):

- **Style**: NONE — the site avoids traditional buttons. The primary interaction is the terminal prompt (`> CONNECT? (Y/N)`) which reveals an input field.
- Secondary interactive pattern: text links in JetBrains Mono, uppercase, cyan underline grows on hover (background gradient bottom technique, 0.3s).
- The only "button-like" element is the "Connect" pill in the collapsed nav bar: border `#00F0FF` 1px, background `rgba(0, 240, 255, 0.05)`, hover fills to `rgba(0, 240, 255, 0.15)`, uppercase mono, letter-spacing +0.05em.

Cards (Product Dossier):

- Background: `#1A1A1A` surface
- Border: `#2A2A2A` 1px, top hairline in product accent color (`#00F0FF` for Vanguard, `#FF0044` for Apex-1)
- Shadow: none — products float on black, cards are subtle surface distinctions
- Border radius: 0px (sharp corners — the brand is geometric, not rounded)
- Padding: 24px

SKILLS TO USE:

- dpf-layout-master — sharp-corner card grids with accent top borders

---

## EXPERIENCE PRINCIPLES

- **The site IS the interface** — Every scroll, hover, and transition should feel like interacting with a live cybernetic system, not a marketing page.
- **Products are dossiers, not listings** — Never say "features" or "benefits." Present specs as classified intelligence. The visitor should feel they're reading leaked technical documents.
- **Color is information** — Cyan means data. Crimson means biological. Amber means power. The visitor should learn the color language by the second section.
- **Touch first, always** — Even on a screen, the design must feel tactile. This is a brand about the primacy of touch. Use textures, haptic metaphors in animation (ripples, pulses, vibrations).
- **The grid is omnipresent** — The 3x3 grid is not just the logo. It's the layout, the navigation metaphor, the product integration system, and the visual signature. Every section should reference it visually or structurally.

---

## OUTPUT FORMAT

Generate:

- A cinematic scrollable website
- With signal-cut transitions between sections
- Using the 3x3 grid as structural layout
- Data-terminal aesthetic throughout
- Product dossiers with live-feeling telemetry
- Optimized for desktop-first (but responsive to mobile)
- Built with Lenis + GSAP + CSS animations
