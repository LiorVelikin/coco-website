import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import MarqueeStrip from './MarqueeStrip';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

export default function FinalCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const canY = useTransform(scrollYProgress, [0, 1], [80, -20]);
  const canScale = useTransform(scrollYProgress, [0, 0.7], [0.88, 1.02]);

  return (
    <section
      id="order"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: '#2A3422' }}
    >
      {/* Subtle ambient radial — centered, does not affect top edge color */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 45% at 70% 65%, rgba(90,107,82,0.18) 0%, transparent 55%)',
        }}
      />

      {/* Thin dividing line between community content and CTA header */}
      <div className="w-full h-px" style={{ background: 'rgba(201,185,154,0.08)' }} />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 pt-14 md:pt-32 pb-0">

        {/* Top label */}
        <motion.p
          className="font-sans text-xs tracking-[0.22em] text-cream/40 uppercase mb-8 text-center"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          The clean daily coconut water
        </motion.p>

        {/* Giant headline */}
        <div className="text-center mb-6">
          <BlurText
            as="h2"
            text="Open."
            className="font-serif font-light text-cream leading-[0.88] block"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)' }}
            delay={0.05}
            stagger={0.1}
          />
          <BlurText
            as="h2"
            text="Sip."
            className="font-serif italic font-light leading-[0.88] block"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)', color: 'rgba(201,185,154,0.6)' }}
            delay={0.2}
            stagger={0.1}
          />
          <BlurText
            as="h2"
            text="Reset."
            className="font-serif font-light text-cream leading-[0.88] block"
            style={{ fontSize: 'clamp(3.5rem, 15vw, 14rem)' }}
            delay={0.35}
            stagger={0.1}
          />
        </div>

        {/* Can image — floating in front */}
        <motion.div
          className="flex justify-center relative z-10 -mb-12 md:-mb-24"
          style={{ y: canY, scale: canScale }}
        >
          <motion.img
            src={ASSETS.heroCan}
            alt="COCO premium coconut water can"
            className="drop-shadow-[0_40px_80px_rgba(0,0,0,0.35)]"
            style={{ maxHeight: '45vh', maxWidth: '200px' }}
            animate={{ y: [0, -16, 0], rotate: [-1, 1, -1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Subheading + CTA — behind the can visually but accessible */}
        <motion.div
          className="text-center mt-0 pt-16 md:pt-28 pb-20 relative z-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
        >
          <p
            className="font-sans text-cream/50 font-light leading-relaxed mb-10 mx-auto"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', maxWidth: '520px' }}
          >
            COCO is your clean daily coconut water — from the beach to the court
            to wherever summer takes you.
          </p>

          <motion.a
            href="#"
            className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-9 py-4 rounded-full bg-cream text-olive font-sans font-medium text-sm tracking-wide hover:bg-cream-50 transition-colors duration-300 shadow-xl shadow-black/30"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            Get COCO Today
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.a>

          <motion.p
            className="mt-7 font-serif italic text-cream/30 text-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Best served cold.
          </motion.p>
        </motion.div>
      </div>

      {/* Marquee strip at the very bottom */}
      <div className="mt-4">
        <MarqueeStrip inverted />
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-cream/10">
        <p className="font-serif text-xl tracking-[0.14em] text-cream/30 uppercase">COCO</p>
        <p className="font-sans text-xs text-cream/25 tracking-wide">
          © 2025 COCO Premium Coconut Water. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Instagram', 'TikTok', 'Contact'].map((l) => (
            <a key={l} href="#" className="font-sans text-xs text-cream/30 hover:text-cream/60 transition-colors duration-300 tracking-wide">
              {l}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
