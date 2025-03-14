import "../assets/styles/globals.css";
import 'photoswipe/dist/photoswipe.css'
import '@/components/Navbar'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import {GlobalProvider} from "@/context/GlobalContext";
import React from 'react';
import {ToastContainer} from 'react-toastify';

export const metadata = {
	title: "baancorner Properties | Find your dream properties",
	description: "Find your dream properties",
	keyword: "rental, rental properties"
};

export default function RootLayout({children}) {
	return (
		<GlobalProvider>
			<AuthProvider>
				<html lang = "en">
				<body className = "flex flex-col min-h-screen">
				<Navbar />
				<main className = "flex-1">
					{children}
				</main>
				<Footer />
				<ToastContainer />
				</body>
				</html>
			</AuthProvider>
		</GlobalProvider>
	);
}
