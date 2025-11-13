import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2>myLibrary</h2>
      <div>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/items">Books</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </nav>
  );
}
