import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/actions/userActions'; // ensure this path is correct

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="container p-2 mx-auto">
      <h2 className="text-center mb-4">Users List</h2>

      {loading && (
        <div className="text-center my-2">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          Error while fetching: {error}
        </div>
      )}

      {!loading && !error && users.length === 0 && (
        <div className="text-center">No users found.</div>
      )}

      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {users.map((user) => (
          <div className="card" key={user.id} style={{ width: '18rem' }}>
            <img
              src={user.avatar_url}
              className="card-img-top rounded-circle"
              alt={user.login}
              style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '16px auto 0' }}
            />
            <div className="card-body text-center">
              <h5 className="card-title">{user.login}</h5>
              <p className="card-text">
                <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                  View Profile
                </a>
              </p>
              <p className="card-text">
                Repos API: <code>{user.repos_url}</code>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
