import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

const STORY_STATS = [
  { val: '48h',           label: 'Tree to can',        sub: 'Maximum freshness window' },
  { val: 'Thailand',      label: 'Source of origin',    sub: 'Koh Samui groves' },
  { val: '2021',          label: 'Founded',             sub: 'Born on the coast' },
];

export default function StorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgScale  = useTransform(scrollYProgress, [0, 1], [1.08, 1.0]);
  const imgY      = useTransform(scrollYProgress, [0, 1], ['4%', '-4%']);
  const textY     = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="story"
      ref={ref}
      className="relative overflow-hidden bg-cream-50 py-16 md:py-44"
    >
      {/* Subtle top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-sage/15" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        {/* Section label */}
        <motion.p
          className="font-sans text-xs tracking-[0.22em] text-sage uppercase mb-10 md:mb-20"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Our Story
        </motion.p>

        {/* Main grid: image left, text right */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left: large editorial image with subtle parallax */}
          <div className="md:col-span-5 relative">
            <motion.div
              className="relative overflow-hidden rounded-2xl md:rounded-3xl"
              style={{ aspectRatio: '3/4' }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <motion.img
                src={ASSETS.beachChair}
                alt="Woman at golden hour beach club drinking COCO"
                className="w-full h-full object-cover"
                style={{ scale: imgScale, y: imgY }}
                loading="lazy"
              />
              {/* Warm golden overlay — ties the image to the brand palette */}
              <div
                className="absolute inset-0 mix-blend-multiply opacity-10 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 40%, #C9B99A 100%)' }}
              />
            </motion.div>

            {/* Floating pull-quote over image */}
            <motion.div
              className="absolute bottom-6 left-4 right-4 md:left-auto md:-right-8 md:bottom-10 md:max-w-[260px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            >
              <div className="bg-cream-50/90 backdrop-blur-md rounded-2xl p-5 border border-sage/15 shadow-lg shadow-olive/8">
                <p className="font-serif italic text-olive text-sm leading-relaxed">
                  "We stopped looking for the right coconut water and decided to make it ourselves."
                </p>
                <p className="font-sans text-[10px] tracking-[0.14em] uppercase text-sage mt-3">
                  — The Founders, 2021
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right: story text */}
          <motion.div
            className="md:col-span-7 md:pt-6"
            style={{ y: textY }}
          >
            <div className="max-w-xl">
              <BlurText
                as="h2"
                text="Born where the palm meets the coast."
                className="font-serif font-light text-olive leading-[1.05] mb-10 md:mb-12"
                style={{ fontSize: 'clamp(2rem, 4vw, 4.2rem)' }}
                delay={0.1}
                stagger={0.055}
              />

              <div className="space-y-7">
                <motion.p
                  className="font-sans text-olive/65 leading-[1.85] font-light"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
                >
                  It started with one question: why does coconut water always taste like compromise?
                  Every brand we tried was over-processed, over-sweetened, or just wrong.
                  So we went to the source — to the young coconut groves of Koh Samui, Thailand,
                  where the air smells like salt and everything slows down.
                </motion.p>

                <motion.p
                  className="font-sans text-olive/65 leading-[1.85] font-light"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.32, duration: 0.9, ease: EASE }}
                >
                  We found farmers who harvest young coconuts within 48 hours of picking.
                  No heat treatment. No added sugar. No concentrates. Just the real thing,
                  sealed cold at peak freshness and shipped straight to you.
                </motion.p>

                <motion.p
                  className="font-sans text-olive/65 leading-[1.85] font-light"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.44, duration: 0.9, ease: EASE }}
                >
                  We brought it home to the Mediterranean — to the courts, the clubs,
                  the pools, and the people who know what clean actually tastes like.
                  COCO is what happens when you stop compromising.
                </motion.p>
              </div>

              {/* Divider */}
              <motion.div
                className="w-12 h-px bg-sage/40 my-10 md:my-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ originX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 md:gap-10">
                {STORY_STATS.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: EASE }}
                  >
                    <p className="font-serif font-light text-olive mb-1"
                      style={{ fontSize: 'clamp(1.3rem, 2.5vw, 2rem)' }}>
                      {stat.val}
                    </p>
                    <p className="font-sans text-olive/70 text-xs font-medium tracking-wide mb-0.5">
                      {stat.label}
                    </p>
                    <p className="font-sans text-olive/35 text-[10px] tracking-wide">
                      {stat.sub}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
