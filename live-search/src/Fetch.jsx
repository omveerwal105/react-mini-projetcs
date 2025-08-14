import React, { useCallback, useEffect, useState } from "react";

const Fetch = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (!debounced) {
      setProducts([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${debounced}`
        );
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debounced]);

  // Highlight Function
const highlightText = useCallback((text, highlight) => {
  if (!highlight) return text;

  const escapeRegExp = (string) =>
    string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const regex = new RegExp(`(${escapeRegExp(highlight)})`, "gi");

  return text.split(regex).map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <span key={index} style={{ backgroundColor: "yellow" }}>
        {part}
      </span>
    ) : (
      part
    )
  );
}, []);
   

  return (
    <div className="container p-4">
      <h4 className="text-center">Live Product Search</h4>
      <div className="d-flex justify-content-center">
        <input
          className="form-control w-50"
          aria-label="Product search"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && (
        <div className="d-flex justify-content-center mt-3">
          <div
            className="spinner-border text-info"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center mt-3">{error}</div>
      )}

      {!loading && !error && products.length === 0 && debounced && (
        <p className="fw-bold text-center mt-3">No results found</p>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="mt-3">
          {products.map((product) => (
            <div className="card mx-auto w-75 mb-2" key={product.id}>
              <div className="card-header">
                <h5 className="card-title">
                  {highlightText(product.title, debounced)}
                </h5>
              </div>
              <div className="card-body">
                <p>{highlightText(product.description, debounced)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Fetch;
