import React, { useEffect, useState, useContext } from 'react';
import * as cartService from '../../services/cartService';
import AuthContext from '../../contexts/authContext';
import '../../../public/styles/cart.css'
import { toast } from 'react-hot-toast';

const Cart = () => {
    const { userId } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                let cartItems = await cartService.getCartByUserId(userId);

                cartItems = await Promise.all(cartItems.map(async (item) => {
                    if (!item.productId || !item.category) {
                        console.error('Undefined productId or category for cart item:', item);
                        return null;
                    }

                    try {
                        const response = await fetch(`http://localhost:3030/data/${item.category}/${item.productId}`);
                        if (response.ok) {
                            const productDetails = await response.json();
                            return { ...productDetails, cartItemId: item._id, quantity: item.quantity };
                        }
                    } catch (error) {
                        console.error(`Fetch failed for category: ${item.category}, productId: ${item.productId}`, 'Error:', error);
                    }

                    console.error('Product details could not be fetched for productId:', item.productId);
                    return null;
                }));

                setCartItems(cartItems.filter(item => item !== null));
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [userId]);

    const handleRemoveFromCart = async (cartItemId) => {
        try {
            await cartService.removeFromCart(cartItemId);
            setCartItems(currentItems => currentItems.filter(item => item.cartItemId !== cartItemId));
        } catch (error) {
            console.error('Error removing item from cart:', error);
        }
    };

    const updateQuantity = async (cartItemId, newQuantity) => {
        if (newQuantity < 1) {
            return;
        }
        try {
            await cartService.updateCartItemQuantity(cartItemId, newQuantity);
            setCartItems(currentItems => currentItems.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item));
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const placeOrder = async () => {
        try {

            await cartService.clearCartForUser(userId);
            setCartItems([]);

            toast.success('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error('Failed to place order. Please try again.');
        }
    };


    if (cartItems.length === 0) {
        return (
            <div className="container empty-cart">
                <h2>Your cart is empty</h2>
            </div>
        );
    }
    return (
        <div className="container">
            {/* <h1 className='cart-text'>Your Cart</h1> */}
            <div className="cart-page-container">
                <div className="cart-table">
                    {/* Cart Table Header */}
                    <div className="cart-table-header">
                        <div className="header-item">Product</div>
                        <div className="header-item">Price</div>
                        <div className="header-item">Quantity</div>
                        <div className="header-item">Total</div>
                    </div>
                    {/* Cart Items */}
                    {cartItems.map(item => (
                        <div className="cart-table-row" key={item.cartItemId}>
                            <div className="row-item">
                                <img src={item.imgPath} alt={item.name} />
                                {item.name}
                            </div>
                            <div className="row-item">${item.price}</div>
                            <div className="row-item quantity-selector">
                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                                <input type="number" value={item.quantity} onChange={(e) => updateQuantity(item.cartItemId, parseInt(e.target.value))} />
                                <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                            </div>
                            <div className="row-item">${item.price * item.quantity}</div>
                            <button onClick={() => handleRemoveFromCart(item.cartItemId)}>Remove</button>
                        </div>
                    ))}
                </div>

                <aside className="sidebar-cart">
                    <h3>ORDER SUMMARY</h3>
                    <div className="summary-row">Subtotal: ${calculateSubtotal()}</div>
                    <div className="summary-row">Shipping: FREE</div>
                    <div className="summary-row total">Total: ${calculateSubtotal()}</div>
                    <button className="checkout-button" onClick={placeOrder}>PLACE ORDER</button>
                </aside>
            </div>
        </div>
    );
};

export default Cart;