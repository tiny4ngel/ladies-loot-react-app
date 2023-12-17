import Path from "../../paths";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <footer>
        <div className="footer-content">
            <div className="footer-nav">
                <Link to={Path.Home}>Ladies Loot - Fashion for Girl Gamers</Link>
            </div>
            <img src="images/pixel.png" alt="Pixel Heart" className="footer-heart"/>
            <p>Project created for the SoftUni React.js Course, 2023</p>
        </div>
    </footer>
    );
}