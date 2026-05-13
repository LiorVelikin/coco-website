import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

const ROW1 = [
  { src: ASSETS.poolModel,   alt: 'אישה ליד הבריכה עם COCO',        label: 'איפוס בבריכה',        span: 5, aspect: '3/4' },
  { src: ASSETS.beachChair,  alt: 'אישה בביץ׳ קלאב בשקיעה',         label: 'הידרציה בשקיעה',      span: 4, aspect: '3/4' },
  { src: ASSETS.tennisWoman, alt: 'אישה במגרש חימר עם COCO',         label: 'רענן במגרש',          span: 3, aspect: '3/4' },
];
const ROW2 = [
  { src: ASSETS.beachModel,   alt: 'גבר בחוף עם COCO',              label: 'קר בביץ׳ קלאב',       span: 4, aspect: '4/3' },
  { src: ASSETS.telAvivBeach, alt: 'אישה בטיילת תל אביב עם COCO',   label: 'הטיילת',              span: 4, aspect: '4/3' },
  { src: ASSETS.iceBucket,    alt: 'פחיות COCO בדלי קרח',            label: 'הגישו על קרח',        span: 4, aspect: '4/3' },
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
      <div className="absolute inset-0 bg-gradient-to-t from-olive/40 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute bottom-4 right-4">
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

        <motion.p
          className="font-sans text-xs tracking-[0.22em] text-sage uppercase mb-5"
          initial={{ opacity: 0, x: 18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          עולם המותג
        </motion.p>

        <motion.div style={{ y: headlineY }} className="mb-14 md:mb-16 max-w-3xl">
          <BlurText
            as="h2"
            text="נולד לרגעים שבהם תרצו להרגיש רענן שוב."
            className="font-serif font-light text-olive leading-[1.15] text-balance"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            delay={0.1}
            stagger={0.055}
          />
        </motion.div>

        {/* Desktop 2-row editorial grid */}
        <div className="hidden md:flex flex-col gap-4">
          <div className="grid gap-4" style={{ gridTemplateColumns: '5fr 4fr 3fr', height: '440px' }}>
            {ROW1.map((card, i) => (
              <LifestyleCard key={i} src={card.src} alt={card.alt} label={card.label} delay={i * 0.08} className="h-full" />
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4" style={{ height: '300px' }}>
            {ROW2.map((card, i) => (
              <LifestyleCard key={i} src={card.src} alt={card.alt} label={card.label} delay={i * 0.08} className="h-full" />
            ))}
          </div>
        </div>

        {/* Mobile: vertical stack */}
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
            ״קר, נקי, ובדיוק איפה שהקיץ לוקח אותך.״
          </p>
        </motion.div>
      </div>
    </section>
  );
}
