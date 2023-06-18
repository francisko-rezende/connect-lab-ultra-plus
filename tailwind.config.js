/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#3472C8',
          50: '#C4D6F0',
          100: '#B4CBEB',
          200: '#93B5E3',
          300: '#739EDB',
          400: '#5388D2',
          500: '#3472C8',
          600: '#28599B',
          700: '#1D3F6F',
          800: '#112642',
          900: '#060C16',
          950: '#000000'
        },
        overlay: 'hsla(0, 0%, 0%, 0.45)'
      },
      gridTemplateColumns: {
        overview: 'repeat(auto-fill, minmax(min(446px, 100%), 1fr))'
      },
      keyframes: {
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
