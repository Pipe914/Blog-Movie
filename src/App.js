import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./Navbar";
import { auth } from "./firebase";
import { queryFromFirebase } from "./helpers/firebaseHelpers";
import { useAuthState } from "react-firebase-hooks/auth";
import Header from "./components/Header";

function App() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");

  const fetchUserName = async () => {
    try {
      const data = await queryFromFirebase("Usuarios", {
        dataQuery:{
          field: "uid",
          operator: "==",
          value: user.uid,
        },
      });
      console.log(data);
      setName(data[0].name);
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
    <div className="App">
      <Header />
      <Navbar />
    </div>
  );
}

export default App;
