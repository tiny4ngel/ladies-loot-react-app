export default function Home() {
    return(
        <div>
        <header>
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
        <section className="products-section">
        <div className="section-header">
            <h2>UNLEASH YOUR STYLE, CONQUER YOUR GAMES</h2>
            <img src="images/pixel.png" alt="Heart" className="heart-icon" />
            <p>Our carefully curated collection is designed to empower, inspire,
            and support the vibrant community of female gamers. Whether you're battling bosses
            or streaming your favorite games, do it with flair that's as bold and unique as you are.</p>
        </div>
        
        <h3>OUR PRODUCTS</h3>
        <img src="images/pixel.png" alt="Heart" className="heart-icon" />
        <div className="products">
            <div className="product-item">
                <div className="image-container">
                    <img src="images/keyboard-main.png" alt="Peripherals" />
                </div>
                <button>PERIPHERALS</button>
            </div>
            <div className="product-item">
                <div className="image-container">
                    <img src="images/chair-main.png" alt="Furniture" />
                </div>
                <button>FURNITURE</button>
            </div>
            <div className="product-item">
                <div className="image-container">
                    <img src="images/accessori-main.png" alt="Accessories" />
                </div>
                <button>ACCESSORIES</button>
            </div>
            <div className="product-item">
                <div className="image-container">
                    <img src="images/gadget-main.png" alt="Tech Gadgets" />
                </div>
                <button>TECH GADGETS</button>
            </div>
        </div>
    </section>
    </div>    
    );
}