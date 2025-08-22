import React from "react";
import useFetch from "../customHooks/useFetch";

const Fetch = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) {
    return <div className="spinner-border text-primary"></div>;
  }

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User List</h2>
      {data &&
        data.map((user) => (
          <div className="card mb-2 shadow-sm" key={user.id}>
            <div className="card-body">
              <h5 className="card-title">{user.name}</h5>
              <p className="card-text">
                <strong>Email:</strong> {user.email} <br />
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Fetch;
