/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: {
					850: '#18202F',
					950: '#0b0f1a',
				},
			},
			screens: {
				'1.5xl': '1440px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
};
