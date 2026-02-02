/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0F5C9E',
          50: '#E8F2FA',
          100: '#D1E5F5',
          200: '#A3CBEB',
          300: '#75B1E1',
          400: '#4797D7',
          500: '#0F5C9E',
          600: '#0D4E85',
          700: '#0A3D6B',
          800: '#072B51',
          900: '#041A38',
        },
        accent: {
          DEFAULT: '#00D4AA',
          50: '#E6FBF7',
          100: '#CCF7EF',
          200: '#99EFDF',
          300: '#66E7CF',
          400: '#33DFBF',
          500: '#00D4AA',
          600: '#00AA88',
          700: '#008066',
          800: '#005544',
          900: '#002B22',
        },
        brand: {
          green: '#8DC63F',
          blue: '#0F5C9E',
        },
        luxury: {
          DEFAULT: '#6B7A8F',
          50: '#F4F5F7',
          100: '#E8EAEF',
          200: '#D1D6DF',
          300: '#B5BDCC',
          400: '#909CB0',
          500: '#6B7A8F',
          600: '#566277',
          700: '#434D5E',
          800: '#2F3643',
          900: '#1C2028',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
