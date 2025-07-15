import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import toast from "react-hot-toast";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter = {
  lat: 23.0225,
  lng: 72.5714,
};

const MapPicker = ({ onAddressSelect }) => {
  const [marker, setMarker] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const handleClick = async (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setMarker({ lat, lng });

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const address = data?.display_name;
      if (address) {
        onAddressSelect(address);
      } else {
        toast.error("Could not fetch address");
      }
    } catch (error) {
      toast.error("Reverse geocoding failed");
    }
  };


  if (!isLoaded) return <p className="text-gray-600">Loading Map...</p>;

  return (
    <div className="mb-4">
      <label className="mb-1 font-medium text-gray-700 flex items-center gap-2">
        📍 Click on the map to pick delivery location
      </label>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={13}
        onClick={handleClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </div>
  );
};

export default MapPicker;
