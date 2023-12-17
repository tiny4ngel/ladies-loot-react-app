import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Path from "../../paths";


export default function Header() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div>
      <div className="navbar">
        <img src="images/logo.png" alt="LadiesLoot Logo" className="logo" />
        <nav>
          <Link to={Path.Home}>Home</Link>
          <Link to={Path.Products}>Products</Link>
          {isAuthenticated && (
            <>
              <Link to={Path.Account}>Account</Link>
              <Link to={Path.Wishlist}>Wishlist</Link>
              <Link to={Path.Logout}>Logout</Link>
              <Link to={Path.Cart}><FontAwesomeIcon icon={faShoppingCart} /></Link>

            </>
          )}
          {!isAuthenticated && (
            <>
              <Link className="register" to={Path.Register}>Register</Link>
              <Link className="login" to={Path.Login}>Log In</Link>
            </>
          )}

        </nav>
      </div>
      <div className="hero"></div>
    </div>
  );
}
