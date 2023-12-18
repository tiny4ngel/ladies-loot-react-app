import Path from "../../paths";
import { Link } from "react-router-dom";

import styles from './Footer.module.css';


export default function Footer(){
    return(
        <footer>
        <div className={styles.footerContent}>
            <div className="footer-nav">
                <Link to={Path.Home}>Ladies Loot - Fashion for Girl Gamers</Link>
            </div>
            <img src="images/pixel.png" alt="Pixel Heart" className={styles.footerHeart}/>
            <p>Project created for the SoftUni React.js Course, 2023</p>
        </div>
    </footer>
    );
}