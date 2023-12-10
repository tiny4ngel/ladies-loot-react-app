export default function Footer(){
    return(
        <footer>
        <div className="footer-content">
            <div className="footer-nav">
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Community</a>
                <a href="#">Support</a>
            </div>
            <img src="images/pixel.png" alt="Pixel Heart" className="footer-heart"/>
            <p>Project created for the SoftUni React.js Course, 2023</p>
        </div>
    </footer>
    );
}