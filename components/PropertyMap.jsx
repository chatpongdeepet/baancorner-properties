'use client'
import {useState, useEffect} from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import {setDefaults, fromAddress} from "react-geocode";
import Spinner from "@/components/Spinner";
import Map, {Marker} from 'react-map-gl/mapbox-legacy'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'

const PropertyMap = ({property}) => {
	const [lat, setLat] = useState(null)
	const [lng, setLng] = useState(null)
	const [viewPort, setViewPort] = useState({
		latitude: 0,
		longitude: 0,
		zoom: 12,
		width: '100%',
		height: '500px'
	})
	const [loading, setLoading] = useState(true)
	const [geocodeError, setGeocodeError] = useState(false)

	setDefaults({
		key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
		language: "en",
		region: 'us',
	});

	useEffect(() => {
		const fetchCoords = async () => {
			try {
				const res = await fromAddress(`${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`);

				// Check for results
				if (!res.results || res.results.length === 0) {
					setGeocodeError(true);
					setLoading(false);
					return;
				}

				const {lat, lng} = res.results[0].geometry.location;

				setLat(lat);
				setLng(lng);
				setViewPort({
					...viewPort,
					latitude: lat,
					longitude: lng
				});

				setLoading(false);
			} catch (error) {
				console.error("Error fetching geocode:", error);
				setGeocodeError(true);
				setLoading(false);
			}
		};

		fetchCoords();
	}, [property]);

	if (loading) return <Spinner loading = {loading} />;

	if (geocodeError) {
		// Handle case where geocoding failed
		return <div className = "text-xl">No location found</div>
	}
	return !loading && (
		<Map
			mapboxAccessToken = {process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
			mapLib = {import('mapbox-gl')}
			initialViewState = {{
				longitude: lng,
				latitude: lat,
				zoom: 14
			}}
			style = {{width: '100%', height: 500}}
			mapStyle = "mapbox://styles/mapbox/streets-v9"
		>
			<Marker
				longitude = {lng}
				latitude = {lat}
			>
				<Image
					src = {pin}
					alt = "location"
					width = {40}
					height = {40}
				/>
			</Marker>
		</Map>
	)
};

export default PropertyMap;
