import { Link } from "react-router-dom";
import Path from '../../paths';


const PageNotFound = () => (
    <div className="container empty-cart">
        <h1 className="hero-title">404 - Page not found</h1>
        <div>
            <Link to={Path.Home}>Go to Home</Link>
        </div>
    </div>
);

export default PageNotFound;