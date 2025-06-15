/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

const BASE_GEOCODING_URL = "https://api-bdc.net/data/reverse-geocode-client";

function AddNewBookmark() {
  const navigate = useNavigate();
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeocode, setIsLoadingGeocode] = useState(false);
  const [geocodeError, setGeocodeError] = useState(false);

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

  function handleBack(e) {
    e.preventDefault();
    navigate("/bookmark");
  }

  function handleAddNewBookmark(e) {
    e.preventDefault();
    if (country.length < 4 || country.length < 4) {
      toast.error(" Select your bookmark location from map first! ");
    }
  }

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
      <form className="form">
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
          <button onClick={(e) => handleBack(e)} className="btn btn--back">
            &larr; back
          </button>
          <button
            onClick={(e) => handleAddNewBookmark(e)}
            className="btn btn--primary"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
