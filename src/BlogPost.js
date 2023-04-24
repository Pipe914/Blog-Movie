import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import "./BlogPost.css";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addToFirebase, queryFromFirebase } from "./helpers/firebaseHelpers";
import Header from "./components/Header";

function BlogPost() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [id, setId] = useState(useParams().id);
  const [user, loading, errorAuth] = useAuthState(auth);

  const apiUrl = "https://imdb-top-100-movies.p.rapidapi.com/" + id;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_API_KEY,
      "X-RapidAPI-Host": process.env.REACT_APP_API_HOST,
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
      {
        objectToSave: {
          uid: user.uid,
          mid: id,
          title: data.title,
        },
      },
      "Favoritos"
    );
    alert("Agregado a favoritos");
  };

  const verifyFavorites = async () => {
    let exists = false;
    const docs = await queryFromFirebase("Favoritos", {
      dataQuery: {
        field: "uid",
        operator: "==",
        value: user.uid,
      },
    });

    if (docs === null) {
      addFavorite();
      return;
    } else if (docs.length > 0) {
      docs.map((doc) => {
        if (doc.data.mid === id) {
          alert("Ya esta en favoritos");
          exists = true;
          return;
        }
      });
    }
    if (!exists) {
      addFavorite();
    }
  };

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <Header />
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
            <button className="buttonAdd" onClick={() => verifyFavorites()}>
              Add Favorite
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default BlogPost;
