/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useBookmarks } from "../context/BookmarkList";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import Bookmark from "../Bookmark/Bookmark";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmarkHotel, isLoading, currentBookmark } =
    useBookmarks();


  useEffect(() => {
    getBookmarkHotel(id);
  }, [id]);

  if (isLoading || !currentBookmark) {
    return (
      <div className=" flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <button onClick={() => navigate(-1)} className=" backToList gap-x-2  ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        <span>back</span>
      </button>
      <div className=" flex items-center justify-center flex-col h-full gap-6 w-full  ">
        <ReactCountryFlag
          style={{
            fontSize: "4em",
            borderRadius : "0.2em"
          }}
          svg
          countryCode={currentBookmark.countryCode}
        />
        <p className="  font-semibold text-xl text-gray-800 ">
          {currentBookmark.cityName}
        </p>
        <p className="  font-semibold text-lg text-gray-800 ">
          {currentBookmark.country}
        </p>
        <p className="  font-semibold text-base text-gray-800 ">
          {currentBookmark.latitude}
        </p>
        <p className="  font-semibold text-base text-gray-800 ">
          {currentBookmark.longitude}
        </p>
      </div>
    </>
  );
}

export default SingleBookmark;
