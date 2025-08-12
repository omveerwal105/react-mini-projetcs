import React, { useState } from "react";

const List = () => {
  const products = [
    { id: 1, name: "Laptop", price: 65000 },
    { id: 2, name: "Smartphone", price: 35000 },
    { id: 3, name: "Headphones", price: 2000 },
    { id: 4, name: "Keyboard", price: 1500 },
    { id: 5, name: "Mouse", price: 800 },
    { id: 6, name: "Monitor", price: 12000 },
    { id: 7, name: "Smartwatch", price: 9000 },
    { id: 8, name: "Tablet", price: 22000 },
    { id: 9, name: "External Hard Drive", price: 5000 },
    { id: 10, name: "Webcam", price: 2500 },
  ];

  const [searchterm, setSearchTerm] = useState("");

  const filtered = products
  .filter((product) =>
    product.name.toLowerCase().includes(searchterm.toLowerCase().trim())
  )
  .sort((a,b)=>a.name.localeCompare(b.name));

  return (
    <div className="container p-2">
      <h2 className="text-center">Product List</h2>
      <input
        className="form-control mt-2 mx-auto w-50"
        placeholder="Search product name"
        value={searchterm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filtered.length === 0 ? (
        <p className="text-danger mt-3">No results found</p>
      ) : (
        filtered.map((product) => (
          <div className="card mx-auto mt-4" key={product.id}>
            <div className="card-header">
              <h4 className="card-title">{product.name}</h4>
            </div>
            <div className="card-body">
              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default List;
