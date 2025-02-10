import type { LatLngExpression, PathOptions } from "leaflet";
import { MapContainer, Polygon, TileLayer } from "react-leaflet";
import { ClearCuttings } from "./ClearCuttings";

export function InteractiveMap() {
	const center: LatLngExpression = [51.505, -0.09];
	const multiPolygon: LatLngExpression[][] = [
		[
			[51.51, -0.12],
			[51.51, -0.13],
			[51.53, -0.13],
		],
		[
			[51.51, -0.05],
			[51.51, -0.07],
			[51.53, -0.07],
		],
	];

	const purpleOptions: PathOptions = { color: "purple" };

	return (
		<MapContainer
			className="h-full"
			center={center}
			zoom={13}
			scrollWheelZoom={true}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<ClearCuttings />
			<Polygon pathOptions={purpleOptions} positions={multiPolygon} />
		</MapContainer>
	);
}
