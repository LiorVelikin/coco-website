import { useRef, useCallback, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import CanStage from './CanStage';
import FloatingChip from './FloatingChip';
import BlurText from './BlurText';

const EASE = [0.16, 1, 0.3, 1];

const LEFT_CHIPS  = [
  { label: 'No Added Sugar',       sub: 'Zero sweeteners',       delay: 0.0 },
  { label: 'Natural Electrolytes', sub: 'Potassium & magnesium', delay: 0.15 },
  { label: 'Serve Ice Cold',       sub: 'Best at 4°C',           delay: 0.30 },
];
const RIGHT_CHIPS = [
  { label: '355ml',          sub: 'Slim premium can',  delay: 0.08 },
  { label: '100% Coconut',   sub: 'Real & unfiltered', delay: 0.22 },
];

export default function HeroSection() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [chipsVisible, setChipsVisible] = useState(false);
  const [ctaVisible,   setCtaVisible]   = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    mouseY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  }, [mouseX, mouseY]);

  const handleLanded = useCallback(() => {
    setChipsVisible(true);
    setTimeout(() => setCtaVisible(true), 280);
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col items-center overflow-hidden bg-cream-100"
      style={{ minHeight: '100dvh', paddingTop: '4.5rem', paddingBottom: '3rem' }}
    >
      {/* Ambient radial gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 75% 55% at 50% 36%, rgba(201,185,154,0.22) 0%, transparent 70%),' +
            'radial-gradient(ellipse 38% 32% at 12% 78%, rgba(122,140,110,0.10) 0%, transparent 60%)',
        }}
      />

      {/* Oversized background wordmark */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: EASE, delay: 0.05 }}
      >
        <span
          className="font-serif font-light leading-none whitespace-nowrap"
          style={{ fontSize: 'clamp(11rem, 30vw, 28rem)', letterSpacing: '0.04em', color: 'rgba(61,74,53,0.042)' }}
        >
          COCO
        </span>
      </motion.div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-14 flex flex-col items-center flex-1">

        {/* Badge */}
        <motion.div
          className="mt-6 md:mt-8 mb-7 md:mb-9"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.12 }}
        >
          <span className="inline-flex items-center gap-2.5 px-5 py-1.5 rounded-full border border-sage/22 text-sage-dark text-[11px] font-sans font-medium tracking-[0.16em] uppercase">
            <span className="w-1 h-1 rounded-full bg-sage inline-block" />
            100% coconut water · no added sugar
          </span>
        </motion.div>

        {/* Headline */}
        <div className="text-center mb-5 md:mb-7">
          <BlurText
            as="h1"
            text="Pure Coconut Water."
            className="font-serif font-light text-olive block"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)', lineHeight: 0.92, letterSpacing: '-0.01em' }}
            delay={0.18}
            stagger={0.08}
          />
          <BlurText
            as="h1"
            text="Built for Summer."
            className="font-serif italic font-light block"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 8rem)', lineHeight: 0.92, letterSpacing: '-0.01em', color: 'rgba(61,74,53,0.52)' }}
            delay={0.40}
            stagger={0.08}
          />
        </div>

        {/* ── 3-column infographic layout: chips | can | chips ── */}
        {/* Desktop: 3-col grid so chips are always flush against the can */}
        <div
          className="w-full hidden md:grid"
          style={{ gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', minHeight: '420px', gap: '0' }}
        >
          {/* Left chips — right-aligned, line points toward can */}
          <div className="flex flex-col items-end gap-7 pr-4">
            {chipsVisible
              ? LEFT_CHIPS.map((c, i) => (
                  <FloatingChip key={i} label={c.label} sub={c.sub} align="left" delay={c.delay} />
                ))
              : LEFT_CHIPS.map((_, i) => <div key={i} style={{ height: '48px' }} />)
            }
          </div>

          {/* Center: can */}
          <CanStage mouseX={mouseX} mouseY={mouseY} onLanded={handleLanded} />

          {/* Right chips — left-aligned, line points toward can */}
          <div className="flex flex-col items-start gap-8 pl-4" style={{ paddingTop: '1rem' }}>
            {chipsVisible
              ? RIGHT_CHIPS.map((c, i) => (
                  <FloatingChip key={i} label={c.label} sub={c.sub} align="right" delay={c.delay} />
                ))
              : RIGHT_CHIPS.map((_, i) => <div key={i} style={{ height: '48px' }} />)
            }
          </div>
        </div>

        {/* Mobile: can only, no chips */}
        <div className="md:hidden flex justify-center w-full" style={{ minHeight: '300px' }}>
          <CanStage mouseX={mouseX} mouseY={mouseY} onLanded={handleLanded} />
        </div>

        {/* Subheading + CTAs */}
        <motion.div
          className="text-center mt-6 md:mt-8 max-w-[480px] mx-auto pb-2"
          initial={{ opacity: 0, y: 24 }}
          animate={ctaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p className="font-sans text-olive/52 leading-[1.8] font-light mb-8"
            style={{ fontSize: 'clamp(0.92rem, 1.2vw, 1.05rem)' }}>
            Cold, clean, naturally hydrating coconut water made for beach days,
            workouts, poolside resets, and everyday energy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#order"
              className="w-full sm:w-auto text-center px-9 py-4 rounded-full bg-olive text-cream-50 font-sans font-medium text-sm tracking-wide shadow-lg shadow-olive/20 hover:bg-olive-dark transition-colors duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              Shop COCO
            </motion.a>
            <motion.a
              href="#lifestyle"
              className="w-full sm:w-auto text-center px-9 py-4 rounded-full border border-olive/20 text-olive font-sans font-medium text-sm tracking-wide hover:border-olive/40 hover:bg-cream-200 transition-all duration-300"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              See the vibe
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — pinned to bottom of section */}
      <motion.div
        className="flex flex-col items-center gap-2.5 pb-2"
        initial={{ opacity: 0 }}
        animate={ctaVisible ? { opacity: 0.32 } : { opacity: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <span className="font-sans text-[9px] tracking-[0.22em] text-olive uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-olive/40 origin-top"
          animate={{ scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
