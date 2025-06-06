import useFetch from "../../hooks/useFetch";

function LocationList() {
  const { data, isLoading } = useFetch("http://localhost:5000/hotels", "");

  if (isLoading) return <p>loading...</p>;

  return (
    <div className=" nearbyLocation w-full   ">
      <h2 className=" text-2xl font-bold text-center ">Nearby Locations</h2>
      <div className="locationList">
        {data.map((item) => {
          return (
            <div className="locationItem bg-red-700/  " key={item.id}>
              <img  src={item.xl_picture_url} alt={item.name} />
              <div className="locationItemDesc  ">
                <p className=" location text-lg ">{item.smart_location}</p>
                <p className="name  ">{item.name}</p>
                <p className=" price ">
                  €&nbsp;{item.price}&nbsp;
                  <span>night</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LocationList;
