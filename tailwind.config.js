/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
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
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
