import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './redux-dem/slices/counterSlice';
import { toggle_Theme } from './redux-dem/slices/themeSlice';
import { fetchGitHubUser } from './redux-dem/slices/githubSlice';

const App = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.counter.count);
  const theme = useSelector((state) => state.theme.darkMode);
  const { user, loading, error } = useSelector((state) => state.github);

  const [username, setUsername] = useState('');
  const [step, setStep] = useState(1);

  
  // useEffect(() => {
  //   if (username.trim()) {
  //     dispatch(fetchGitHubUser(username.trim()));
  //   }
  // }, [dispatch]); 

  const handleStep = (e) => {
    const val = Number(e.target.value);
    setStep(Number.isNaN(val) || val <= 0 ? 1 : val);
  };

  const handleFetchUser = () => {
    if (username.trim()) {
      dispatch(fetchGitHubUser(username.trim()));
    }
  };

  const handleUsernameKey = (e) => {
    if (e.key === 'Enter') {
      handleFetchUser();
    }
  };

  return (
    <div
      className={`container mt-2 min-vh-100 ${
        theme ? 'bg-dark text-light' : 'bg-light text-dark'
      }`}
    >
      <button
        className="btn btn-sm btn-outline-secondary me-1 mt-1"
        onClick={() => dispatch(toggle_Theme())}
      >
        Switch to {theme ? 'light' : 'dark'} Mode
      </button>

      <h2 className="text-center mt-2">Counter: {count}</h2>

      <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
        <input
          type="number"
          className="form-control w-25"
          value={step}
          onChange={handleStep}
          placeholder="enter the value"
          min={1}
        />
        <button
          className="btn btn-success"
          onClick={() => dispatch(increment(step))}
          disabled={step <= 0}
        >
          {step}++
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(decrement(step))}
          disabled={step <= 0}
        >
          {step}--
        </button>
      </div>

      <div className="mt-4 h-50">
        <h2 className="text-center">GitHub User</h2>
        <div className="d-flex justify-content-center gap-2 mb-2">
          <input
            className="form-control w-25"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleUsernameKey}
            placeholder="enter the GitHub username"
          />
          <button className="btn btn-primary" onClick={handleFetchUser}>
            Fetch
          </button>
        </div>

        {loading && (
          <div className="d-flex justify-content-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}
        {error && <p className="text-danger text-center">{error}</p>}
        {user && (
          <div className="d-flex flex-column align-items-center gap-3 mt-3">
            <img
              src={user.avatar_url}
              alt={`${user.login} avatar`}
              width={200}
              height={200}
              style={{ borderRadius: '50%' }}
            />
            <div>
              <p className="mb-1">
                <strong>Username:</strong> {user.login}
              </p>
              <p className="mb-0">
                <strong>Bio:</strong> {user.bio || 'N/A'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
