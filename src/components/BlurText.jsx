import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

export default function BlurText({
  text = '',
  className = '',
  style = {},
  delay = 0,
  stagger = 0.07,
  as: Tag = 'span',
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', marginInlineEnd: '0.28em' }}
          initial={{ opacity: 0, filter: 'blur(12px)', y: 30 }}
          animate={
            inView
              ? { opacity: 1, filter: 'blur(0px)', y: 0 }
              : { opacity: 0, filter: 'blur(12px)', y: 30 }
          }
          transition={{
            duration: 0.9,
            ease: EASE,
            delay: delay + i * stagger,
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}
