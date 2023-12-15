import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import * as wishlistService from '../../services/wishlistService';
import * as cartService from '../../services/cartService';
import { Link } from 'react-router-dom';
import '../../../public/styles/products.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faInfoCircle } from '@fortawesome/free-solid-svg-icons';


const Products = () => {
  const [productsList, setProductsList] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchProducts = async (category) => {
      try {
        const response = await fetch(`http://localhost:3030/data/${category}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProductsList(prev => ({ ...prev, [category]: data.map(product => ({ ...product, category })) }));
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


  const handleAddToWishlist = async (productId, category) => {
    try {
      const product = findProductInList(productId);
      if (!product) {
        console.error('Product not found:', productId);
        return;
      }

      await wishlistService.addToWishlist(userId, product._id, category);
      console.log('Product added to wishlist', userId, product._id, category);
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
    }
  };

  const handleAddToCart = async (productId, category) => {
    try {
      const product = findProductInList(productId);
      if (!product) {
        console.error('Product not found:', productId);
        return;
      }

      await cartService.addToCart(userId, product._id, 1, category); // Include category here
      console.log('Product added to cart', userId, product._id);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };


  const findProductInList = (productId) => {
    const allProducts = Object.values(productsList).flat();
    return allProducts.find(product => product._id === productId);
  };

  const productItems = [
    { category: 'peripherals', buttonText: 'PERIPHERALS', imageSrc: 'images/keyboard-main.png' },
    { category: 'furniture', buttonText: 'FURNITURE', imageSrc: 'images/chair-main.png' },
    { category: 'accessories', buttonText: 'ACCESSORIES', imageSrc: 'images/accessori-main.png' },
    { category: 'tech', buttonText: 'TECH GADGETS', imageSrc: 'images/gadget-main.png' },
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

      <div className="products-container">
        {displayProducts && displayProducts.map((product, index) => (
          <div className="item" key={index}>
            <Link to={`/products/${product.category}/${product._id}`}>
              <div className="product-image-container">
                <img src={product.imgPath} alt={product.altText} />
              </div>
            </Link>
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <p className="product-price">{product.price}$</p>
              <div className="product-actions">
                <Link to={`/products/${product.category}/${product._id}`}>
                  <button className="details-btn">
                    <FontAwesomeIcon icon={faInfoCircle} /><h5>Details</h5>
                  </button>
                </Link>
                <button className="details-btn" onClick={() => handleAddToWishlist(product._id, product.category)}>
                  <FontAwesomeIcon icon={faHeart} /><h5>Wishlist</h5>
                </button>
                <button className="details-btn" onClick={() => handleAddToCart(product._id, product.category)}>
                  <FontAwesomeIcon icon={faShoppingCart} /><h5>Cart</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;