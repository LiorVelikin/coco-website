import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

const INGREDIENT_CARDS = [
  { label: 'Coconut water',        sub: 'Pure, unfiltered',       x: '-3%', y: '10%'  },
  { label: 'Natural electrolytes', sub: 'Potassium & magnesium',  x: '60%', y: '5%'   },
  { label: 'No added sugar',       sub: 'Zero sweeteners',        x: '-5%', y: '62%'  },
  { label: 'Ice-cold refreshment', sub: 'Serve at 4°C',           x: '62%', y: '68%'  },
];

// Animated water droplets for visual texture
function WaterDroplets() {
  const drops = [
    { size: 12, top: '18%', left: '55%', delay: 0 },
    { size: 8,  top: '32%', left: '72%', delay: 0.6 },
    { size: 16, top: '60%', left: '58%', delay: 1.2 },
    { size: 6,  top: '75%', left: '68%', delay: 0.3 },
    { size: 10, top: '25%', left: '40%', delay: 0.9 },
    { size: 7,  top: '50%', left: '78%', delay: 1.5 },
  ];

  return (
    <>
      {drops.map((d, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: d.size,
            height: d.size,
            top: d.top,
            left: d.left,
            background: 'radial-gradient(circle at 35% 35%, rgba(255,255,255,0.9), rgba(201,185,154,0.3))',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 1px 2px rgba(255,255,255,0.8)',
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [0.5, 0.9, 0.5],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 3 + i * 0.4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: d.delay,
          }}
        />
      ))}
    </>
  );
}

function IngredientTag({ label, sub, x, y, delay }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      <div className="px-4 py-2.5 rounded-2xl bg-cream-50/90 backdrop-blur-sm border border-sage/20 shadow-md">
        <p className="font-sans text-olive font-medium text-sm leading-none mb-0.5">{label}</p>
        <p className="font-sans text-olive/50 text-xs">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function IngredientsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section
      id="taste"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #EDE3CD 0%, #F5F0E8 50%, #E8E0D0 100%)' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, #7A8C6E 0%, transparent 65%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-15"
        style={{ background: 'radial-gradient(circle, #C9B99A 0%, transparent 65%)', transform: 'translate(-30%, 30%)' }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 md:py-36">

        {/* Section label + headline — tighter, balanced */}
        <div className="mb-16 md:mb-20">
          <motion.p
            className="font-sans text-xs tracking-[0.22em] text-sage uppercase mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            The Ingredient Story
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-16">
            {/* Left: headline — calibrated size */}
            <div className="flex-shrink-0">
              <BlurText
                as="h2"
                text="Cold coconut."
                className="font-serif font-light text-olive leading-[0.92] block"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
                delay={0.08}
                stagger={0.07}
              />
              <BlurText
                as="h2"
                text="Clean finish."
                className="font-serif italic font-light text-olive/65 leading-[0.92] block"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
                delay={0.22}
                stagger={0.07}
              />
              <BlurText
                as="h2"
                text="Zero noise."
                className="font-serif font-light text-olive leading-[0.92] block"
                style={{ fontSize: 'clamp(2.4rem, 5vw, 5.5rem)' }}
                delay={0.36}
                stagger={0.07}
              />
            </div>

            {/* Right: intro sentence — aligned to headline bottom */}
            <motion.p
              className="font-sans text-olive/58 leading-[1.8] font-light max-w-sm mb-1"
              style={{ fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.9, ease: EASE }}
            >
              COCO keeps it simple: real coconut water, a light natural taste,
              and a refreshing finish that fits your day without feeling heavy.
            </motion.p>
          </div>
        </div>

        {/* Two-column: stats + visual composition */}
        <div className="grid md:grid-cols-2 gap-14 md:gap-20 items-center">

          {/* Left: stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: EASE }}
          >
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-sage/20 mb-12">
              {[
                { val: '100%', label: 'Pure coconut', sub: 'Natural & real' },
                { val: '0g',   label: 'Added sugar',  sub: 'Sweetener-free' },
                { val: '355ml',label: 'Can size',      sub: 'Slim & premium' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.7, ease: EASE }}
                >
                  <p className="font-serif font-light text-olive mb-1"
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)' }}>{stat.val}</p>
                  <p className="font-sans text-olive/65 text-xs font-medium tracking-wide uppercase mb-0.5">{stat.label}</p>
                  <p className="font-sans text-olive/35 text-[10px] tracking-wide">{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Ingredient list — clean typography */}
            <div className="space-y-4">
              {[
                { name: 'Coconut water',        note: 'Natural & unfiltered' },
                { name: 'Natural electrolytes', note: 'Potassium, magnesium, sodium' },
                { name: 'No added sugar',       note: 'Zero sweeteners or concentrates' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between py-3.5 border-b border-sage/12"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.7, ease: EASE }}
                >
                  <span className="font-serif text-olive text-base">{item.name}</span>
                  <span className="font-sans text-olive/40 text-[11px] tracking-wide">{item.note}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile: simple centered ice bucket */}
          <div className="md:hidden flex justify-center mb-4">
            <img
              src={ASSETS.iceBucket}
              alt="COCO cans chilled in ice bucket"
              style={{
                maxHeight: '320px',
                filter: 'drop-shadow(0 20px 40px rgba(61,74,53,0.18))',
              }}
            />
          </div>

          {/* Right: visual composition with ice bucket (no-bg) + can detail — desktop only */}
          <div className="hidden md:block relative" style={{ minHeight: '520px' }}>
            {/* Can detail macro — background card */}
            <motion.div
              className="absolute overflow-hidden rounded-2xl shadow-xl shadow-olive/10"
              style={{ width: '55%', aspectRatio: '1/1', top: '5%', right: '0%' }}
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
            >
              <img
                src={ASSETS.canDetail}
                alt="COCO can water droplet detail"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>

            {/* Ice bucket — no background, floats on top */}
            <motion.div
              className="relative z-10"
              style={{ y: bgY }}
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: EASE, delay: 0.1 }}
            >
              <motion.img
                src={ASSETS.iceBucket}
                alt="COCO cans chilled in ice bucket"
                className="w-full"
                style={{
                  maxWidth: '340px',
                  filter: 'drop-shadow(0 30px 50px rgba(61,74,53,0.2))',
                }}
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.div>

            {/* Water droplets */}
            <WaterDroplets />

            {/* Floating ingredient tags */}
            {INGREDIENT_CARDS.map((card, i) => (
              <IngredientTag
                key={i}
                label={card.label}
                sub={card.sub}
                x={card.x}
                y={card.y}
                delay={0.4 + i * 0.12}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
