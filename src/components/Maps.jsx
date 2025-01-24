import {GoogleMap, LoadScript, MarkerF} from "@react-google-maps/api";

export default function Maps({lat, lng, isMarkerShow = false, onClick}) {
  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_MAPS_API}>
      <GoogleMap
        mapContainerStyle={{width: "100%", height: "700px"}}
        center={{
          lat,
          lng,
        }}
        zoom={17}
        onClick={onClick}
      >
        {isMarkerShow && (
          <MarkerF position={{
            lat,
            lng
          }} />
        )}
      </GoogleMap>
    </LoadScript>
  )
}