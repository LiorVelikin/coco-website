import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

// ─────────────────────────────────────────────────────────────────
// FloatingChip — product infographic annotation.
// Used in a 3-column grid layout (not absolute-positioned anymore).
// align="left"  → card on left, connecting line extends RIGHT → dot (toward can)
// align="right" → dot ← line extends LEFT, card on right     (toward can)
// ─────────────────────────────────────────────────────────────────

export default function FloatingChip({ label, sub, delay = 0, align = 'left' }) {
  const isLeft = align === 'left';

  return (
    <motion.div
      className="pointer-events-none select-none"
      initial={{ opacity: 0, x: isLeft ? -16 : 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ delay, duration: 1.0, ease: EASE }}
    >
      <motion.div
        className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        animate={{ y: [0, -5, 0] }}
        transition={{
          duration: 5.5 + delay * 0.6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay * 0.5,
        }}
      >
        {/* Card */}
        <div
          className={`
            bg-cream-50/92 backdrop-blur-sm
            border border-sage/20
            border-t-2 border-t-sage
            px-3.5 py-2.5
            shadow-sm shadow-olive/6
            text-right
          `}
          style={{ borderTopColor: '#7A8C6E', minWidth: '120px' }}
        >
          <p className="font-serif text-olive text-sm leading-tight mb-0.5">{label}</p>
          {sub && (
            <p className="font-sans text-[9px] uppercase text-sage">{sub}</p>
          )}
        </div>

        {/* Connecting line */}
        <motion.div
          className="h-px bg-sage/35 flex-shrink-0"
          style={{ width: '36px' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: delay + 0.3, duration: 0.5, ease: EASE, originX: isLeft ? 0 : 1 }}
        />

        {/* Terminal dot — the end closest to the can */}
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: '#7A8C6E', opacity: 0.55 }}
        />
      </motion.div>
    </motion.div>
  );
}
