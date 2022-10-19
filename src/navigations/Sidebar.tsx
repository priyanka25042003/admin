import { BrowserRouter, Route, Routes, Link, Outlet } from "react-router-dom";
import Bus from "../component/Bus";
import Flight from "../component/Flight";
import Home from "../component/Home";
import Hotel from "../component/Hotel";
import Navbar from "./Navbar";
import "./sidebar.css";


function Sidebar(porps: any) {
  console.log("props", porps.show);

  return (
    <>
      {porps.show ? (
        <div className="sidebar">
          <Link className="active" to="/">
            Home
          </Link>
          <Link to="flight">Flight</Link>
          <Link to="hotel">Hotel</Link>
          <Link to="bus">Bus</Link>
        </div>
      ) : ("")
      }
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

export default Sidebar;
