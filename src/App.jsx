import { useState } from 'react'
import './App.css'
import { GoogleMap, LoadScript,  Marker, InfoWindow } from "@react-google-maps/api";
import Header from "./components/Header";
import Slider from "./components/Slider";
import DarkModeToggle  from "./components/DarkModeToggle";
import PhotoRater from "./components/PhotoRater";
import { AnimatePresence, motion } from "framer-motion";
import Intro from './components/Intro';
import Sidebar from './components/Sidebar'; 
import restaurantData from './data/chicago_restaurants.json';

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 41.8781, 
  lng: -87.6298,
};

const processedPoints = restaurantData.map(item => ({
  name: item.name,
  lat: item.geometry.location.lat,
  lng: item.geometry.location.lng,
  value: Math.floor(Math.random() * 10) + 1,
}));

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
  ? processedPoints.filter((pt) => pt.value === Number(value))
  : processedPoints;


  const [filters, setFilters] = useState({
        blue: true,
        green: true,
        red: true,
      });

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
      {/* <DarkModeToggle /> */}
      
      <div className="flex w-full gap-6">
         <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
           
            <button className="BlueButton" onClick={() => setFilters(f => ({ ...f, blue: !f.blue }))}>
              {filters.blue ? "Hide" : "Show"} Blue
            </button>
            <button className="GreenButton" onClick={() => setFilters(f => ({ ...f, green: !f.green }))}>
              {filters.green ? "Hide" : "Show"} Green
            </button>
            <button className="RedButton" onClick={() => setFilters(f => ({ ...f, red: !f.red }))} >
              {filters.red ? "Hide" : "Show"} Red
            </button>
          
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} 
        center={center} zoom={12}
        onLoad={(map) => {
        window.addEventListener("resize", () => {
          map.setZoom(map.getZoom());
        });
      }}>
         {filteredPoints.map((point, idx) => {
            let color;
            if (point.value <= 3) {
              color = "blue";
            } else if (point.value <= 7) {
              color = "green";
            } else {
              color = "red";
            }

            if (!filters[color]) return null;

            let icon = `https://maps.google.com/mapfiles/ms/icons/${color}-dot.png`;

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
                 <div style={{ color: "black" }}>
                  <h1>{selectedPoint.name}</h1>
                  <label htmlFor="hotness-slider" style={{ fontWeight: "bold" }}>
                    Hotness: {selectedPoint.value}
                  </label>
                  <input
                    type="range"
                    id="hotness-slider"
                    min="0"
                    max="10"
                    value={selectedPoint.value}
                    readOnly
                    style={{
                      width: "100%",
                      background: `linear-gradient(to right, 
                        blue 0%, 
                        green ${selectedPoint.value * 10}%, 
                        red 100%)`,
                      accentColor: selectedPoint.value <= 3
                        ? "blue"
                        : selectedPoint.value <= 7
                        ? "green"
                        : "red",
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginTop: "4px" }}>
                    <span>Not Hot</span>
                    <span>Hot</span>
                  </div>
                </div>
              </InfoWindow>
            )}
        </GoogleMap>
      </LoadScript>
      </div>

      {/* <div className='Sidebar'>
      <div style={{  flex: 1, paddingBottom:"3rem"  }}>
        <Slider value={value} setValue={setValue} sliderActive={sliderActive} setSliderActive={setSliderActive} />
      </div>
      <div style={{  flex: 1 }}>
        <PhotoRater value={value} />
      </div>
    </div> */}
    <Sidebar value={value} setValue={setValue} sliderActive={sliderActive} setSliderActive={setSliderActive} />
    

    </div>
    </motion.div>
    )}
    </AnimatePresence>
    
  );
}
// style="color:black"

export default App
