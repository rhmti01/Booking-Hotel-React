import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkList";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

function Bookmark() {
  const { bookmarks, isLoading, currentBookmark, deleteBookmarkHotel } =
    useBookmarks();

  if (isLoading)
    return (
      <div className=" flex items-center justify-center h-full">
        <Loader />
      </div>
    );

  if (!bookmarks.length) {
    return (
      <div className=" w-full h-full flex justify-center items-center ">
        <h1 className=" font-semibold text-xl text-gray-700 ">
          No Hotel Found In Your Bookmarks!
        </h1>
      </div>
    );
  }

  const handleRemove = async (e, id) => {
    e.preventDefault();
    await deleteBookmarkHotel(id);
  };

  return (
    <div>
      <h2 className="bookmarkTitle flex items-center justify-center gap-x-2 ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
        <span> Bookmarks List</span>
      </h2>
      <div className=" bookmarkList ">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem  ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }   `}
              >
                <ReactCountryFlag
                  style={{
                    fontSize: "1.4em",
                    borderRadius: "0.2em",
                  }}
                  svg
                  countryCode={item.countryCode}
                />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;{" "}
                <span>{item.country}</span>
                <button onClick={(e) => handleRemove(e, item.id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 stroke-red-500 duration-300 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
