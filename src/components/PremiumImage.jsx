import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function PremiumImage({
  src,
  alt = '',
  className = '',
  radius = 'rounded-3xl',
  float = false,
  floatDelay = 0,
  shadow = true,
  style = {},
}) {
  return (
    <motion.div
      className={`overflow-hidden ${radius} ${shadow ? 'shadow-2xl' : ''} ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, ease: EASE }}
      whileHover={{ scale: 1.025 }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover img-premium"
        loading="lazy"
        animate={
          float
            ? {
                y: [0, -14, 0],
                rotate: [-1, 1, -1],
              }
            : {}
        }
        transition={
          float
            ? {
                duration: 7 + floatDelay,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: floatDelay,
              }
            : {}
        }
      />
    </motion.div>
  );
}
