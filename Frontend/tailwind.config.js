/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily:{
			sans: ['Arial', 'sans-serif']
		},
    extend: {
      backgroundImage: {
        'right-side': "url('/images/right-side.svg')",
      },
      colors: {
        "mainBackgroundColor": '#0D1117',
        "columnBackgroundColor": '#161C22'
      }
    },
  },
  plugins: [],
};
