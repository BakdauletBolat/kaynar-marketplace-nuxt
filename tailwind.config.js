/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem', // 16px on mobile
          sm: '1rem',
          lg: '1.5rem',    // 24px on desktop
          xl: '2rem',      // 32px on wide screens
        },
      },
      colors: {
        // Brand Colors (Golden Yellow for white text contrast)
        'primary': '#F29F05',
        'primary-hover': '#D98E04',
        'wb-red': '#f14d60',     // Discount / Error
        'wb-green': '#00b51d',   // Success
        
        // Semantic Colors (Light/Dark adaptive naming if needed, but we'll use utility classes mostly)
        'light-bg': '#f6f6f9',
        'light-card': '#ffffff',
        'light-text-main': '#242424',
        'light-text-sec': '#868695',

        // Dark Theme Colors
        'dark-bg': '#151517',
        'dark-card': '#202022',
        'dark-text-main': '#ebebeb',
        'dark-text-sec': '#a1a1aa',
      }
    },
  },
  plugins: [],
}

