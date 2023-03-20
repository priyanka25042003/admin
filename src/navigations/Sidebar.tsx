import { BrowserRouter, Route, Routes, NavLink, Outlet,  } from "react-router-dom";
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
          <NavLink  className={({ isActive }) => (isActive ? 'active' : '')} to="home">
            Home
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="flight">Flight</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="hotel">Hotel</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="bus">Bus</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="package">Package</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="offers">Offers</NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'active' : '')} to="booking">Booking</NavLink>


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
