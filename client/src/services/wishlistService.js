import * as request from "../lib/request";

const baseUrl = "data/wishlist";


export const getWishlistByUserId = async (userId) => {
    try {
        const allWishlistItems = await request.get(baseUrl);

        const userWishlistItems = allWishlistItems.filter(item => item._ownerId === userId);

        return userWishlistItems;
    } catch (error) {
        throw error;
    }
};

export const addToWishlist = async (userId, productId, category) => {
    try {
        return await request.post(baseUrl, { _ownerId: userId, productId, category });
    } catch (error) {
        throw error;
    }
};

export const removeFromWishlist = async (wishlistId) => {
    try {
        return await request.remove(`${baseUrl}/${wishlistId}`);
    } catch (error) {
        throw error;
    }
};
