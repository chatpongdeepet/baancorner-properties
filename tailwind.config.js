// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}', // ไฟล์ในโฟลเดอร์ pages
		'./components/**/*.{js,ts,jsx,tsx}', // ไฟล์ในโฟลเดอร์ components
		'./app/**/*.{js,ts,jsx,tsx}', // ไฟล์ในโครงสร้าง app (Next.js 13+)
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Poppins', 'sans-serif']
			},
			gridTemplateColumns: {
				'70/30': '70% 28%'
			}
		}, // สำหรับการเพิ่ม custom theme
	},
	plugins: [],
};
