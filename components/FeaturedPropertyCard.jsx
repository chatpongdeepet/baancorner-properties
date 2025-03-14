import Link from 'next/link'
import {FaMoneyBill, FaBed, FaBath, FaRulerCombined, FaMapMarker} from "react-icons/fa";
import Image from "next/image";

const FeaturedPropertyCard = ({property}) => {
	const getRateDisplay = () => {
		const {rates} = property

		if (rates.monthly) {
			return `${rates.monthly.toLocaleString()}/mo`
		} else if (rates.weekly) {
			return `${rates.weekly.toLocaleString()}/wk`
		} else if (rates.nightly) {
			return `${rates.nightly.toLocaleString()}/night`
		}
	}
	return (
		<div
			className = "bg-white rounded-xl shadow-md relative flex flex-col md:flex-row "
		>
			<Image
				src = {property.images[0]}
				alt = ""
				className = "object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
				width = {0}
				height = {0}
				sizes = "100vh"
			/>
			<div className = "p-6 w-full">
				<h3 className = "text-xl font-bold">{property.name}</h3>
				<div className = "text-gray-600 mb-4">{property.type}</div>
				<h3
					className = "absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-dark-moss font-bold text-right md:text-center lg:text-right"
				>
					${getRateDisplay()}
				</h3>
				<div className = "flex justify-center gap-4 text-gray-500 mb-4">
					<p className = "flex items-center">
						<FaBed className = "inline-block mr-2" /> {property.beds}&nbsp;

						<span className = "md:hidden lg:inline"> Beds</span>
					</p>
					<p className = "flex items-center">
						<FaBath className = "inline-block mr-2" /> {property.baths}&nbsp;
						<span className = "md:hidden lg:inline"> Baths</span>
					</p>
					<p className = "flex items-center">
						<FaRulerCombined className = "inline-block mr-2" />
						{property.square_feet}&nbsp; <span className = "md:hidden lg:inline"> sqft</span>
					</p>
				</div>

				<div
					className = "flex justify-center gap-4 text-green-900 text-sm mb-4"
				>
					{property.rates.nightly && (
						<p className = "flex items-center"><FaMoneyBill className = "inline mr-1" /> Nightly </p>
					)
					}
					{property.rates.weekly && (
						<p className = "flex items-center"><FaMoneyBill className = "inline mr-1" /> Weekly</p>
					)
					}
					{property.rates.monthly && (
						<p className = "flex items-center"><FaMoneyBill className = "inline mr-1" /> Monthly</p>
					)
					}
				</div>

				<div className = "border border-gray-200 mb-5"></div>

				<div className = "flex flex-col lg:flex-row justify-between">
					<div className = "flex align-middle gap-2 mb-4 lg:mb-0 items-center">
						<FaMapMarker
							className = "text-lg text-orange-700"
						></FaMapMarker>
						<span className = "text-orange-700"> {property.location.city},{property.location.state}</span>
					</div>
					<Link
						href = {`/properties/${property._id}`}
						className = "h-[36px] text-alabaster bg-dark-moss hover:bg-pakistan-green px-4 py-2 rounded-lg text-center text-sm"
					>
						Details
					</Link>
				</div>
			</div>
		</div>
	);
};

export default FeaturedPropertyCard;
