import { useHotels } from "../../context/HotelProvider";

function Map() {
  const { isLoading, hotels } = useHotels();
  console.log(isLoading, hotels);

  return <div>Map</div>;
}

export default Map;
