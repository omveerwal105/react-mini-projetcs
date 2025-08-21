
import React from "react";

const List = React.memo(({ item }) => {
  return (
    <div className="card shadow-sm mx-auto w-75 mt-3">
      <div className="card-img-top text-center mt-2">
        <img
          src={item.avatar_url}
          alt={item.login}
          style={{ height: "150px", width: "150px", borderRadius: "50%" }}
        />
      </div>
      <div className="card-body text-center">
        <h5>{item.login}</h5>
        <a
          href={item.html_url}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-outline-primary mt-2"
        >
          View Profile
        </a>
      </div>
    </div>
  );
});

export default List;
