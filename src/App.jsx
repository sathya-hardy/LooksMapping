import { useState } from 'react'
import './App.css'
import { GoogleMap, LoadScript,  Marker, InfoWindow } from "@react-google-maps/api";
import Header from "./components/Header";
import Slider from "./components/Slider";
import PhotoRater from "./components/PhotoRater";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 39.1696, 
  lng: -86.5386,
};

const GOOGLE_MAPS_API_KEY = "AIzaSyADjFXK1y9E1ptQ7hbkbSoe78dpWwYsMlA";

function generateNearbyPoints(center, count = 100) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.1;  // ~±0.05° (~5.5km)
    const lngOffset = (Math.random() - 0.5) * 0.1;

    points.push({
      lat: center.lat + latOffset,
      lng: center.lng + lngOffset,
      value: Math.floor(Math.random() * 10) + 1, // 1 to 10
    });
  }

  return points;
}

const nearbyPoints = generateNearbyPoints(center, 100);

// export default function App() {
//   return <h1>Hello, world!</h1>;
// }

function App() {
  const [value, setValue] = useState(5);
   const filteredPoints = nearbyPoints.filter((pt) => pt.value === Number(value));
   const [selectedPoint, setSelectedPoint] = useState(null);
   

  return (
    <div className="flex flex-col w-full font-sans dark:bg-gray-900">
      <Header />
      
      <div className="flex gap-6 px-6 py-4">
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} 
        center={center} zoom={12}
        onLoad={(map) => {
        window.addEventListener("resize", () => {
          map.setZoom(map.getZoom());
        });
      }}>
         {filteredPoints.map((point, idx) => (
            <Marker key={idx} position={{ lat: point.lat, lng: point.lng }} label={String(point.value)} onClick={() => setSelectedPoint(point)}/>
          ))}
          {selectedPoint && (
              <InfoWindow
                position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
                onCloseClick={() => setSelectedPoint(null)}
                options={{
                    maxWidth: 200,
                    pixelOffset: new window.google.maps.Size(0, -10),
                  }}
              >
                <div>
                <p className="mb-1"  style={{color:"black"}}><strong style={{color:"black"}}>Latitude:</strong> {selectedPoint.lat.toFixed(4)}</p>
                <p className="mb-1"  style={{color:"black"}}><strong style={{color:"black"}}>Longitude:</strong> {selectedPoint.lng?.toFixed(4)}</p>
                </div>
              </InfoWindow>
            )}
        </GoogleMap>
      </LoadScript>
      </div>

      
      {/* <div style={{ marginTop: "1rem" }}>
        <label>
          Value: {value}
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "100%" }}
          />
        </label>
      </div> */}
      <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: 900,
        margin: "2rem auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <div style={{ width: "50%" }}>
        <Slider value={value} setValue={setValue} />
      </div>
      <div style={{ width: "50%" }}>
        <PhotoRater value={value} />
      </div>
    </div>
    </div>
    
  );
}
// style="color:black"

export default App
