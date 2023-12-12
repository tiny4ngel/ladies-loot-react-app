import { useEffect, useState } from 'react';
import '../../../public/styles/products.css'


const Products = () => {
  const [productsList, setProductsList] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        const response = await fetch(`http://localhost:3030/data/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsList(prev => ({ ...prev, [category]: data }));
      } catch (error) {
        console.error(`Error fetching ${category} products:`, error);
      }
    };

    const categories = ['peripherals', 'furniture', 'accessories', 'tech'];
    categories.forEach(category => fetchProducts(category));
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const productItems = [
    { category: 'peripherals', buttonText: 'PERIPHERALS', imageSrc: 'images/keyboard-main.png' },
    { category: 'furniture', buttonText: 'FURNITURE',  imageSrc: 'images/chair-main.png' },
    { category: 'accessories', buttonText: 'ACCESSORIES', imageSrc: 'images/accessori-main.png' },
    { category: 'tech', buttonText: 'TECH GADGETS',  imageSrc: 'images/gadget-main.png' },
  ];

  const displayProducts = activeCategory === 'all'
    ? Object.values(productsList).flat()
    : productsList[activeCategory];


  return (
    <div className="products" style={{ marginTop: '150px' }}>
      {productItems.map((item, index) => (
        <div className="product-item" key={index}>
          <div className="image-container">
            <img src={item.imageSrc} alt={item.altText} />
          </div>
          <button onClick={() => handleCategoryClick(item.category)}>
            {item.buttonText}
          </button>
        </div>
      ))}

      <div className="search-container">
        <input type="text" placeholder="Search Product" className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      <div className="products-container">
      {displayProducts && displayProducts.map((product, index) => (
          <div className="item" key={index}>
            <div className="product-image-container">
              <img src={product.imgPath} alt={product.altText} />
            </div>
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <p className="product-price">{product.price}$</p>
              <div className="product-actions">
                <button className="wishlist-btn">♥</button>
                <button className="cart-btn">🛒</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;