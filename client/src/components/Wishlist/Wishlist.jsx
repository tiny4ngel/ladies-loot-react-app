import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCircleMinus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Wishlist = () => {
 
  return (
    <div className="container" style={{ paddingTop: '20px' }}>
      
      <aside className="sidebar">
        <div className="sidebar-item">BILLING INFORMATION</div>
        <div className="sidebar-item">WISHLIST</div>
        <div className="sidebar-item">CART</div>
      </aside>
      <div className="products-container">
      {/* <h2 className="wishlist-title">My Wishlist</h2> */}
        {wishlistItems.map((item, index) => (
          <div className="item" key={index}>
            <Link to={`/products/${item.category}/${item._id}`}>
              <div className="product-image-container">
                <img src={item.imgPath} alt={item.altText} />
              </div>
            </Link>
            <div className="product-details">
              <span className="product-name">{item.name}</span>
              <p className="product-price">{item.price}$</p>
              <div className="product-actions">
                <button className="details-btn" onClick={() => removeFromWishlist(item._id)}>
                  <FontAwesomeIcon icon={faHeartCircleMinus} /><h5>Remove</h5>
                </button>
                <button className="details-btn">
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

export default Wishlist;