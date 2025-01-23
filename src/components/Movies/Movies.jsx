import React, { useContext, useEffect, useState } from 'react'
import { StoreContextUsePopcorn } from '../../App';


const key = "f84fc31d"
const Movies = () => {

  const { stateMovie, dispatchMovie } = useContext(StoreContextUsePopcorn);
  const [isOpen1, setIsOpen1] = useState(true);

  const fetchData = async () => {
    try {
      dispatchMovie({type: "change", propertId:"isLoading", value:true});
      dispatchMovie({type: "change", propertId:"error", value:""});

      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${stateMovie.query}`);
      if(!res.ok) throw Error("Something went wrong with fetching movies")

      const data = await res.json();
      if(data.Response === "False") throw Error("Movie not found")

      dispatchMovie({type: "change", propertId:"movies", value:data.Search});  
      dispatchMovie({type: "change", propertId:"error", value:""});
    } catch (err) {
      if (err.name !== "AbortError"){
        dispatchMovie({type: "change", propertId:"error", value:err.message});
      }
    } finally {
      dispatchMovie({type: "change", propertId:"isLoading", value:false});
    }

  }

  useEffect(() => {
    fetchData()
  },[stateMovie.query])


  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {stateMovie.movies?.map((movie) => (
                <li key={movie.imdbID}>
                  <img src={movie.Poster} alt={`${movie.Title} poster`} />
                  <h3>{movie.Title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{movie.Year}</span>
                    </p>
                  </div>
                </li>
              ))}
              {stateMovie.isLoading && <p className="loader">Loading...</p>}
            </ul>
          )}
        </div>
  )
}

export default Movies
