/** @type {import('tailwindcss').Config} */

export default {

  content: [ "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      'xs': '100px',
      'sm': '728px',
      'md': '960px',
      'lg': '1440px'
    },
    fontSize: {
      xs: '15px',
      sm: '17px',
      base: '1rem',
      xl: '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    },
    extend: {
      colors: {
        'dim':'#202121',
        'light-dim': '#F1F3F43D'
      }
    },
    
  },
  plugins: [],
}

