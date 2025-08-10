// Product.jsx
import React, { useState } from 'react';
import Card from './Card';

const Product = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: 2999,
      description: "High-quality wireless headphones with noise cancellation.",
      category: "Audio"
    },
    {
      id: 2,
      name: "Smartwatch",
      price: 4999,
      description: "Track your fitness, heart rate, and notifications on the go.",
      category: "Wearable"
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      price: 1999,
      description: "Portable speaker with deep bass and long battery life.",
      category: "Audio"
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: 1499,
      description: "Ergonomic mouse with programmable buttons and RGB lighting.",
      category: "Electronics"
    }
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter products
  const filteredProducts = products.filter(prod => {
    const matchesSearch = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Audio">Audio</option>
            <option value="Wearable">Wearable</option>
          </select>
        </div>
      </div>

      {/* Product Cards */}
      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((prod) => (
            <div className="col-md-4 mb-4" key={prod.id}>
              <Card product={prod} />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default Product;
