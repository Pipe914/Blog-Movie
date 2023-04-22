import "./FavoriteView.css";
import React, { useState } from "react";

import { addToFirebase, getFromFirebase } from "../helpers/firebaseHelpers";

const FavoriteView = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addFavorite = async () => {
    addToFirebase(
      { objectToSave: { name, description } },
      "BasePrueba"
    );
  };



  const onNameChange = (e) => {
    if (e.target.value.length > 10) {
      alert(e.target.value + " is too long");
      setName(e.target.value.substring(0, 10));
    } else {
      setName(e.target.value);
    }
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div>
      <h1>Favorite View</h1>
      {/* generate 2 input fields   */}
      <input type="text" placeholder="Name" onChange={(e) => onNameChange(e)} />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => onDescriptionChange(e)}
      />
      <button onClick={() => addFavorite()}>Add Favorite</button>
      <button onClick={() => getData()}> Get Data</button>
    </div>
  );
};

export default FavoriteView;
