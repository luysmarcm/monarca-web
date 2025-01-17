/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#3a2d28",
				secundary: "#a48373",
				fondo: "#CBAD8C",
				negro: "#1c2432",
				m: "#d1c7bd",
				b: "#F1D2BB",
				fondo: "#d1c7bd",
				gris: "#D9D9D9",
			},
			// fontFamily: {
			// 	Montserrat: ["Montserrat"],
			// },
			screens: {
				xs: "280px",
				sm: "640px",
				// => @media (min-width: 640px) { ... }

				md: "768px",
				// => @media (min-width: 768px) { ... }

				lg: "1024px",
				// => @media (min-width: 1024px) { ... }

				xl: "1280px",
				// => @media (min-width: 1280px) { ... }

				"2xl": "1536px",
				// => @media (min-width: 1536px) { ... }
			},
			maxWidth: {
				max: "1920px",
			},
			minWidth: {
				min: "280px",
			},
			height: {
				"10v": "10vh",
				"20v": "20vh",
				"30v": "30vh",
				"40v": "40vh",
				"50v": "50vh",
				"60v": "60vh",
				"70v": "70vh",
				"80v": "80vh",
				"90v": "90vh",
				"100v": "100vh",
			},
			backgroundImage: (theme) => ({
				banner: "url('/image/banner.webp')",
				contact: "url('/image/contact2.webp')",
			}),
		},
	},
	plugins: [],
};
