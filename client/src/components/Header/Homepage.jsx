export default function Homepage(){
    return(
        <header>
        <div className="navbar">
            <img src="images/logo.png" alt="LadiesLoot Logo" className="logo"/>
            <nav>
                <a href="#">Home</a>
                <a href="#">Products</a>
                <a href="#">Community</a>
                <a href="#">Support</a>
                <a href="#" className="register">Register</a>
                <a href="#" className="login">Log In</a>
            </nav>
        </div>
        <div className="hero">
        <div className="hero-text">
            <img src="images/pixel.png" alt="pixel heart" className="pixel" />
            <h1 className="hero-title">LADIES LOOT</h1>
            <h3>Empower Your Play: Fashion & Gear for Girl Gamers</h3>
            <p>Dive into the world of LadiesLoot,
                 where gaming and style collide! 
                 We celebrate the fierce and fabulous girl gamer in you. 
                 From trendy gaming gear to chic accessories, 
                 we've got everything to level up your gaming
                  experience with a touch of glamour.</p>
            <button className="main-button">Browse</button>
        </div>
        <img src="images/hero.png" alt="Gamer Girl" className="character-image" />
    </div>

    </header>
    );
}