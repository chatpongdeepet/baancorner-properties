import connectDB from "@/config/db";
import Property from "@/model/Property";

// GET /api/properties/:id
export const GET = async (req, {params}) => {
	try {
		await connectDB()

		const property = await Property.findById(params.id)

		if (!property) return new Response('Property not found', {status: 404})

		return new Response(JSON.stringify(property), {status: 200})
	} catch (e) {
		console.log(e)
		return new Response('Something went wrong', {status: 500})
	}
}
