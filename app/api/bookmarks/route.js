import connectDB from "@/config/db";
import User from '@/model/User'
import Property from '@/model/Property'
import {getSessionUser} from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// Get /api/bookmarks
export const GET = async () => {
	try {
		await connectDB()

		const sessionUser = await getSessionUser()

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', {status: 401})
		}

		const {userId} = sessionUser

		// Find user in database
		const user = await User.findOne({_id: userId})

		// Get users bookmarks
		const bookmarks = await Property.find({_id: {$in: user.bookmarks}})

		return new Response(JSON.stringify({bookmarks}), {status: 200})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', {status: 500})
	}
}

export const POST = async (req) => {
	try {
		await connectDB();

		const {propertyId} = await req.json()

		const sessionUser = await getSessionUser()

		if (!sessionUser || !sessionUser.userId) {
			return new Response('User ID is required', {status: 401})
		}

		const {userId} = sessionUser

		// Find user in database
		const user = await User.findOne({_id: userId})

		// Check if property is bookmarked
		let isBookmarked = user.bookmarks.includes(propertyId)

		let message;

		if (isBookmarked) {
			// If already bookmarked, remove it
			user.bookmarks.pull(propertyId)
			message = 'Bookmark removed successfully'
			isBookmarked = false
		} else {
			// If not bookmarked, add it
			user.bookmarks.push(propertyId)
			message = 'Bookmarked added successfully'
			isBookmarked = true
		}

		await user.save()

		return new Response(JSON.stringify({message, isBookmarked}), {status: 200})

	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', {status: 500})
	}
}
