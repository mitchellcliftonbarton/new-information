module.exports = {
  purge: [
     './components/**/*.{vue,js}',
     './layouts/**/*.vue',
     './pages/**/*.vue',
     './plugins/**/*.{js,ts}',
     './nuxt.config.{js,ts}',
   ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: '#fff',
      black: '#000',
      transparent: 'transparent',
      blue: 'blue'
    },
    fontFamily: {
      'h-narrow': ['Helvetica Narrow', 'sans-serif'],
    },
    fontSize: {
      base: ['1.2rem', '1.2'],
      'h-text': ['2.8rem', '1.15'],
      'h-text-mobile': ['2.2rem', '1.15'],
    },
    flex: {
      '0-0': '0 0 auto',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    container: false,
  }
}
