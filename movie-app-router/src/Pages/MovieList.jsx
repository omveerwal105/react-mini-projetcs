import React from 'react'
import { movies } from '../data'
import {Link} from 'react-router-dom';

const MovieList = () => {
  return (
    <div>
        <h2>Movies List</h2>
        <ul>
        {movies.map((movie)=>(
            <li key={movie.id}>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default MovieList