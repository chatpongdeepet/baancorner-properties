'use client'
import {useState, useEffect} from "react";
import Image from 'next/image'
import Link from 'next/link'
import {useSession} from "next-auth/react";
import profileDefault from '@/assets/images/profile.png'
import Spinner from "@/components/Spinner";
import {toast} from 'react-toastify';

const ProfilePage = () => {
	const {data: session} = useSession()
	const profileImage = session?.user?.image
	const profileName = session?.user?.name
	const profileEmail = session?.user?.email

	const [properties, setProperties] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchUserProperties = async (userId) => {
			if (!userId) {
				return;
			}

			try {
				const res = await fetch(`/api/properties/user/${userId}`)

				if (res.status === 200) {
					const data = await res.json()
					setProperties(data.properties || [])
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		}

		// Fetch User Properties when session is available
		if (session?.user?.id) {
			fetchUserProperties(session.user.id)
		}
	}, [session]);

	const handleDeleteProperty = async (propertyId) => {
		const confirmed = window.confirm('Are you sure you want to delete this property?')

		if (!confirmed) return;

		try {
			const res = await fetch(`/api/properties/${propertyId}`, {method: 'DELETE'})

			if (res.status === 200) {
				// Remove the property from state
				const updatedProperties = properties.filter((property) => property._id !== propertyId)

				setProperties(updatedProperties)

				toast.success('Property delete')
			} else {
				toast.error('Failed to delete property')
			}
		} catch (error) {
			console.log(error)
			toast.error('Failed to delete property')
		}
	}

	return (
		<section className = "bg-blue-50">
			<div className = "container m-auto py-24">
				<div className = "bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
					<h1 className = "text-3xl font-bold mb-4 bg">Your Profile</h1>
					<div className = "flex flex-col md:flex-row">
						<div className = "md:w-1/4 mx-20 mt-10">
							<div className = "mb-4">
								<Image
									className = "h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0 ring-pakistan-green ring-offset-4 ring-4"
									src = {profileImage || profileDefault}
									alt = "User"
									width = {200}
									height = {200}
								/>
							</div>
							<h2 className = "text-2xl mb-4"><span className = "font-bold block">Name: </span>{profileName}</h2>
							<h2 className = "text-2xl"><span className = "font-bold block">Email: </span> {profileEmail}</h2>
						</div>

						<div className = "md:w-3/4 md:pl-4">
							<h2 className = "text-xl font-semibold mb-4">Your Property Lists</h2>
							{!loading && properties.length === 0 && (
								<p>You have no property listings</p>
							)}{loading ? (<Spinner loading = {loading} />) : (
							properties.map((property) => (
								<div
									className = "mb-10"
									key = {property._id}
								>
									<Link href = {`/properties/${property._id}`}>
										<img
											className = "h-32 w-full rounded-md object-cover ring-offset-2 ring-2 ring-dark-moss"
											src = {property.images[0]}
											alt = ""
											width = {500}
											height = {100}
										/>
									</Link>
									<div className = "mt-2">
										<p className = "text-lg font-semibold">{property.name}</p>
										<p className = "text-gray-600">Address: {property.location.street}, {property.location.city}</p>
									</div>
									<div className = "mt-2">
										<Link
											href = {`/properties/${property._id}/edit`}
											className = "bg-lapis-blue text-alabaster px-4 py-2.5 rounded-md mr-2 hover:bg-jazz-blue"
										>
											Edit
										</Link>
										<button
											onClick = {() => handleDeleteProperty(property._id)}
											className = "bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
											type = "button"
										>
											Delete
										</button>
									</div>
								</div>
							))
						)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProfilePage;
