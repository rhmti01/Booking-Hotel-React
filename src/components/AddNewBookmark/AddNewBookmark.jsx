/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmarks } from "../context/BookmarkList";

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [geocodeError, setGeocodeError] = useState(false);
  const { createBookmarkHotel } = useBookmarks();

  useEffect(() => {
    if (!lat || !lng) return;

    async function fetchLocationData() {
      setIsLoadingGeocode(true);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error("This location is not city , select a valid land!");
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || data.locality || "");
        setCountryCode(data.countryCode);
      } catch (error) {
        setGeocodeError(error.message);
      } finally {
        setIsLoadingGeocode(false);
      }
    }
    fetchLocationData();
  }, [lat, lng]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) {
      toast.error(" Select your bookmark location from map first! ");
      return;
    }

    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_locations: cityName + "  " + country,
    };

    try {
      await createBookmarkHotel(newBookmark);
      navigate("/bookmark");
    } catch (error) {
      toast.error("Failed to add bookmark");
      console.error(error);
    }
  };

  if (isLoadingGeocode) {
    return (
      <div className=" flex items-center justify-center h-full">
        <Loader />
      </div>
    );
  }

  if (geocodeError) {
    return (
      <div className=" w-full h-full flex items-center justify-center  ">
        <p className=" text-xl font-semibold ">{geocodeError}</p>
      </div>
    );
  }

  return (
    <div className=" w-full  ">
      <h2 className=" newbookmrkTitle ">Bookmark New Location</h2>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="formControl">
          <label htmlFor="city">CityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="city"
            id="cityName"
            placeholder="Enter City Name . . ."
          />
        </div>{" "}
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
            placeholder="Enter Country Name . . ."
          />
          <ReactCountryFlag
            style={{
              fontSize: "2em",
            }}
            svg
            className="flag"
            countryCode={countryCode}
          />
        </div>{" "}
        <div className=" buttons ">
          <button
            type="button"
            className="btn btn--back"
            onClick={(e) => {
              e.preventDefault();
              navigate("/bookmark");
            }}
          >
            &larr; Back
          </button>
          <button type="submit" className="btn btn--primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
