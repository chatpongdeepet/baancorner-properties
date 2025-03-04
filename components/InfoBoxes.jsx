import InfoBox from "@/components/InfoBox";

const InfoBoxes = () => {
	return (
		<section>
			<div className = "container-xl lg:container m-auto">
				<div className = "grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
					<InfoBox
						heading = "For Renters"
						backgroundColor = "bg-gray-100"
						buttonInfo = {{
							text: 'Browse Properties',
							backgroundColor: 'bg-black',
							link: '/properties'
						}}
					> Find your dream rental property. Bookmark properties and contact
						owners.
					</InfoBox>
					<InfoBox
						heading = "For Property Owners"
						backgroundColor = "bg-blue-100"
						buttonInfo = {{
							text: 'Add Property',
							backgroundColor: 'bg-blue-500',
							link: '/properties/add'
						}}
					> Find your dream rental property. Bookmark properties and contact
						owners.
					</InfoBox>
				</div>
			</div>
		</section>
	);
};

export default InfoBoxes;
