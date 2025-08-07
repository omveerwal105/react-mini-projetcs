import { createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartContext";


export default function Navbar() {
  const {productState} = useContext(CartContext);
  const totalCount = productState.product.reduce((sum, item) => sum + item.quantity, 0);

  return (
   <nav className="navbar navbar-dark bg-dark justify-content-between px-4">
  <Link className="navbar-brand" to="/">🛍️ Store</Link>
  <Link className="btn btn-outline-info" to="/cart">
    Cart ({totalCount})
  </Link>
</nav>

  );
}
