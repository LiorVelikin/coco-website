import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

const ICONS = {
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 2C6 2 2 8 2 14c0 4 3 7 7 8 0-4 1-8 3-10 2 2 3 6 3 10 4-1 7-4 7-8 0-6-4-12-10-12z" />
    </svg>
  ),
  drop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  can: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="7" y="3" width="10" height="18" rx="5" />
      <path d="M7 8h10M7 16h10" />
    </svg>
  ),
};

export default function BenefitCard({ number, icon, title, body, delay = 0, isActive = false }) {
  return (
    <motion.div
      className={`
        relative p-7 md:p-8 rounded-2xl border transition-all duration-500
        ${isActive
          ? 'bg-olive text-cream border-olive shadow-xl shadow-olive/20'
          : 'bg-cream-50 text-olive border-sage/20 hover:border-sage/40 hover:bg-cream-100'
        }
      `}
      initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      whileHover={!isActive ? { y: -4 } : {}}
    >
      <div className="flex items-start justify-between mb-5">
        <div className={`p-2.5 rounded-xl ${isActive ? 'bg-cream/10' : 'bg-sage/10'} ${isActive ? 'text-cream' : 'text-sage-dark'}`}>
          {ICONS[icon]}
        </div>
        <span className={`font-serif text-5xl font-light leading-none select-none ${isActive ? 'text-cream/20' : 'text-olive/10'}`}>
          {String(number).padStart(2, '0')}
        </span>
      </div>

      <h3 className={`font-serif font-medium mb-3 ${isActive ? 'text-cream' : 'text-olive'}`}
        style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)' }}>
        {title}
      </h3>
      <p className={`font-sans text-sm leading-relaxed font-light ${isActive ? 'text-cream/70' : 'text-olive/60'}`}>
        {body}
      </p>
    </motion.div>
  );
}
