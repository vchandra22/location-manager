import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";

export default function Maps({lat, lng}) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={{width: "100%", height: "700px"}}
        center={{
          lat,
          lng,
        }}
        zoom={14}
      >
        <MarkerF position={{
          lat,
          lng
        }} />
      </GoogleMap>
    </LoadScript>
  )
}