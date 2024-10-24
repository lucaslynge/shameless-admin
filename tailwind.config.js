/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: "jit",
    darkMode: ["class"],
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
  	extend: {
  		fontFamily: {
  			'font-sans': ["var(--font-inter)"]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
};
