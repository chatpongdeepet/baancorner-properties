import "../assets/styles/globals.css";
import '@/components/Navbar'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

export const metadata = {
	title: "baancorner Properties | Find your dream properties",
	description: "Find your dream properties",
	keyword: "rental, rental properties"
};

export default function RootLayout({children}) {
	return (
		<AuthProvider>
			<html lang = "en">
			<body>
			<Navbar />
			{children}
			<Footer />
			</body>
			</html>
		</AuthProvider>
	);
}
