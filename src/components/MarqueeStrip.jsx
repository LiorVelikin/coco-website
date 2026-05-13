import { motion } from 'framer-motion';

const ITEMS = [
  '100% מי קוקוס',
  'ללא סוכר מוסף',
  'אלקטרוליטים טבעיים',
  'הגישו קפוא',
  'פחית פרמיום 355 מ״ל',
  'מאושר לביץ׳ קלאב',
  'הידרציה לאחר משחק',
  'שתייה יומיומית נקייה',
];

const DOUBLED = [...ITEMS, ...ITEMS];

export default function MarqueeStrip({ inverted = false }) {
  return (
    <div
      className={`w-full overflow-hidden border-y py-3.5 ${
        inverted
          ? 'border-cream/20 bg-olive'
          : 'border-sage/20 bg-cream-50'
      }`}
      dir="ltr"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
      >
        {DOUBLED.map((item, i) => (
          <span
            key={i}
            className={`inline-flex items-center gap-0 font-sans text-xs tracking-[0.12em] uppercase shrink-0 ${
              inverted ? 'text-cream/60' : 'text-olive/50'
            }`}
          >
            {item}
            <span
              className={`mx-6 inline-block w-1 h-1 rounded-full ${
                inverted ? 'bg-cream/30' : 'bg-sage/40'
              }`}
            />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
