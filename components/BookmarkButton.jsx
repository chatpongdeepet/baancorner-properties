'use client'
import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";

const BookmarkButton = ({property}) => {
	const {data: session} = useSession()
	const userId = session?.user?.id;
	console.log(userId)

	const [isBookmarked, setIsBookmarked] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!userId) {
			setLoading(false)
			return
		}
		const checkBookmarkStatus = async () => {
			try {
				if (!property || !property._id) {
					toast.error('Invalid property data')
					return
				}

				const res = await fetch('/api/bookmarks/check', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						propertyId: property._id
					})
				})

				if (res.status === 200) {
					const data = await res.json()
					setIsBookmarked(data.isBookmarked)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}
		checkBookmarkStatus()
	}, [property._id, userId]);

	const handleClick = async () => {
		if (!userId) {
			toast.error('You need to sign in  to bookmark a property')
			return;
		}

		try {
			if (!property || !property._id) {
				toast.error('Invalid property data')
				return
			}

			const res = await fetch('/api/bookmarks', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					propertyId: property._id
				})
			})

			if (res.status === 200) {
				const data = await res.json()
				toast.success(data.message)
				setIsBookmarked(data.isBookmarked)
			}
		} catch (error) {
			console.log(error)
			toast.error('Something went wrong')
		}
	}

	if (loading) return <p className = "text-center">Loading...</p>

	return (
		<button
			onClick = {handleClick}
			className = {`
		 font-bold w-full py-2 px-4 rounded-full flex items-center justify-center
		${isBookmarked
				? 'bg-blue-600 hover:bg-blue-700 text-white ring-blue-600'  // ถ้า isBookmarked เป็น true
				: 'bg-white ring-2 ring-gray-300 hover:ring-blue-600 hover:ring-2  text-blue-600 '} // ถ้า isBookmarked เป็น false
	`}

		>
			{isBookmarked ? (<FaBookmark className = "mr-2" />) : (
				<FaRegBookmark className = "mr-2" />)}
			<span className = "block lg:hidden">Bookmark</span>
			<span className = "hidden lg:block">Bookmark Property</span>

		</button>
	);
};

export default BookmarkButton;
