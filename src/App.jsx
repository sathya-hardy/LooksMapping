import { useState } from 'react'
import './App.css'
import { GoogleMap, LoadScript,  Marker, InfoWindow } from "@react-google-maps/api";
import Header from "./components/Header";
import Slider from "./components/Slider";
import PhotoRater from "./components/PhotoRater";
import { AnimatePresence, motion } from "framer-motion";
import Intro from './components/Intro';

const containerStyle = {
  width: "100%",
  height: "750px",
};

const center = {
  lat: 41.8781, 
  lng: -87.6298,
};

const GOOGLE_MAPS_API_KEY = "AIzaSyADjFXK1y9E1ptQ7hbkbSoe78dpWwYsMlA";

function generateNearbyPoints(center, count = 100) {
  const points = [];

  for (let i = 0; i < count; i++) {
    const latOffset = (Math.random() - 0.5) * 0.1;
    const lngOffset = (Math.random() - 0.5) * 0.1;

    points.push({
      lat: center.lat + latOffset,
      lng: center.lng + lngOffset,
      value: Math.floor(Math.random() * 10) + 1,
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
   
   const [selectedPoint, setSelectedPoint] = useState(null);
   const [showIntro, setShowIntro] = useState(true);
   const [sliderActive, setSliderActive] = useState(false);

   const filteredPoints = sliderActive
  ? nearbyPoints.filter((pt) => pt.value === Number(value))
  : nearbyPoints;

  return (
    <AnimatePresence>
      {showIntro ? (
        <Intro onFinish={() => setShowIntro(false)} />
      ) : (
        <motion.div
          key="main"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col w-full font-sans dark:bg-black"
        >

      <Header />
      
      <div className="flex w-full gap-6 px-6 py-4">
         <div style={{ flex: "0 0 80%" }}>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} 
        center={center} zoom={12}
        onLoad={(map) => {
        window.addEventListener("resize", () => {
          map.setZoom(map.getZoom());
        });
      }}>
         {filteredPoints.map((point, idx) => {
            let icon;
            if (point.value <= 3) {
              icon = "https://maps.google.com/mapfiles/ms/icons/blue-dot.png";
            } else if (point.value <= 7) {
              icon = "https://maps.google.com/mapfiles/ms/icons/green-dot.png";
            } else {
              icon = "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
            }

             return (
            <Marker key={idx} position={{ lat: point.lat, lng: point.lng }} icon={{
          url: icon,
        }} onClick={() => setSelectedPoint(point)}/>
      );
      })}
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

      <div
      style={{
        display: "flex",
        flex: "0 0 20%",
        flexDirection: "column",
        margin: "2rem auto",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: 8,
        overflow: "hidden",
        gap: "1rem",
      }}
    >
      <div style={{  flex: 1 }}>
        <Slider value={value} setValue={setValue} sliderActive={sliderActive} setSliderActive={setSliderActive} />
      </div>
      <div style={{  flex: 1 }}>
        <PhotoRater value={value} />
      </div>
    </div>
    </div>
    </motion.div>
    )}
    </AnimatePresence>
    
  );
}
// style="color:black"

export default App
