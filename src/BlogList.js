import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./BlogList.css";
import { Link } from "react-router-dom";
import Header from "./components/Header";

function BlogList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiUrl = "https://imdb-top-100-movies.p.rapidapi.com/";
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

  if (isLoading) {
    return <p>Cargando...</p>;
  } else {
    return (
      <>
        <Header />
        <Navbar />
        <div className="movies-cont">
          {data.map((movie) => (
            <div className="movie-warpper">
              <Link to={`/BlogPost/${movie.id}`} className="link">
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
                </div>
              </Link>
            </div>
          ))}
        </div>
      </>
    );
  }
}

export default BlogList;
