import { useContext } from "react";
import { TaskContext } from "./TaskContext";

export default function Filter() {
  const { state, dispatch } = useContext(TaskContext);
  const filters = ["ALL", "ACTIVE", "COMPLETED"];

  return (
    <div className="container mt-3">
      <div className="btn-group">
        {filters.map((f) => (
          <button
            key={f}
            className={`btn btn-sm ${
              state.filter === f ? "btn-info" : "btn-outline-info"
            }`}
            onClick={() => dispatch({ type: "SET_FILTER", payload: f })}
          >
            {f}
          </button>
        ))}
      </div>
    </div>
  );
}
