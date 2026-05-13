/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFAF5',
          100: '#FAF6EE',
          200: '#F5EFE0',
          300: '#EDE3CD',
          DEFAULT: '#F2EDE3',
        },
        sand: '#C9B99A',
        sage: {
          light: '#A8B99A',
          DEFAULT: '#7A8C6E',
          dark: '#5A6B52',
        },
        olive: {
          DEFAULT: '#3D4A35',
          dark: '#2A3422',
        },
        warm: '#1C1C1A',
      },
      fontFamily: {
        serif: ['"Frank Ruhl Libre"', 'Georgia', 'serif'],
        sans: ['"Heebo"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        editorial: '0.08em',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-1.5deg)' },
          '50%': { transform: 'translateY(-18px) rotate(1.5deg)' },
        },
        droplet: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translateY(-10px) scale(1.15)', opacity: '0.9' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite 1.5s',
        'float-chip': 'float 5s ease-in-out infinite',
        droplet: 'droplet 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
