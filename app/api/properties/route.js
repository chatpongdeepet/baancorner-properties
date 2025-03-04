import connectDB from "@/config/db";
import Property from "@/model/Property";

// GET /api/properties
export const GET = async (req) => {
	try {
		await connectDB()

		const properties = await Property.find({})

		return new Response(JSON.stringify({properties}), {status: 200})
	} catch (e) {
		console.log(e)
		return new Response('Something went wrong', {status: 500})
	}
}
