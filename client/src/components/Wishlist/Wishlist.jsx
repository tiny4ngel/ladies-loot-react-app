import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import * as wishlistService from '../../services/wishlistService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
  const { userId } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        let wishlistItems = await wishlistService.getWishlistByUserId(userId);

        wishlistItems = await Promise.all(wishlistItems.map(async (item) => {
          if (!item.productId || !item.category) {
            console.error('Undefined productId or category for wishlist item:', item);
            return null;
          }

          try {
            const response = await fetch(`http://localhost:3030/data/${item.category}/${item.productId}`);
            if (response.ok) {
              const productDetails = await response.json();
              return { ...productDetails, wishlistId: item._id };
            }
          } catch (error) {
            console.error(`Fetch failed for category: ${item.category}, productId: ${item.productId}`, 'Error:', error);
          }

          console.error('Product details could not be fetched for productId:', item.productId);
          return null;
        }));

        setWishlist(wishlistItems.filter(item => item !== null));
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemoveFromWishlist = async (wishlistItemId) => {
    try {
      await wishlistService.removeFromWishlist(wishlistItemId);
      setWishlist(currentWishlist => currentWishlist.filter(item => item.wishlistId !== wishlistItemId));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };


  return (
    <div className="container" style={{ paddingTop: '20px' }}>

      <aside className="sidebar">
        <div className="sidebar-item">BILLING INFORMATION</div>
        <div className="sidebar-item">WISHLIST</div>
        <div className="sidebar-item">CART</div>
      </aside>
      <main className="products-container">
        {wishlist.map((item, index) => (
          <div className="item" key={index}>
            <Link to={`/products/${item.category}/${item._id}`}>
              <div className="product-image-container">
                <img src={item.imgPath} alt={item.name} />
              </div>
            </Link>
            <div className="product-details">
              <span className="product-name">{item.name}</span>
              <p className="product-price">{item.price}$</p>
              <div className="product-actions">
                <button className="details-btn" onClick={() => handleRemoveFromWishlist(item.wishlistId)}>
                  <FontAwesomeIcon icon={faHeartCircleMinus} /><h5>Remove</h5>
                </button>
                <button className="details-btn">
                  <FontAwesomeIcon icon={faShoppingCart} /><h5>Add to Cart</h5>
                </button>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Wishlist;