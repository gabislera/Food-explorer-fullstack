/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['"Roboto"', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        gray: {
          50: '#eaeaea',
          100: '#bebebf',
          200: '#9e9ea0',
          300: '#727275',
          400: '#56565a',
          500: '#2c2c31',
          600: '#28282d',
          700: '#1f1f23',
          800: '#18181b',
          900: '#121215',
        },
        light: {
          100: '#FFFFFF',
          200: '#FFFAF1',
          300: '#E1E1E6',
          400: '#C4C4CC',
          500: '#7C7C8A',
          600: '#76797B',
          700: '#4D585E',
        },
        dark: {
          100: '#000405',
          200: '#00070A',
          300: '#000204',
          400: '#000A0F',
          500: '#000C12',
          600: '#00111A',
          700: '#001119',
          800: '#0D161B',
          900: '#0D1D25',
          1000: '#192227',
        },
        tomato: {
          100: '#750310',
          200: '#92000E',
          300: '#AB222E',
          400: '#AB4D55',
        },
        carrot: {
          100: '#FBA94C',
        },
        mint: {
          100: '#04D361',
        },
        cake: {
          100: '#065E7C',
          200: '#82F3FF',
        },

      },
    },
  },
  plugins: [],
}
