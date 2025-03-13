import connectDB from "@/config/db";
import Property from "@/model/Property";

// GET /api/properties/user/:userId
export const GET = async (req, context) => {
	try {
		await connectDB()

		const {userId} = await context.params;

		if (!userId) {
			return new Response('User ID is required', {status: 400})
		}

		const properties = await Property.find({owner: userId})

		return new Response(JSON.stringify({properties}), {status: 200})
	} catch (e) {
		console.log(e)
		return new Response('Something went wrong', {status: 500})
	}
}
