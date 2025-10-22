import { useState } from 'react';

const useCart = () => {
    const [cartItems, setCartItems] = useState([]);
    
    const addToCart = (item) => {
        setCartItems((prevItems) => [...prevItems, item]);
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    return {
        cartItems,
        addToCart,
        removeFromCart,
        getTotalPrice,
    };
};

export default useCart;