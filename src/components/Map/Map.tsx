import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'

import './style.scss'
import 'leaflet/dist/leaflet.css'
import React from 'react'

interface Vehicle {
	id: number
	name: string
	model: string
	year: number
	color: string
	price: number
	latitude: number
	longitude: number
}

interface MapProps {
	latitude: number | undefined
	longitude: number | undefined
	user: Vehicle | null
}

const Map: React.FC<MapProps> = ({ latitude, longitude, user }) => {
	if (!latitude || !longitude) {
		return null
	}
	return (
		<>
			<MapContainer
				center={[latitude, longitude]}
				zoom={13}
				scrollWheelZoom={false}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<Marker position={[latitude, longitude]}>
					<Popup>
						Автомобиль {user && user.id} Координаты:{latitude},{longitude}
					</Popup>
				</Marker>
			</MapContainer>
		</>
	)
}

export default Map
