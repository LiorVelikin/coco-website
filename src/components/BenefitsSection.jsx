import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import BenefitCard from './BenefitCard';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

const BENEFITS = [
  {
    number: 1,
    icon: 'leaf',
    title: '100% מי קוקוס',
    body: 'קל, נקי ומרענן בטבעיות. בלי שום דבר מיותר.',
  },
  {
    number: 2,
    icon: 'drop',
    title: 'ללא תוספת סוכר',
    body: 'הטעם הטרופי הנקי שמתאים לכל יום, בלי פשרות.',
  },
  {
    number: 3,
    icon: 'bolt',
    title: 'אלקטרוליטים טבעיים',
    body: 'הבחירה הטבעית אחרי אימון, טניס, ים וכל יום ארוך.',
  },
  {
    number: 4,
    icon: 'can',
    title: 'פחית פרמיום 355 מ״ל',
    body: 'דקה, קרה, נוחה לנשיאה. נראית טוב בכל מקום.',
  },
];

export default function BenefitsSection() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [activeCard, setActiveCard] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const canRotate = useTransform(scrollYProgress, [0, 1], ['-4deg', '4deg']);
  const canScale  = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.04, 0.98]);

  return (
    <section
      id="hydration"
      ref={sectionRef}
      className="relative bg-cream-200 py-16 md:py-0 md:min-h-screen"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Headline */}
        <div className="pt-16 md:pt-32 pb-12 md:pb-20">
          <motion.p
            className="font-sans text-xs text-sage uppercase mb-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            למה COCO
          </motion.p>
          <BlurText
            as="h2"
            text="שתייה שבאמת מרגישה נקייה."
            className="font-serif font-light text-olive leading-[1.05] max-w-2xl"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5rem)' }}
            delay={0.1}
            stagger={0.07}
          />
        </div>

        {/* Two-column: sticky can + scrolling cards */}
        <div className="md:grid md:grid-cols-2 md:gap-16 lg:gap-24 pb-16 md:pb-28">

          {/* Left: sticky can */}
          <div className="hidden md:flex items-start justify-center">
            <div
              ref={stickyRef}
              className="sticky top-24 flex flex-col items-center justify-center"
              style={{ height: 'calc(100vh - 12rem)' }}
            >
              <div
                className="absolute rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{
                  width: '340px',
                  height: '340px',
                  background: 'radial-gradient(circle, #C9B99A 0%, transparent 70%)',
                }}
              />

              <motion.img
                src={ASSETS.canElements}
                alt="פחית COCO עם אלמנטים טבעיים"
                className="relative z-10"
                style={{
                  maxHeight: '70vh',
                  maxWidth: '360px',
                  rotate: canRotate,
                  scale: canScale,
                  filter: 'drop-shadow(0 30px 60px rgba(61,74,53,0.14))',
                }}
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />

              <motion.p
                className="mt-6 font-sans text-xs text-sage uppercase opacity-60"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                COCO · 355 מ״ל · פרמיום
              </motion.p>
            </div>
          </div>

          {/* Right: benefit cards */}
          <div className="flex flex-col gap-5">
            {/* Mobile product image */}
            <div className="md:hidden flex justify-center mb-8">
              <img
                src={ASSETS.canElements}
                alt="פחית COCO עם אלמנטים טבעיים"
                style={{ maxHeight: '280px', filter: 'drop-shadow(0 20px 40px rgba(61,74,53,0.14))' }}
              />
            </div>

            {BENEFITS.map((b, i) => (
              <div
                key={i}
                onMouseEnter={() => setActiveCard(i)}
                onFocus={() => setActiveCard(i)}
              >
                <BenefitCard
                  number={b.number}
                  icon={b.icon}
                  title={b.title}
                  body={b.body}
                  delay={i * 0.1}
                  isActive={activeCard === i}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
