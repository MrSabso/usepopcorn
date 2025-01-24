import React, { useContext, useEffect, useState } from 'react'
import { StoreContextUsePopcorn } from '../../App';
import { Rating } from '@mui/material';
import useKey from '../../useKey';

const key = "f84fc31d"

const Details = ({  }) => {

  const { stateMovie, dispatchMovie } = useContext(StoreContextUsePopcorn);
  const [ rating, setRating ] = useState(5);
  const [ isWatched, setIsWatched ] = useState(false);

  
  const getMovieDetail = async () => {
    try {
      dispatchMovie({type: "change", propertId:"isLoading", value:true});
      dispatchMovie({type: "change", propertId:"error", value:""});
      

      const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${stateMovie.movieId}`);
      if(!res.ok) throw Error("Something went wrong with fetching movie detail")

      const data = await res.json();

      dispatchMovie({type: "change", propertId:"movie", value:data});  
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
    getMovieDetail()
  },[stateMovie.movieId]);

  useKey("Escape", () => dispatchMovie({type: "change", propertId:"movieId", value:""}));

  const addHandler = () => {
    const {
      imdbID,
      Title,
      Year,
      Poster,
      Runtime: runtime,
      imdbRating,
      userRating: rating,
    } = stateMovie.movie;
    dispatchMovie({type: "add", value: { imdbID, Title, Year, Poster, runtime, imdbRating, rating }});
    setIsWatched(stateMovie.watchedMovies.some(movie => movie.imdbID === stateMovie.movie.imdbID));
  }

  return (
    <div className='details'>
      <header>
        <button className='btn-back' onClick={() => dispatchMovie({type: "change", propertId:"movieId", value:""})}>
          &larr;
        </button>
        <img src={stateMovie.movie.Poster} alt="#" />
        <div className='details-overview'>
          <h2>{stateMovie.movie.Title}</h2>
          <p>
            {stateMovie.movie.Released} &bull; {stateMovie.movie.Runtime}
          </p>
          <p>
            {stateMovie.movie.Genre}
          </p>
        </div>
      </header>
      <section>
        <div className='rating'>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <Rating name="rating" defaultValue={5} max={10} onChange={(event, newValue) => setRating(newValue)} />
              {rating}
          </div>
          {
            !isWatched &&
          <button className='btn-add' onClick={() => addHandler()}>
            + Add to list
          </button>
          }
         
        </div>
        <p>
          <em>{stateMovie.movie.Plot}</em>
        </p>
        <p>
          <strong> Actors:</strong>  {stateMovie.movie.Actors}
        </p>
        <p>
          <strong>Director:</strong> {stateMovie.movie.Director}
        </p>

      </section>      
    </div>
  )
}

export default Details
