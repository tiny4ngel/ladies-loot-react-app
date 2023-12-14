import { useContext } from "react";
import AuthContext from "../../contexts/authContext";
import { Link } from "react-router-dom";

export default function Header() {
  const {
    isAuthenticated,
    username,
  } = useContext(AuthContext);

  return (
    <div>
      <div className="navbar">
        <img src="images/logo.png" alt="LadiesLoot Logo" className="logo" />
        <nav>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          {isAuthenticated &&(
            <>
            <Link to="/account">Account</Link>
            <Link to="/wishlist">Wishlist</Link>
            <Link to="/logout">Logout</Link>
            </>
          )}
          {!isAuthenticated &&(
            <>
            <Link className="register" to="/register">Register</Link>
            <Link className="login" to="/login">Log In</Link>
            </>
          )}
          
        </nav>
      </div>
      <div className="hero"></div>
    </div>
  );
}
