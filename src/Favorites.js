import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { queryFromFirebase, deleteFromFirebase } from "./helpers/firebaseHelpers";
import Header from "./components/Header";

function Favorites() {
  const [data, setData] = useState(null);
  const [favorites, setFavorites] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [user, loading, errorAuth] = useAuthState(auth);

  const apiUrl = "https://imdb-top-100-movies.p.rapidapi.com/";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "16d2fa413cmsh7db5d849e7c2e68p15b1fejsn8411e545c505",
      "X-RapidAPI-Host": "imdb-top-100-movies.p.rapidapi.com",
    },
  };

  const getFavoritos = async () => {
    const docs = await queryFromFirebase("Favoritos", {
      dataQuery: {
        field: "uid",
        operator: "==",
        value: user.uid,
      },
    });
    setFavorites(docs);
  };

  const deleteFavorite = async (id) => {
    favorites.map((favorite) => {
      if (favorite.data.mid === id) {
        deleteFromFirebase("Favoritos", favorite.id);
      }
    });

    setIsLoading(true);
  };

  useEffect(() => {
    getFavoritos();
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
    console.log("muchas cosas");
  }, [isLoading]);

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    if (favorites === null) {
      return (
        <>
          <Header />
          <Navbar />
          <div className="movies-cont">
            <p>No tienes favoritos</p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Header />
          <Navbar />
          <div className="movies-cont">
            {data.map((movie) =>
              favorites.map((favorite) =>
                favorite.data.mid === movie.id ? (
                  <div className="movie-warpper">
                    <div className="movie-card" id={movie.id}>
                      <figure>
                        <img src={movie.image} alt={movie.title} />
                      </figure>
                      <div className="movie-info">
                        <h2>{movie.title}</h2>
                        <span>{movie.year}</span>
                        <h3>Overview:</h3>
                        <p>{movie.description}</p>
                      </div>
                    <button className="buttonNotAdd" onClick={() => deleteFavorite(movie.id)}>
                      Eliminar
                    </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              )
            )}
          </div>
        </>
      );
    }
  }
}

export default Favorites;
