import connectDB from "@/config/db";
import User from '@/model/User'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: "consent",
					access_type: "offline",
					response_type: "code"
				}
			}
		})
	],
	callbacks: {
		// Invoke on successful signin
		async signIn({profile}) {
			try {
				// 1. Connect to database
				await connectDB()
				console.log("Database connected...");

				// 2. Check if user exist
				const userExists = await User.findOne({email: profile.email})
				console.log("User found in database:", userExists);

				// 3. if not, then add user to database
				if (!userExists) {
					// Truncate username if too long
					const username = profile.name.slice(0, 20)

					const newUser = await User.create({
						email: profile.email,
						username,
						image: profile.picture
					})
					console.log("New user created:", newUser);

				}
				// 4. return ture to allow sign in
				return true
			} catch (error) {
				console.error("Error in signin callback:", error);
				return false;
			}
		},
		// Modifies the session object
		async session({session}) {
			try {
				// 1. Get user from database
				const user = await User.findOne({email: session.user.email})
				if (user) {
					session.user.id = user._id.toString()
				} else {
					console.warn("No user found for session.");
				}
				// 2. Assign the user id to session
			} catch (error) {
				console.error("Error in session callback:", error);
			}
			// 3. return session
			return session
		}
	}
}
