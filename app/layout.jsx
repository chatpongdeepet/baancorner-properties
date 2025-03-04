import "../assets/styles/globals.css";
import '@/components/navbar'
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";

export const metadata = {
	title: "baancorner Properties | Find your dream properties",
	description: "Find your dream properties",
	keyword: "rental, rental properties"
};

export default function RootLayout({children}) {
	return (
		<html lang = "en">
		<body
		>
		<Navbar />
		{children}
		<Footer />
		</body>
		</html>
	);
}
