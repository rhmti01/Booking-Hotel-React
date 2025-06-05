import { Outlet } from "react-router-dom";
import MapContent from "../Map/Map";

function AppLayout() {
  return (
    <div className=" appLayout  ">
      <div className="sidebar ">
        <Outlet/>
      </div>
      <MapContent/>
    </div>
  );
}

export default AppLayout;
