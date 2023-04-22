import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

import { addToFirebase } from "../helpers/firebaseHelpers";

const SignUp = () => {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const AddUser = async () => {
    let result = await addToFirebase({ objectToSave: { username, email, password } }, "Usuarios");
    if (result) {
      alert("Usuario agregado");
      return navigate("/"	)
    } else {
      alert("Error al agregar usuario");
      return navigate("/SignUp"	)
    }

  };

  const handleSubmit = (e) => {
    AddUser();
    e.preventDefault();
  };

  const handleusername = (e) => {
    const theusername = e.target.value;

    if (theusername.length > 15) {
      e.target.value = theusername.slice(0, 15);
    }

    setusername(e.target.value);
    console.log(username);
  };

  const handleEmail = (e) => {
    const theEmail = e.target.value;
    console.log(theEmail);
    //validate email using regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const isValidEmail = emailRegex.test(theEmail);
    setEmail(isValidEmail ? theEmail : "no");
    console.log(email);
  };

  const handlePassword = (e) => {
    const thePassword = e.target.value;

    if (thePassword.length > 15) {
      e.target.value = thePassword.slice(0, 15);
    }

    setPassword(e.target.value);
  };

  return (
    <>
      <div classusername="App-header">
        <h1>Blog Movies</h1>
      </div>
      <Navbar />
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          username="username"
          id="username"
          onChange={(e) => handleusername(e)}
        />
        {username != "" && (
          <>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              username="email"
              id="email"
              onChange={(e) => handleEmail(e)}
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              username="password"
              id="password"
              onChange={(e) => handlePassword(e)}
            />
          </>
        )}
        <button disabled={!email}>Sign Up</button>
      </form>
    </>
  );
};
export default SignUp;
