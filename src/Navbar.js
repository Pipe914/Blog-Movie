import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navMenu">
      <Link to={"/"} className="navLink">Home</Link>
      <Link to={"/BlogLists"} className="navLink">BlogList</Link>
      <Link to={"/MyFavorites"} className="navLink">My Favorites</Link>
      <div className="dot"></div>
    </div>
  );
}

export default Navbar;