import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./BlogPost.css";
import {addToFirebase} from "./helpers/firebaseHelpers";

function BlogPost() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(useParams().id);

  const apiUrl = "https://imdb-top-100-movies.p.rapidapi.com/" + id;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "16d2fa413cmsh7db5d849e7c2e68p15b1fejsn8411e545c505",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };



  useEffect(() => {
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          setData(result);
          setIsLoading(false);
        },
        (error) => {
          setError(error);
          setIsLoading(false);
        }
      );
  }, [isLoading]);

  console.log(data);

  const addFavorite = async () => {
    addToFirebase(
      { objectToSave: {id}},
      "Favoritos"
    );
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <div className="App-header">
          <h1>Blog Movies</h1>
        </div>
        <Navbar />
        <div className="movies-cont">
          <div className="movie-card" id={data.id}>
            <figure>
              <img src={data.image} alt={data.title} />
            </figure>
            <div className="movie-info">
              <h2>{data.title}</h2>
              <span>{data.year}</span>
              <h3>Overview:</h3>
              <p>{data.description}</p>
            </div>
          </div>
          <button onClick={() => addFavorite()}>Add Favorite</button>
        </div>
      </>
    );
  }
}

export default BlogPost;
