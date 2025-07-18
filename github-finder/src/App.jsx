import React, { useState } from 'react'
import useFetch from './Custom-Hooks/useFetch'
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';

const App = () => {
  const [username, setUsername] = useState('');
  const { data: profile, loading, notFound } = useFetch(
    username ? `https://api.github.com/users/${username}` : null
  );

  return (
    <div className='container py-5'>
      <h1 className='text-center text-primary'>GitHub Finder</h1>

      <SearchBar onSearch={setUsername} />

      {loading && (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {notFound && <p className='text-danger text-center'>User Not Found</p>}

      {!loading && profile && <ProfileCard profile={profile} />}
    </div>
  );
};

export default App;
