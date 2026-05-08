'use client';
import { useEffect } from 'react';
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion';
import { ASSETS } from '../assets';

// ─────────────────────────────────────────────────────────────────
// CanStage — hero product stage.
//   1. Drop-from-top spring entrance
//   2. Perpetual idle float after landing
//   3. Subtle mouse parallax (desktop only)
//
// Future Three.js can scene replaces this image stage.
// ─────────────────────────────────────────────────────────────────

const SPRING = { stiffness: 55, damping: 22, mass: 0.9 };

export default function CanStage({ mouseX: externalX, mouseY: externalY, onLanded }) {
  const controls = useAnimation();

  const internalX = useMotionValue(0);
  const internalY = useMotionValue(0);
  const mx = externalX ?? internalX;
  const my = externalY ?? internalY;

  const parallaxX = useSpring(useTransform(mx, [-1, 1], [-10, 10]), SPRING);
  const parallaxY = useSpring(useTransform(my, [-1, 1], [-6,   6]), SPRING);

  useEffect(() => {
    let cancelled = false;

    async function dropAndFloat() {
      await controls.start({
        y: 0,
        scale: 1,
        opacity: 1,
        rotate: 0,
        filter: 'blur(0px)',
        transition: {
          type: 'spring',
          stiffness: 55,
          damping: 12,
          mass: 1.1,
          delay: 0.45,
        },
      });

      if (cancelled) return;
      onLanded?.();

      controls.start({
        y: [0, -18, 0],
        rotate: [-1.5, 1.5, -1.5],
        transition: {
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      });
    }

    dropAndFloat();
    return () => { cancelled = true; };
  }, [controls, onLanded]);

  return (
    <motion.div
      className="relative flex items-center justify-center"
      style={{ x: parallaxX, y: parallaxY }}
    >
      {/* Ground shadow */}
      <motion.div
        className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 rounded-full blur-2xl opacity-15 pointer-events-none"
        style={{ width: '160px', height: '24px', background: '#3D4A35' }}
        animate={{ scaleX: [1, 0.85, 1], opacity: [0.15, 0.09, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ambient halo */}
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-22 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #C9B99A 0%, transparent 65%)',
          transform: 'scale(1.4)',
        }}
      />

      {/* Future Three.js can scene replaces this image stage. */}
      <motion.img
        src={ASSETS.heroCan}
        alt="COCO Premium Coconut Water 355ml can"
        className="relative z-10 w-auto object-contain select-none"
        style={{
          maxHeight: '68vh',
          maxWidth: '300px',
          minHeight: '280px',
          filter: 'drop-shadow(0 36px 56px rgba(61,74,53,0.18))',
        }}
        initial={{
          y: '-90vh',
          scale: 0.78,
          opacity: 0,
          rotate: -5,
          filter: 'blur(8px)',
        }}
        animate={controls}
        // No drag — conflicts with mobile scroll
      />
    </motion.div>
  );
}
