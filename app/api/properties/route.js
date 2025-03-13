import connectDB from "@/config/db";
import Property from "@/model/Property";
import {getSessionUser} from "@/utils/getSessionUser";
import cloudinary from "@/config/cloudinary";

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

export const POST = async (req) => {
	try {
		await connectDB()

		const sessionUser = await getSessionUser()

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', {status: 401})
		}

		const {userId} = sessionUser;

		const formData = await req.formData()

		// Access all values from amenities and images
		const amenities = formData.getAll('amenities')
		const images = formData
			.getAll('images')
			.filter((image) => image.name !== '')

		// Create properties data from object
		const propertiesData = {
			type: formData.get('type'),
			name: formData.get('name'),
			description: formData.get('description'),
			location: {
				street: formData.get('location.street'),
				city: formData.get('location.city'),
				state: formData.get('location.state'),
				zipcode: formData.get('location.zipcode')
			},
			beds: parseInt(formData.get('beds'), 10),
			baths: formData.get('baths'),
			square_feet: formData.get('square_feet'),
			amenities,
			rates: {
				weekly: formData.get('rates.weekly'),
				monthly: formData.get('rates.monthly'),
				nightly: formData.get('rates.nightly'),
			},
			seller_info: {
				name: formData.get('seller_info.name'),
				email: formData.get('seller_info.email'),
				phone: formData.get('seller_info.phone'),
			},
			owner: userId,
		}

		// Upload images to cloudinary
		const imageUploadPromises = [];
		for (const image of images) {
			const imageBuffer = await image.arrayBuffer()
			const imageArray = Array.from(new Uint8Array(imageBuffer))
			const imageData = Buffer.from(imageArray)

			// Convert the image data to base64
			const imageBase64 = imageData.toString('base64')

			// Make request to upload to cloudinary
			const result = await cloudinary.uploader.upload(
				`data:image/png;base64,${imageBase64}`, {
					folder: 'baancornerproperties'
				}
			)

			imageUploadPromises.push(result.secure_url)

			// Wait for all images to upload
			const uploadedImages = await Promise.all(imageUploadPromises)
			// Add uploaded images to the properties data object
			propertiesData.images = uploadedImages
		}

		const newProperty = new Property(propertiesData)
		await newProperty.save();

		return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`)
		// return new Response(JSON.stringify({
		// 	message: 'Success'
		// }), {status: 200})
	} catch (error) {
		console.error('Error in POST handler:', error); // Log Error
		return new Response('Failed to add properties', {status: 500});

	}
}
