import SearchForm from "@/components/SearchForm";
import Properties from "@/components/Properties";

const PropertiesPage = async () => {

	return (
		<>
			<section className = "bg-dark-moss py-6 pt-24">
				<div className = "max-w-7xl mx-auto px-4 flex flex-co items-start sm:px-6 lg:px-8">
					<SearchForm />
				</div>
			</section>
			<Properties />
		</>
	)
};

export default PropertiesPage;

