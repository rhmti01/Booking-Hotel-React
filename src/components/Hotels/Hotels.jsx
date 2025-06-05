import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotels } from "../../context/HotelProvider";

function Hotels() {
  const { isLoading, hotels } = useHotels();

  if (isLoading)
    return (
      <div className=" flex items-center justify-center h-full">
        <Loader />
      </div>
    );

  if (hotels.length < 1) {
    return (
      <div className=" w-full h-full flex justify-center items-center ">
        <h1 className=" font-semibold text-xl text-gray-700 ">
          No Hotel Found By Your Search!
        </h1>
      </div>
    );
  }

  return (
    <div className=" searchList ">
      <h2 className=" text-xl font-semibold text-slate-800 mb-8  ">
        Found Hotels : ({hotels.length})
      </h2>
      <div className="flex flex-col gap-y-4    ">
        {hotels.map((item) => {
          return (
            <Link
              key={item.id}
              className=" my-3 "
              to={`/hotels/${item.id}?lat=${item.latitude}&lng=${item.longitude}  `}
            >
              <div className="searchItem">
                <img src={item.xl_picture_url} alt={item.name} />
                <div className="searchItemDesc">
                  <p className="location">{item.smart_location}</p>
                  <p className="name ">{item.name}</p>
                  <p className=" price ">
                    €&nbsp;{item.price}&nbsp;
                    <span>night</span>
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
