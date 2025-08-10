// Button.jsx
import React from "react";
import PropTypes from "prop-types";

const Button = ({ variant = "primary", size = "md", onClick, children }) => {
  // Map size prop to Bootstrap's size classes
  const sizeClass = {
    sm: "btn-sm",
    md: "", // Default size in Bootstrap
    lg: "btn-lg",
  }[size];

  return (
    <button
      className={`btn btn-${variant} ${sizeClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

// Prop type validation
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Button;
