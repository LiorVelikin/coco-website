import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

// 6 lifestyle images — two editorial rows
const ROW1 = [
  { src: ASSETS.poolModel,   alt: 'Woman poolside with COCO',           label: 'Poolside reset',          span: 5, aspect: '3/4'  },
  { src: ASSETS.beachChair,  alt: 'Woman at beach club golden hour',    label: 'Golden hour hydration',   span: 4, aspect: '3/4'  },
  { src: ASSETS.tennisWoman, alt: 'Woman on clay court with COCO',      label: 'Court cool',              span: 3, aspect: '3/4'  },
];
const ROW2 = [
  { src: ASSETS.beachModel,   alt: 'Man at beach volleyball with COCO', label: 'Beach club cold',         span: 4, aspect: '4/3'  },
  { src: ASSETS.telAvivBeach, alt: 'Woman at Tel Aviv beach with COCO', label: 'The promenade',           span: 4, aspect: '4/3'  },
  { src: ASSETS.iceBucket,    alt: 'COCO cans in ice bucket',           label: 'Serve over ice',          span: 4, aspect: '4/3'  },
];

function LifestyleCard({ src, alt, label, delay, className = '', style = {} }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl md:rounded-3xl group cursor-pointer ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      whileHover={{ scale: 1.018 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        loading="lazy"
      />
      {/* Gradient always on — subtle at rest, stronger on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-olive/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Label chip */}
      <div className="absolute bottom-4 left-4">
        <motion.span
          className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-cream-50/85 backdrop-blur-sm text-olive text-[11px] font-sans font-medium tracking-wide border border-sage/18 shadow-sm"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.35, duration: 0.7, ease: EASE }}
        >
          {label}
        </motion.span>
      </div>
    </motion.div>
  );
}

export default function LifestyleSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], [36, -36]);

  return (
    <section id="lifestyle" ref={ref} className="py-24 md:py-36 bg-cream overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Section label */}
        <motion.p
          className="font-sans text-xs tracking-[0.22em] text-sage uppercase mb-5"
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          Brand World
        </motion.p>

        {/* Headline with parallax */}
        <motion.div style={{ y: headlineY }} className="mb-14 md:mb-16 max-w-3xl">
          <BlurText
            as="h2"
            text="Made for the moments you want to feel fresh again."
            className="font-serif font-light text-olive leading-[1.05] text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            delay={0.1}
            stagger={0.055}
          />
        </motion.div>

        {/* ── Desktop 2-row editorial grid ── */}
        <div className="hidden md:flex flex-col gap-4">

          {/* Row 1: 5 + 4 + 3 cols (tall) */}
          <div className="grid gap-4" style={{ gridTemplateColumns: '5fr 4fr 3fr', height: '440px' }}>
            {ROW1.map((card, i) => (
              <LifestyleCard
                key={i}
                src={card.src}
                alt={card.alt}
                label={card.label}
                delay={i * 0.08}
                className="h-full"
              />
            ))}
          </div>

          {/* Row 2: 4 + 4 + 4 cols (landscape) */}
          <div className="grid grid-cols-3 gap-4" style={{ height: '300px' }}>
            {ROW2.map((card, i) => (
              <LifestyleCard
                key={i}
                src={card.src}
                alt={card.alt}
                label={card.label}
                delay={i * 0.08}
                className="h-full"
              />
            ))}
          </div>
        </div>

        {/* ── Mobile: vertical stack ── */}
        <div className="md:hidden flex flex-col gap-4">
          {[...ROW1, ...ROW2].map((card, i) => (
            <LifestyleCard
              key={i}
              src={card.src}
              alt={card.alt}
              label={card.label}
              delay={0}
              style={{ aspectRatio: i === 0 ? '4/5' : '4/3' }}
            />
          ))}
        </div>

        {/* Pull quote */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE }}
        >
          <p
            className="font-serif italic font-light text-olive/45 mx-auto"
            style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2.2rem)', maxWidth: '600px' }}
          >
            "Cold, clean, and exactly where summer takes you."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
