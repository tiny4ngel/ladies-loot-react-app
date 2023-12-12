import React, { useEffect, useState } from 'react';
import '../../../public/styles/product-details.css'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const [product, setProduct] = useState(null);
    const { category, id } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3030/data/${category}/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log("Fetched product image path:", data.imgPath);
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [category, id]);

    if (!product) {
        return <div>Loading...</div>; // Display loading or a message until the product is fetched
    }

    return (
        <div className="product-detail-page">
            <div className="product-image-wrapper">
                <img src={`/${product.imgPath}`} alt={product.name} className="product-image" />
            </div>
            <div className="product-details-wrapper">
                <h1 className="product-title">{product.name}</h1>
                <p className="product-category">{product.category}</p>
                <p className="product-price">${product.price}</p>
                {/* Implement rating system*/}
                <p className="product-description">{product.description}</p>
                <button className="btn add-to-cart">Add to Cart</button>
                <button className="btn add-to-wishlist">Wishlist</button>
            </div>
        </div>
    );
};

export default ProductDetails;
