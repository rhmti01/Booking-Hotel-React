/* eslint-disable no-unused-vars */
import { MapPinIcon } from "@heroicons/react/24/solid";
import { HiCalendar, HiLogout, HiMinus, HiPlus } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import {
  createSearchParams,
  Link,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [openOptions, setOpenOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

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
      destination,
      date: JSON.stringify(date),
      options: JSON.stringify(options),
    });
    setSearchParams(encodedParams);
    navigate({
      pathname: "/hotels",
      search: encodedParams.toString(),
    });
  };

  const onHandleKeyRun = (e) => {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        onHandleSearch();
      }
    });
  };

  const onHandleLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className=" header  ">
      <div className="headerSearch justify-evenly ">
        <Link
          to="/"
          className=" font-bold  text-lg text-gray-800 hover:text-indigo-700 cursor-pointer "
        >
          Home
        </Link>{" "}
        <Link
          to="/bookmark"
          className=" font-bold  text-lg text-gray-800 hover:text-indigo-700 cursor-pointer "
        >
          Bookmarks
        </Link>
        {/* input */}
        <div className="headerSearchItem gap-x-4 ">
          <MapPinIcon className=" size-7 headerIcon locationIcon " />
          <input
            onKeyDown={(e) => onHandleKeyRun(e)}
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            type="text"
            placeholder="where to go?"
            className="font-medium w-44  headerSearchInput ring-gray-300 focus:bg-slate-100 ring-[1px] rounded-lg "
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
        {/* login button */}
        <User />
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

function User() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="">
      {isAuthenticated ? (
        <div className=" flex gap-x-3 items-center justify-center ">
          <span className=" font-medium  ">{user.name}</span>
          <button
            onClick={handleLogout}
            className=" text-[17px] cursor-pointer text-indigo-600 font-bold  "
          >
            Logout
          </button>
        </div>
      ) : (
        <NavLink
          className={"text-[17px] cursor-pointer font-bold  "}
          to="/login"
        >
          {" "}
          Login{" "}
        </NavLink>
      )}
    </div>
  );
}
