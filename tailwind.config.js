/** @type {import('tailwindcss').Config} */
module.exports = {
  
  // paths to all of your pages and components so Tailwind can tree-shake unused styles in production builds
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Mmontserrat', 'sans-serif']
      }
    },
  },
  plugins: [],
}
