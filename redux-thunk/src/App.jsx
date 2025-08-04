import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/actions';

const App = () => {
  const { loading, users, error } = useSelector((state) => state.user);


  const dispatch = useDispatch();

  const handleFetch = () => {
    if (!loading) {
      dispatch(fetchUsers());
    }
  };

  return (
    <div className="container p-4">
      <h2 className="text-center fw-bold">Users List</h2>

      <div className="d-flex justify-content-center mb-3">
        <button
          className="btn btn-primary"
          onClick={handleFetch}
          disabled={loading}
        >
          {loading ? 'Fetching...' : 'Fetch'}
        </button>
      </div>

      {error && (
        <div className="text-danger warning mb-3">
          <p className="fw-bold">Failed to fetch: {error}</p>
        </div>
      )}

      {users && users.length > 0 ? (
        users.map((user) => (
          <div className="card w-75 mx-auto mb-2" key={user.id}>
            <div className="card-header">
              <h4 className="card-title mb-1">{user.name}</h4>
              <small className="text-muted">@{user.username}</small>
            </div>
            <div className="card-body">
              <p className="fw-bold mb-0">{user.email}</p>
            </div>
          </div>
        ))
      ) : (
        !loading && <p className="text-center">No users loaded.</p>
      )}
    </div>
  );
};

export default App;
