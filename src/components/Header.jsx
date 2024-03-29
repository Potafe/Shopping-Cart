import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      <nav>
        <ul>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/store">Store</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact Us</NavLink>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
