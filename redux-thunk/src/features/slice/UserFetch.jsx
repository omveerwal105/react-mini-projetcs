import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGitHubUser } from './userSlice';

const UserFetch = () => {
    const { loading, error, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');

    const handleKey = (e) => {
        if (e.key === 'Enter') {
            handleFetch();
        }
    };

    const handleFetch = () => {
        if (!username.trim()) return;
        dispatch(fetchGitHubUser(username.trim()));
        setUsername('');
    }
    return (
       <div className="container mt-4">
      <div className="d-flex justify-content-center mb-3">
        <input
          className="form-control w-25"
          placeholder="Enter the username"
          value={username}
          onChange={(e) => setUsername(e.currentTarget.value)}
          onKeyDown={handleKey}
          disabled={loading}
        />
        <button
          className="btn btn-primary ms-2"
          onClick={handleFetch}
          disabled={loading || !username.trim()}
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <div className="alert alert-danger w-50 mx-auto" role="alert">
          Error: {error}
        </div>
      )}

      {user && (
        <div className="card w-50 mx-auto">
          <div className="text-center mt-3">
            <img
              src={user.avatar_url}
              width={100}
              alt="avatar"
              className="rounded-circle"
            />
          </div>
          <div className="card-header text-center">
            <h4 className="card-title mb-0">
              <strong>Name:</strong> {user.name || user.login}
            </h4>
          </div>
          <div className="card-body">
            <p>
              <strong>Repos:</strong> {user.public_repos}
            </p>
            <p>
              <strong>Followers:</strong> {user.followers}
            </p>
            <p>
              <strong>Following:</strong> {user.following}
            </p>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-secondary"
            >
              View Profile
            </a>
          </div>
        </div>
      )}
    </div>
    )
}

export default UserFetch