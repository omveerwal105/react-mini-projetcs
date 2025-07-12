import React from 'react'
import { movies } from '../data'
import {useParams, useNavigate} from 'react-router-dom'

const MovieDetail = () => {
    const {id} = useParams(); 
    const navigate = useNavigate();

    const movie = movies.find((movie)=>movie.id === parseInt(id));

    if(!movie){
         return <p>Movie not found!</p>;
    }


  return (
    <div>
        <h2>Movie Details</h2>
        <h4>{movie.title}</h4>
        <p>{movie.description}</p>
        <button onClick={()=>navigate(-1)}>Go Back</button>
    </div>
  )
}

export default MovieDetail