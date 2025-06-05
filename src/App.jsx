import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import AppLayout from "./components/AppLayout/AppLayout";
import { Routes, Route } from "react-router-dom";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import HotelProvider from "./context/HotelProvider";

function App() {
  return (
    <HotelProvider>
      <Toaster />
      <Header />
      {/* <LocationList/> */}
      <Routes >
        <Route path="/" element={<LocationList />} />
        <Route path="hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
      </Routes>
    </HotelProvider>
  );
}

export default App;
