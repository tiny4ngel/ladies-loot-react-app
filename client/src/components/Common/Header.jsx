export default function Header() {
    return (
      <div>
        <div className="navbar">
          <img src="images/logo.png" alt="LadiesLoot Logo" className="logo" />
          <nav>
            <a href="/">Home</a>
            <a href="/products">Products</a>
            <a href="#">Community</a>
            <a href="#">Support</a>
            <a href="/register" className="register">Register</a>
            <a href="/login" className="login">Log In</a>
          </nav>
        </div>
        <div className="hero"></div>
        </div>
    );
  }
  