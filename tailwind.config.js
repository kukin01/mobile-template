/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
 extend: {
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        rubiksemibold: ['RubikSemibold', 'sans-serif'],
        rubikmedium: ['RubikMedium', 'sans-serif'],
        rubikbold: ['RubikBold', 'sans-serif'],
      }
    },
  },
  plugins: [],
}