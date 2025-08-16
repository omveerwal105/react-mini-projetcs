import React, { useContext, useState } from "react";
import useFetch from "../customHooks/useFetch";
import { ThemeContext } from "../context/ThemeContext";
import useDebounce from "../customHooks/useDebounce";
import useThrottle from "../customHooks/useThrottle";

const Users = () => {
  const [loading, error, data] = useFetch("https://dummyjson.com/users");

  const [searchTerm, setSearchTerm] = useState("");

  const [debounced] = useDebounce(searchTerm, 500);

  const { state, dispatch } = useContext(ThemeContext);

  useThrottle(() => {
    console.log("Scroll Position:", window.scrollY, " at ", Date.now());
  }, 500);

  const filtered = data.filter((user) => {
    const search = debounced.toLowerCase();

    return user.firstName.toLowerCase().includes(search);
  });

  return (
    <div
      className={`container p-4 ${
        state.isDark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
    >
      {/* Theme Switcher */}
      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="themeSwitch"
          checked={state.isDark}
          onChange={() => dispatch({ type: "TOGGLE" })}
        />
        <label className="form-check-label" htmlFor="themeSwitch">
          {state.isDark ? "Dark Mode" : "Light Mode"}
        </label>
      </div>

      <h3 className="text-center ">User's Details</h3>

      <input
        className="form-control w-50 mx-auto"
        placeholder="Search the name.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {loading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          <p>Error while fetching || {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 ? (
        <div className="text-center mt-2">
          <p className="fw-bold">Users Not Found</p>
        </div>
      ) : (
        filtered.map((user) => (
          <div className="card mx-auto mt-2 shadow-sm" key={user.id}>
            <div className="card-header">
              <h4 className="card-title">
                {user.firstName} {user.lastName}
              </h4>
              <small>{user.age}</small>
            </div>
            <div className="card-body">
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Users;
