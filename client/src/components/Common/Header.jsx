import { useContext, useState } from "react";
import AuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Path from "../../paths";


export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <div className="navbar">
        <img src="images/logo.png" alt="LadiesLoot Logo" className="logo" />
        <span className="hamburger-icon" onClick={toggleMenu}>☰</span>
        <nav className={isMenuOpen ? "active" : ""}>
          <Link to={Path.Home} onClick={closeMenu}>Home</Link>
          <Link to={Path.Products} onClick={closeMenu}>Products</Link>
          {isAuthenticated && (
            <>
              <Link to={Path.Account} onClick={closeMenu}>Account</Link>
              <Link to={Path.Wishlist} onClick={closeMenu}>Wishlist</Link>
              <Link to={Path.Logout} onClick={closeMenu}>Logout</Link>
              <Link to={Path.Cart} onClick={closeMenu}><FontAwesomeIcon icon={faShoppingCart} /></Link>
            </>
          )}
          {!isAuthenticated && (
            <>
              <Link className="register" to={Path.Register} onClick={closeMenu}>Register</Link>
              <Link className="login" to={Path.Login} onClick={closeMenu}>Log In</Link>
            </>
          )}
        </nav>
      </div>
      <div className="hero"></div>
    </div>
  );
}
