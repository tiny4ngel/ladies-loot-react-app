import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/authContext';
import * as wishlistService from '../../services/wishlistService';
import * as cartService from '../../services/cartService';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import Path from '../../paths';

import styles from './Wishlist.module.css';


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
      toast.success('Removed from wishlist successfully!')
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const handleAddToCart = async (productId, category) => {
    try {
      await cartService.addToCart(userId, productId, 1, category); 
      toast.success('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding item to cart:', error);
      toast.error('Failed to add to cart.');
    }
  };


  if (wishlist.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your wishlist is empty</h2>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ paddingTop: '0px' }}>

      <aside className="sidebar">
        <Link to={Path.Account}>
          <div className="sidebar-item">BILLING INFORMATION</div>
        </Link>
        <div className="sidebar-item" style={{ color: '#ffd1fc' }}>WISHLIST</div>
        <Link to={Path.Cart}>
          <div className="sidebar-item">CART</div>
        </Link>
      </aside>

      <main className={styles.productsContainer}>
        {wishlist.map((item, index) => (
          <div className={styles.item} key={index}>
            <Link to={`/products/${item.category}/${item._id}`}>
              <div className="product-image-container">
                <img src={item.imgPath} alt={item.name} />
              </div>
            </Link>
            <div className={styles.productsDetails}>
              <span className={styles.productName}>{item.name}</span>
              <p className={styles.productPrice}>{item.price}$</p>
              <div className={styles.productActions}>
                <button className="details-btn" onClick={() => handleRemoveFromWishlist(item.wishlistId)}>
                  <FontAwesomeIcon icon={faHeartCircleMinus} /><h5>Remove</h5>
                </button>
                <button className="details-btn" onClick={() => handleAddToCart(item._id, item.category)}>
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