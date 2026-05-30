import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {

      // ─── COLORS ───────────────────────────────────────────────────────────
      colors: {
        // Semantic tokens (CSS var-backed, respect dark/light switch)
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent:     'var(--accent)',
        muted:      'var(--muted)',

        // Zeus palette — direct use when needed
        zeus: {
          void:      '#05070f',
          night:     '#080d1a',
          deep:      '#0b1228',
          storm:     '#0f1a3a',
          twilight:  '#1a2550',
          dusk:      '#1e2d5c',
          bolt:      '#f5c842',
          gold:      '#d4a017',
          goldLight: '#f0d060',
          goldPale:  '#fef3c7',
          amber:     '#e8900a',
          marble:    '#e8e4dc',
          marbleMid: '#c8c4bc',
          silver:    '#a0aec0',
          mist:      'rgba(200,210,240,0.12)',
          glass:     'rgba(255,255,255,0.04)',
          glassMid:  'rgba(255,255,255,0.08)',
          glassHigh: 'rgba(255,255,255,0.13)',
        },

        // Status colors — themed to match Olympus
        success: {
          DEFAULT: '#34d399',
          dim:     'rgba(52,211,153,0.1)',
          border:  'rgba(52,211,153,0.2)',
        },
        danger: {
          DEFAULT: '#ef4444',
          dim:     'rgba(239,68,68,0.08)',
          border:  'rgba(239,68,68,0.2)',
        },
        warning: {
          DEFAULT: '#f59e0b',
          dim:     'rgba(245,158,11,0.1)',
          border:  'rgba(245,158,11,0.2)',
        },
      },

      // ─── TYPOGRAPHY ───────────────────────────────────────────────────────
      fontFamily: {
        display: ['Cinzel Decorative', 'Georgia', 'serif'],
        heading:  ['Cinzel', 'Georgia', 'serif'],
        body:     ['Outfit', 'system-ui', 'sans-serif'],
        sans:     ['Outfit', 'system-ui', 'sans-serif'],
      },

      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '1rem' }],
        'xs':  ['0.72rem',  { lineHeight: '1.1rem' }],
        'sm':  ['0.85rem',  { lineHeight: '1.4rem' }],
        'base':['0.9rem',   { lineHeight: '1.5rem' }],
        'lg':  ['1.05rem',  { lineHeight: '1.5rem' }],
        'xl':  ['1.2rem',   { lineHeight: '1.4rem' }],
        '2xl': ['1.4rem',   { lineHeight: '1.3rem' }],
        '3xl': ['1.75rem',  { lineHeight: '1.2rem' }],
        '4xl': ['2.25rem',  { lineHeight: '1.1rem' }],
        '5xl': ['2.8rem',   { lineHeight: '1.05rem' }],
      },

      letterSpacing: {
        tight:   '-0.02em',
        normal:  '0em',
        wide:    '0.04em',
        wider:   '0.08em',
        widest:  '0.15em',
        divine:  '0.2em',
      },

      // ─── SPACING / SIZING ─────────────────────────────────────────────────
      maxWidth: {
        mobile: '430px',
      },

      spacing: {
        safe:  '20px',
        'nav': '80px',   // bottom nav height
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        'sm':   '8px',
        'md':   '14px',
        'lg':   '20px',
        'xl':   '28px',
        '2xl':  '36px',
        'pill': '9999px',
      },

      // ─── BACKGROUND IMAGES / GRADIENTS ───────────────────────────────────
      backgroundImage: {
        'grad-sky':        'linear-gradient(170deg, #05070f 0%, #0b1228 40%, #1a2550 100%)',
        'grad-gold':       'linear-gradient(135deg, #f5c842 0%, #d4a017 50%, #e8900a 100%)',
        'grad-gold-shine': 'linear-gradient(105deg, #fef3c7 0%, #f5c842 30%, #d4a017 70%, #e8900a 100%)',
        'grad-card':       'linear-gradient(145deg, rgba(26,37,80,0.9) 0%, rgba(11,18,40,0.95) 100%)',
        'grad-bolt':       'linear-gradient(180deg, #f5c842 0%, rgba(245,200,66,0) 100%)',
        'grad-hero':       'linear-gradient(145deg, #1e2d5c 0%, #0f1a3a 60%, #080d1a 100%)',
        'noise':           "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E\")",
      },

      // ─── BOX SHADOWS ─────────────────────────────────────────────────────
      boxShadow: {
        'card':        '0 8px 40px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
        'card-hover':  '0 16px 60px rgba(0,0,0,0.7), 0 0 30px rgba(245,200,66,0.12)',
        'gold':        '0 0 20px rgba(245,200,66,0.4), 0 0 60px rgba(245,200,66,0.15)',
        'gold-sm':     '0 0 8px rgba(245,200,66,0.35), 0 0 20px rgba(245,200,66,0.1)',
        'nav':         '0 -8px 40px rgba(0,0,0,0.6)',
        'input-focus': '0 0 0 3px rgba(245,200,66,0.08), 0 0 20px rgba(245,200,66,0.05)',
        'hero':        '0 20px 60px rgba(0,0,0,0.7), inset 0 1px 0 rgba(245,200,66,0.15)',
        'none':        'none',
      },

      // ─── BACKDROP BLUR ────────────────────────────────────────────────────
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },

      // ─── TRANSITIONS ──────────────────────────────────────────────────────
      transitionTimingFunction: {
        'bounce-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'spring':     'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'smooth':     'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        fast: '150ms',
        mid:  '300ms',
        slow: '600ms',
      },

      // ─── ANIMATIONS ───────────────────────────────────────────────────────
      keyframes: {
        ambientPulse: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%':      { opacity: '1',   transform: 'scale(1.15)' },
        },
        floatOrb: {
          '0%':   { transform: 'translate(0,0) scale(1)',    opacity: '0' },
          '10%':  { opacity: '1' },
          '50%':  { transform: 'translate(30px,-60px) scale(1.1)' },
          '90%':  { opacity: '1' },
          '100%': { transform: 'translate(-20px,-120px) scale(0.9)', opacity: '0' },
        },
        sparkFall: {
          '0%':   { opacity: '0',   transform: 'translateY(-10px) scaleY(0.5)' },
          '20%':  { opacity: '0.8', transform: 'translateY(0) scaleY(1)' },
          '80%':  { opacity: '0.6' },
          '100%': { opacity: '0',   transform: 'translateY(80px) scaleY(1.2)' },
        },
        lightningFlicker: {
          '0%, 90%, 100%': { opacity: '0.6' },
          '92%':            { opacity: '1' },
          '94%':            { opacity: '0.3' },
          '96%':            { opacity: '0.9' },
        },
        shimmerSlide: {
          '0%':   { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        skeletonShimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pageSlideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        listItemFade: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        cardPop: {
          from: { opacity: '0', transform: 'scale(0.94) translateY(8px)' },
          to:   { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        counterRoll: {
          from: { opacity: '0', transform: 'translateY(10px) scale(0.92)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slowSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        borderPulse: {
          '0%, 100%': { borderColor: 'rgba(245,200,66,0.18)' },
          '50%':      { borderColor: 'rgba(245,200,66,0.4)',
                        boxShadow:    '0 0 20px rgba(245,200,66,0.12)' },
        },
        boltStrike: {
          '0%':   { opacity: '0', transform: 'scale(0.8)' },
          '30%':  { opacity: '1', transform: 'scale(1.05)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        btnShimmer: {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },

      animation: {
        'ambient-pulse':      'ambientPulse 6s ease-in-out infinite',
        'float-orb':          'floatOrb 18s ease-in-out infinite',
        'spark-fall':         'sparkFall 2.4s ease-in infinite',
        'lightning-flicker':  'lightningFlicker 4s ease-in-out infinite',
        'shimmer-slide':      'shimmerSlide 2.5s ease-in-out infinite',
        'skeleton':           'skeletonShimmer 1.8s ease-in-out infinite',
        'page-enter':         'pageSlideUp 0.35s cubic-bezier(0.4,0,0.2,1) both',
        'list-item':          'listItemFade 0.4s cubic-bezier(0.4,0,0.2,1) both',
        'card-pop':           'cardPop 0.45s cubic-bezier(0.175,0.885,0.32,1.275) both',
        'counter-roll':       'counterRoll 0.8s cubic-bezier(0.34,1.56,0.64,1) both',
        'fade-in':            'fadeIn 0.3s ease both',
        'slow-spin':          'slowSpin 20s linear infinite',
        'border-pulse':       'borderPulse 3s ease-in-out infinite',
        'bolt-strike':        'boltStrike 0.6s cubic-bezier(0.34,1.56,0.64,1) both',
        'btn-shimmer':        'btnShimmer 0.5s ease-out',
      },
    },
  },
  plugins: [],
};

export default config;