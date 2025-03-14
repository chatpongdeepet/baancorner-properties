'use client'
import {useState, useEffect} from "react";
import {useSession} from "next-auth/react";
import {toast} from "react-toastify";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";

const BookmarkButton = ({property}) => {
	const {data: session} = useSession()
	const userId = session?.user?.id;

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
				? 'bg-pakistan-green hover:bg-dark-moss text-alabaster ring-pakistan-green ring-offset-2 ring-4'  // ถ้า isBookmarked เป็น true
				: 'bg-desertsand ring-2 ring-gray-300 hover:ring-pakistan-green hover:ring-offset-2 hover:ring-2  text-pakistan-green '} // ถ้า isBookmarked เป็น false
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
