import { Link } from "react-router-dom";

const PageNotFound = () => (
    <div className="container empty-cart">
        <h1 className="hero-title">404 - Page not found</h1>
        <div>
            <Link to="/">Go to Home</Link>
        </div>
    </div>
);

export default PageNotFound;