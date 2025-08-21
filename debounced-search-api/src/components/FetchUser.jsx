// FetchUser.jsx
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import List from "./List";

const FetchUser = () => {
  const [userName, setUserName] = useState("");
  const [debounced, setDebounced] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const cache = useRef({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(userName);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [userName]);

  useEffect(() => {
    if (!debounced) {
      setItems([]);
      return;
    }

    const fetchUsers = async () => {
      const key = `${debounced}_${page}`;
      if (cache.current[key]) {
        if (page === 1) {
          setItems(cache.current[key]);
        } else {
          setItems((prev) => [...prev, ...cache.current[key]]);
        }
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=${encodeURIComponent(
            debounced
          )}&per_page=10&page=${page}`
        );
        const data = await res.json();

        const newItems = data.items || [];
        cache.current[key] = newItems;

        if (page === 1) {
          
          setItems(newItems);
        } else {
          setItems((prev) => [...prev, ...newItems]);
        }
        setTotal(data.total_count || 0);
      } catch (err) {
        console.error("Error while fetching", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debounced, page]);

  const handleChange = useCallback((e) => {
    setUserName(e.target.value);
  }, []);

  const hasMore = useMemo(() => {
    return items.length < total;
  }, [items, total]);

  return (
    <div className="container p-4 mt-2">
      <input
        className="form-control mx-auto w-50"
        placeholder="Search GitHub users..."
        value={userName}
        onChange={handleChange}
      />

      {loading && (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      )}

      {!loading && items.length === 0 && debounced && (
        <p className="text-center mt-3">No users found.</p>
      )}

      {items.map((item) => (
        <List key={item.id} item={item} />
      ))}

      {hasMore && !loading && (
        <div className="text-center mt-3">
          <button
            className="btn btn-primary"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default FetchUser;
