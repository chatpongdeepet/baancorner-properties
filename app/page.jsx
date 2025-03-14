import Hero from '../components/Hero'
import HomeProperties from "@/components/HomeProperties";
import FeaturedProperties from "@/components/FeaturedProperties";
import InfoBox from "@/components/InfoBox";
import InfoBoxes from "@/components/InfoBoxes";

const HomePage = () => {
	return (
		<div className = "pt-16">
			<Hero />
			<InfoBoxes />
			<FeaturedProperties />
			<HomeProperties />
		</div>
	);
};

export default HomePage;
