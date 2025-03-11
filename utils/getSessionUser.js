import {getServerSession} from "next-auth";
import {authOptions} from "@/utils/authOption";

export const getSessionUser = async () => {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return null
		}

		return {
			user: session.user,
			userId: session.user.id
		}
	} catch (error) {
		console.log(error)
		return null
	}

}
