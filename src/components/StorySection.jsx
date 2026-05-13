import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import BlurText from './BlurText';
import { ASSETS } from '../assets';

const EASE = [0.16, 1, 0.3, 1];

const STORY_STATS = [
  { val: '48h',       label: 'עץ לפחית',       sub: 'חלון הרעננות המקסימלי' },
  { val: 'Thailand',  label: 'מקור המוצר',      sub: 'חורשות קוה סמוי' },
  { val: '2021',      label: 'נוסדה',           sub: 'נולדה על החוף' },
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
      <div className="absolute top-0 left-0 right-0 h-px bg-sage/15" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-14">

        <motion.p
          className="font-sans text-xs text-sage uppercase mb-10 md:mb-20"
          initial={{ opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          הסיפור שלנו
        </motion.p>

        {/* Main grid: image left, text right */}
        <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left: large editorial image */}
          <div className="md:col-span-5 relative">
            <motion.div
              className="relative overflow-hidden rounded-2xl md:rounded-3xl"
              style={{ aspectRatio: '3/4' }}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: EASE }}
            >
              <motion.img
                src={ASSETS.beachChair}
                alt="אישה בחוף בשעת הזהב שותה COCO"
                className="w-full h-full object-cover"
                style={{ scale: imgScale, y: imgY }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 mix-blend-multiply opacity-10 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, transparent 40%, #C9B99A 100%)' }}
              />
            </motion.div>

            {/* Floating pull-quote */}
            <motion.div
              className="absolute bottom-6 right-4 left-4 md:right-auto md:-left-8 md:bottom-10 md:max-w-[260px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
            >
              <div className="bg-cream-50/90 backdrop-blur-md rounded-2xl p-5 border border-sage/15 shadow-lg shadow-olive/8">
                <p className="font-serif italic text-olive text-sm leading-relaxed">
                  ״הפסקנו לחפש את מי הקוקוס הנכונים והחלטנו להכין אותם בעצמנו.״
                </p>
                <p className="font-sans text-[10px] uppercase text-sage mt-3">
                  — המייסדים, 2021
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
                text="נולד בין הדקל לחוף."
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
                  זה התחיל בשאלה אחת: למה מי קוקוס תמיד טועמים כמו פשרה?
                  כל מותג שניסינו היה מעובד מדי, ממותק מדי, או פשוט לא נכון.
                  אז הלכנו למקור — לחורשות הקוקוס הצעירות של קוה סמוי, תאילנד,
                  שם האוויר מריח כמו מלח והכל מאט.
                </motion.p>

                <motion.p
                  className="font-sans text-olive/65 leading-[1.85] font-light"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.32, duration: 0.9, ease: EASE }}
                >
                  מצאנו חקלאים שקוצרים קוקוסים צעירים תוך 48 שעות מהקטיף.
                  ללא טיפול בחום. ללא תוספת סוכר. ללא ריכוזים.
                  רק הדבר האמיתי, אטום בקור בשיא הרעננות ונשלח ישירות אליכם.
                </motion.p>

                <motion.p
                  className="font-sans text-olive/65 leading-[1.85] font-light"
                  style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.44, duration: 0.9, ease: EASE }}
                >
                  הבאנו אותו הביתה לים התיכון — למגרשים, לקלאבים,
                  לבריכות ולאנשים שיודעים מה נקי באמת טועם.
                  COCO הוא מה שקורה כשמפסיקים להתפשר.
                </motion.p>
              </div>

              <motion.div
                className="w-12 h-px bg-sage/40 my-10 md:my-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                style={{ originX: 1 }}
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
                    <p className="font-sans text-olive/70 text-xs font-medium mb-0.5">
                      {stat.label}
                    </p>
                    <p className="font-sans text-olive/35 text-[10px]">
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
