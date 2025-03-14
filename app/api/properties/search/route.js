import connectDB from "@/config/db";
import Property from "@/model/Property";

// Get /api/properties/search
export const GET = async (req) => {
	try {
		await connectDB()

		const {searchParams} = new URL(req.url)
		const location = searchParams.get('location')
		const propertyType = searchParams.get('propertyType')

		const locationPattern = new RegExp(location, 'i')

		// Match location pattern against field
		let query = {
			$or: [
				{name: locationPattern},
				{description: locationPattern},
				{'location.street': locationPattern},
				{'location.city': locationPattern},
				{'location.state': locationPattern},
				{'location.zipcode': locationPattern},
			]
		}

		// Only check for property if is not 'All'
		if (propertyType && propertyType !== "All") {
			query.type = new RegExp(propertyType, 'i')
		}

		const properties = await Property.find(query)
		console.log('properties', properties)
		return new Response(JSON.stringify(properties), {status: 200})
	} catch (error) {
		console.log(error)
		return new Response(JSON.stringify({message: 'Something went wrong'}), {status: 500})
	}
}
