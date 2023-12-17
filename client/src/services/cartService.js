import * as request from "../lib/request";

const baseUrl = "data/cart";


export const getCartByUserId = async (userId) => {
    try {
        const allCartItems = await request.get(baseUrl);
        return allCartItems.filter(item => item._ownerId === userId);
    } catch (error) {
        throw error;
    }
};

export const addToCart = async (userId, productId, quantity, category) => {
    try {
        return await request.post(baseUrl, { _ownerId: userId, productId, quantity, category });
    } catch (error) {
        throw error;
    }
};

export const removeFromCart = async (cartId) => {
    try {
        return await request.remove(`${baseUrl}/${cartId}`);
    } catch (error) {
        throw error;
    }
};

export const updateCartItemQuantity = async (cartId, newQuantity) => {
    try {
        return await request.put(`${baseUrl}/${cartId}`, { quantity: newQuantity });
    } catch (error) {
        throw error;
    }
};

export const clearCartForUser = async (userId) => {
    try {
        const allCartItems = await getCartByUserId(userId);
        const removalPromises = allCartItems.map(item => removeFromCart(item._id));
        return Promise.all(removalPromises);
    } catch (error) {
        throw error;
    }
};
