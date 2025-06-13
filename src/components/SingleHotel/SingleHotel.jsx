import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/HotelProvider";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { getSingleHotel , isLoadingCurrentHotel , currentHotel } = useHotels()

  useEffect(() => {
    getSingleHotel(id)
  }, [id])
  

  if (isLoadingCurrentHotel || !currentHotel  )
    return (
      <div className=" flex items-center justify-center h-full">
        <Loader />
      </div>
    );

  return (
    <div className=" w-full  flex justify-center room rooom ">
      <div className=" flex flex-col items-center gap-y-5  ">
        <h2 className="  text-xl font-semibold text-center   ">{currentHotel.name}</h2>
        <div className="  text-gray-600  font-medium text-center text-base ">
          {currentHotel.number_of_rewiews} reweiews &bull; {currentHotel.smart_location}
        </div>
        <p className="  font-semilight  text-center text-base ">
          {currentHotel.street}
        </p>
        <img
          className="  object-cover w-8/12  rounded-xl h-auto  "
          src={currentHotel.xl_picture_url}
          alt={currentHotel.name}
        />
      </div>
    </div>
  );
}

export default SingleHotel;
