import Link from "next/link";
import Hero from '../components/Hero'
import InfoBoxes from "@/components/InfoBoxes";
import Footer from "@/components/Footer";
import HomeProperties from "@/components/HomeProperties";

const HomePage = () => {
	return (
		<div>
			<Hero />
			<InfoBoxes />
			<HomeProperties />
		</div>
	);
};

export default HomePage;
