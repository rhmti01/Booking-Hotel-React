/* eslint-disable no-unused-vars */
import { MapPinIcon } from "@heroicons/react/24/solid";
import { HiCalendar, HiMinus, HiPlus } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

function Header() {
  const [destination, setDestination] = useState("");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState([
    {
      adult: 1,
      children: 0,
      room: 1,
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [searchParams , setSearchParams] = useSearchParams()
  const navigate = useNavigate();

  const handleOptions = (name, operation) => {
    setOptions((prevOptions) => {
      return {
        ...prevOptions,
        [name]: operation === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const onHandleSearch = () => {
    const encodedParams = createSearchParams({
      date: JSON.stringify(date),
      options: JSON.stringify(options),
      destination,
    });
    // setSearchParams(encodedParams)
    navigate({
      pathname : "/hotels" , 
      search : encodedParams.toString()
    });
  };

  return (
    <div className=" header  ">
      <div className="headerSearch justify-evenly ">
        <h1 className=" font-bold  text-lg text-gray-800 hover:text-indigo-700 cursor-pointer ">
          Home
        </h1>
        {/* input */}
        <div className="headerSearchItem gap-x-1 ">
          <MapPinIcon className=" size-7 headerIcon locationIcon " />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="font-medium w-32  headerSearchInput"
            name="destination"
            id="destination"
          />
        </div>
        <div className=" w-[2px] h-7 bg-indigo-200    "></div>
        {/* date  */}
        <div className="headerSearchItem">
          <HiCalendar className=" size-7 headerIcon dateIcon " />
          <div
            onClick={() => setOpenDate(!openDate)}
            className=" cursor-pointer dateDropDown font-medium text-stone-600 text-[15px] "
          >
            {`  
               ${format(date[0].startDate, "MM/dd/yyyy")}
                to
                 ${format(date[0].endDate, "MM/dd/yyyy")}
            `}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
        </div>
        <div className=" w-[2px] h-7 bg-indigo-200    "></div>
        {/* reserve details */}
        <div className="  headerSearchItem  ">
          <div
            id="optionDropDown  "
            className="cursor-pointer"
            onClick={() => setOpenOptions(!openOptions)}
          >
            {options.adult} adult - {options.children} children - {options.room}{" "}
            room
          </div>
          {openOptions && (
            <GuestOptionsList
              setOpenOptions={setOpenOptions}
              handleOptions={handleOptions}
              options={options}
            />
          )}
        </div>
        <div className=" w-[2px] h-7 bg-indigo-200    "></div>
        {/* search button */}
        <div className="headerSearchItem">
          <button className="headerSearchBtn" onClick={() => onHandleSearch()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;

function GuestOptionsList({ options, handleOptions, setOpenOptions }) {
  const optionsRef = useRef(null);
  useOutsideClick({
    ref: optionsRef,
    setOpenOptions: () => setOpenOptions(false),
    exceptionId: "optionDropDown",
  });

  return (
    <div ref={optionsRef} className=" guestOptions ">
      <OptionItem
        handleOptions={handleOptions}
        type="adult"
        minLimit={1}
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="children"
        minLimit={0}
        options={options}
      />
      <OptionItem
        handleOptions={handleOptions}
        type="room"
        minLimit={1}
        options={options}
      />
    </div>
  );
}

function OptionItem({ type, options, minLimit, handleOptions }) {
  return (
    <div className="guestOptionItem">
      <span className=" optionText ">{type}</span>
      <div className="optionCounter">
        <button
          onClick={() => handleOptions(type, "dec")}
          disabled={options[type] <= minLimit}
          className="optionCounterBtn"
        >
          <HiMinus className="icon" />
        </button>
        <span className=" optionCounterNumber ">{options[type]}</span>
        <button
          onClick={() => handleOptions(type, "inc")}
          className="optionCounterBtn"
        >
          <HiPlus className="icon" />
        </button>
      </div>
    </div>
  );
}
