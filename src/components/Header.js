import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { queryFromFirebase } from "../helpers/firebaseHelpers";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const r = await queryFromFirebase("Usuarios", {
        dataQuery: {
          field: "uid",
          operator: "==",
          value: user.uid,
        },
      });
      if (r.length > 0) {
        setName(r[0].data.name);
      } else if (r.length === 0) {
        console.log("No se encontró el usuario");
      }
    } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (user) fetchUserName();
  }, [user, loading]);

  return (
    <div className="App-header">
      <h1>Blog Movies {user ? name : ""} </h1>
    </div>
  );
}
export default Header;
