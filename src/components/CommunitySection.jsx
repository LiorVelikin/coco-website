import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

function CommunityCard({ src, alt, label, delay, className = '', style = {} }) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl group cursor-pointer ${className}`}
      style={style}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1.1, ease: EASE, delay }}
      whileHover={{ scale: 1.015 }}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        loading="lazy"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-olive-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400"
        style={{ transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)' }}
      >
        <p className="font-serif italic text-cream text-sm leading-snug">{label}</p>
      </motion.div>

      <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-cream/60" />
    </motion.div>
  );
}

export default function CommunitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const headY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section
      id="community"
      ref={ref}
      className="relative pt-28 md:pt-40 pb-12 md:pb-16 overflow-hidden"
      style={{ background: '#2A3422' }}
    >
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #7A8C6E 0%, transparent 65%)',
          transform: 'translate(35%, -35%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.05]"
        style={{
          background: 'radial-gradient(circle, #C9B99A 0%, transparent 65%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        {/* Header row */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.div style={{ y: headY }}>
            <motion.p
              className="font-sans text-xs tracking-[0.22em] text-sage uppercase mb-5"
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              אנשי COCO
            </motion.p>
            <BlurText
              as="h2"
              text="לאן שהקיץ הולך,"
              className="font-serif font-light text-cream leading-[1.0] block"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
              delay={0.1}
              stagger={0.06}
            />
            <BlurText
              as="h2"
              text="COCO שם."
              className="font-serif italic font-light leading-[1.0] block"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)', color: 'rgba(201,185,154,0.6)' }}
              delay={0.28}
              stagger={0.07}
            />
          </motion.div>

          <motion.p
            className="font-sans text-cream/40 font-light leading-relaxed max-w-xs md:text-right"
            style={{ fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.9, ease: EASE }}
          >
            מהמגרש לבריכה לאולפן —
            האנשים שבוחרים COCO בוחרים בו כל יום.
            רגעים אמיתיים. הידרציה אמיתית.
          </motion.p>
        </div>

        {/* Desktop editorial grid */}
        <div className="hidden md:grid grid-cols-12 gap-4 md:gap-5" style={{ minHeight: '700px' }}>
          <div className="col-span-7 row-span-2">
            <CommunityCard src={ASSETS.tennisWoman} alt="אישה במגרש חימר עם COCO" label="מגרש חימר. 38°C. ועדיין מרוענן." delay={0} className="h-full" />
          </div>
          <div className="col-span-5">
            <CommunityCard src={ASSETS.poolVilla} alt="אישה ליד בריכת וילה עם COCO" label="ליד הבריכה, איפשהו חם." delay={0.1} className="h-full" style={{ aspectRatio: '4/3' }} />
          </div>
          <div className="col-span-5 grid grid-cols-2 gap-4 md:gap-5">
            <CommunityCard src={ASSETS.padelMan} alt="גבר אחרי משחק פאדל עם COCO" label="אחרי המשחק. תמיד." delay={0.2} className="h-full" style={{ aspectRatio: '3/4' }} />
            <CommunityCard src={ASSETS.telAvivBeach} alt="אישה בטיילת תל אביב עם COCO" label="הטיילת. תל אביב." delay={0.3} className="h-full" style={{ aspectRatio: '3/4' }} />
          </div>
        </div>

        {/* Wide bottom image */}
        <div className="mt-4 md:mt-5">
          <CommunityCard src={ASSETS.pilatesWoman} alt="אישה בפילאטיס עם COCO" label="לפני. במהלך. אחרי." delay={0.15} style={{ aspectRatio: '21/9', display: 'block' }} className="w-full hidden md:block" />
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col gap-4">
          {[
            { src: ASSETS.tennisWoman,  alt: 'טניס',    label: 'מגרש חימר. 38°C. ועדיין מרוענן.', ratio: '4/5' },
            { src: ASSETS.poolVilla,    alt: 'בריכה',   label: 'ליד הבריכה, איפשהו חם.',          ratio: '4/3' },
            { src: ASSETS.padelMan,     alt: 'פאדל',    label: 'אחרי המשחק. תמיד.',               ratio: '4/3' },
            { src: ASSETS.telAvivBeach, alt: 'חוף',     label: 'הטיילת. תל אביב.',                ratio: '4/3' },
            { src: ASSETS.pilatesWoman, alt: 'פילאטיס', label: 'לפני. במהלך. אחרי.',              ratio: '4/3' },
          ].map((img, i) => (
            <CommunityCard key={i} src={img.src} alt={img.alt} label={img.label} delay={0} style={{ aspectRatio: img.ratio }} />
          ))}
        </div>

        {/* Slim tag row */}
        <motion.div
          className="mt-10 flex items-center justify-between gap-4 pt-8 border-t border-cream/8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
        >
          <p className="font-sans text-cream/30 text-xs tracking-[0.16em] uppercase">
            שתפו את הרגע שלכם · #cocowater · @drinkcoco
          </p>
          <a href="#order" className="font-sans text-cream/40 text-xs tracking-wide hover:text-cream/70 transition-colors duration-300">
            ← קנו עכשיו
          </a>
        </motion.div>
      </div>
    </section>
  );
}
