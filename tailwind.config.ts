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
      colors: {
        teal: {
          50: '#f0f9f7',
          100: '#d9f0ea',
          200: '#b4e0d4',
          300: '#83c8b7',
          400: '#52aa97',
          500: '#358f7d',
          600: '#277264',
          700: '#215c52',
          800: '#1d4a43',
          900: '#0F6E56', // Brand accent
          950: '#0d3229',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      maxWidth: {
        'mobile': '430px',
      }
    },
  },
  plugins: [],
};
export default config;
