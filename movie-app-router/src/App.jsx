import React from 'react'
import {Routes ,Route , Link} from 'react-router-dom'
import { lazy } from 'react'
import { Suspense } from 'react';

const MovieList = lazy(()=>import('./Pages/MovieList'));
const MovieDetail = lazy(()=>import('./Pages/MovieDetail'));

const App = () => {
  return (
    <div>
      <nav style={{ marginBottom: '20px' }}>
        <Link to='/'>Home</Link>{" | "}
        <Link to='/movies'>Movies</Link>
      </nav>
      <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path = '/' element = {<h2>Welcome to the Movie App</h2>} />
        <Route path='/movies'element={<MovieList />} />
        <Route path='/movie/:id'element={<MovieDetail />} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App