import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./helpers/authHelpers";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Navbar.css";

function Navbar() {
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="navMenu">
      <Link to={"/"} className="navLink">
        Home
      </Link>|
      <Link to={"/BlogLists"} className="navLink">
        BlogList
      </Link>|
      {user ? (
        <>
          <Link to={"/MyFavorite"} className="navLink">
            Quiero Ver
          </Link>|
          <Link to={"/"} className="navLink" onClick={logout}>
            Logout
          </Link>
        </>
      ) : (
        <Link to={"/LogIn"} className="navLink">
          LogIn
        </Link>
      )}
      <div className="dot"></div>
    </div>
  );
}

export default Navbar;
