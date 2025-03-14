import connectDB from "@/config/db";
import Message from '@/model/Message'
import {getSessionUser} from "@/utils/getSessionUser";

export const dynamic = 'force-dynamic'

// GET /api/messages
export const GET = async (req) => {
	try {
		await connectDB()

		const sessionUser = await getSessionUser()

		if (!sessionUser || !sessionUser.user) {
			return new Response('User ID is required', {status: 401})
		}

		const {userId} = sessionUser

		const readMessage = await Message.find({recipient: userId, read: true})
			.sort({createdAt: -1}) // Sort read messages in a sending order
			.populate('sender', 'username')
			.populate('property', 'name')

		const unReadMessage = await Message.find({recipient: userId, read: false})
			.sort({createdAt: -1}) // Sort read messages in a sending order
			.populate('sender', 'username')
			.populate('property', 'name')

		const message = [...unReadMessage, ...readMessage]

		return new Response(JSON.stringify(message), {status: 200})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', {status: 404})
	}
}
// POST /api/messages
export const POST = async (req) => {
	try {
		await connectDB()

		const {name, email, phone, message, property, recipient} = await req.json()

		const sessionUser = await getSessionUser()

		if (!sessionUser || !sessionUser.userId) {
			return new Response('You must be logged in to sent a message', {status: 401})
		}
		const {user} = sessionUser

		if (user.id === recipient) {
			return new Response(JSON.stringify({message: 'Can not send a message to yourself'}), {status: 400})
		}

		const newMessage = new Message({
			sender: user.id,
			recipient,
			name,
			property,
			email,
			phone,
			body: message
		})

		await newMessage.save()

		return new Response(JSON.stringify({message: 'Message Sent'}), {status: 200})
	} catch (error) {
		console.log(error)
		return new Response('Something went wrong', {status: 404})
	}
}
