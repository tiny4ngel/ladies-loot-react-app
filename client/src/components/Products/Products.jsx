import { useEffect, useState } from 'react';
import '../../../public/styles/products.css'


const Products = () => {
  const [productsList, setProductsList] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3030/data/peripherals');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsList(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  const productItems = [
    { imageSrc: 'images/keyboard-main.png', altText: 'Peripherals', buttonText: 'PERIPHERALS' },
    { imageSrc: 'images/chair-main.png', altText: 'Furniture', buttonText: 'FURNITURE' },
    { imageSrc: 'images/accessori-main.png', altText: 'Accessories', buttonText: 'ACCESSORIES' },
    { imageSrc: 'images/gadget-main.png', altText: 'Tech Gadgets', buttonText: 'TECH GADGETS' },
  ];



  return (
    <div className="products" style={{ marginTop: '150px' }}>
      {productItems.map((item, index) => (
        <div className="product-item" key={index}>
          <div className="image-container">
            <img src={item.imageSrc} alt={item.altText} />
          </div>
          <button>{item.buttonText}</button>
        </div>
      ))}

      <div className="search-container">
        <input type="text" placeholder="Search Product" className="search-input" />
        <button className="search-button">🔍</button>
      </div>

      <div className="products-container">
        {productsList.map((product, index) => (
          <div className="item" key={index}>
            <div className="product-image-container">
              <img src={product.imgPath} alt={product.altText} />
            </div>
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <p className="product-price">{product.price}</p>
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