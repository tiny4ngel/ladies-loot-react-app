import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as wishlistService from '../../services/wishlistService';
import * as cartService from '../../services/cartService';
import { toast } from 'react-hot-toast';
import AuthContext from '../../contexts/authContext';

import styles from './ProductDetails.module.css';


const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { category, id } = useParams();
    const { userId } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3030/data/${category}/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [category, id]);

    const handleAddToWishlist = async () => {
        try {
            await wishlistService.addToWishlist(userId, id, category);
            toast.success('Added to wishlist successfully!');
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            toast.error('Failed to add to wishlist.');
        }
    };

    const handleAddToCart = async () => {
        try {
            await cartService.addToCart(userId, id, 1, category); 
            toast.success('Added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add to cart.');
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.productDetailPage}>
            <div className={styles.productImageWrapper}>
                <img src={`/${product.imgPath}`} alt={product.name} className={styles.productImage} />
            </div>
            <div className={styles.productDetailsWrapper}>
                <h1 className={styles.productTitle}>{product.name}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                {/* Implement rating system*/}
                <p className="product-description">{product.description}</p>
                <button className="btn-p add-to-cart" onClick={handleAddToCart}>Add to Cart</button>
                <button className="btn-p add-to-wishlist" onClick={handleAddToWishlist}>Wishlist</button>
            </div>
        </div>
    );
};

export default ProductDetails;
