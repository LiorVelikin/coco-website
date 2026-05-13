import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const EASE = [0.16, 1, 0.3, 1];
const NAV_LINKS = [
  { label: 'טעם',       href: 'taste'      },
  { label: 'הידרציה',  href: 'hydration'  },
  { label: 'סגנון חיים', href: 'lifestyle' },
  { label: 'הזמנה',    href: 'order'      },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-nav shadow-sm' : 'bg-transparent'
      }`}
      initial={{ y: -80, opacity: 0, filter: 'blur(12px)' }}
      animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: EASE, delay: 0.1 }}
    >
      <nav className="max-w-[1440px] mx-auto px-6 md:px-10 h-16 md:h-18 flex items-center justify-between">
        {/* Wordmark */}
        <motion.a
          href="#"
          className="font-serif text-2xl md:text-3xl font-light tracking-[0.15em] text-olive uppercase"
          whileHover={{ letterSpacing: '0.22em' }}
          transition={{ duration: 0.4, ease: EASE }}
          aria-label="COCO בית"
        >
          COCO
        </motion.a>

        {/* Center links — desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}
            >
              <a
                href={`#${link.href}`}
                className="font-sans text-sm font-medium text-olive/70 hover:text-olive tracking-wide transition-colors duration-300 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 right-0 w-0 h-px bg-sage group-hover:w-full transition-all duration-400 ease-premium" />
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Right CTA */}
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.6, ease: EASE }}
        >
          <a
            href="#order"
            className="hidden md:flex items-center px-5 py-2 rounded-full bg-olive text-cream text-sm font-medium font-sans tracking-wide hover:bg-olive-dark transition-colors duration-300"
          >
            נסו COCO
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="פתח תפריט"
          >
            <motion.span
              className="block w-5 h-px bg-olive"
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block w-5 h-px bg-olive"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-olive"
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="glass-nav px-6 pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              className="font-sans text-lg text-olive tracking-wide border-b border-sage/15 pb-3"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#order"
            className="mt-2 text-center px-5 py-3 rounded-full bg-olive text-cream text-sm font-medium"
            onClick={() => setMenuOpen(false)}
          >
            נסו COCO
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
