// Card.jsx
import React from "react";
import PropTypes from "prop-types";
import Button from "./Button";

const Card = ({ product }) => {
  return (
    <div className="card h-100">
      <div className="card-header d-flex justify-content-between">
        <span>{product.name}</span>
        <span>₹ {product.price}</span>
      </div>
      <div className="card-body">
        <p>{product.description}</p>
        <small className="text-muted">Category: {product.category}</small>
      </div>
      <div className="card-footer">
        <Button
          variant="primary"
          size="sm"
          onClick={() => alert(`You bought ${product.name}`)}
        >
          Buy Now
        </Button>
      </div>
    </div>
  );
};

Card.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    category: PropTypes.string
  }).isRequired,
};

export default Card;
