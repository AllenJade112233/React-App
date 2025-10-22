import React, { useState } from 'react';

const Cart = ({ cartItems, getTotalPrice, removeFromCart }) => {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutMessage, setCheckoutMessage] = useState('');

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setCheckoutLoading(true);
        setCheckoutMessage('');

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: cartItems,
                    total: parseFloat(getTotalPrice())
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to place order');
            }

            const data = await response.json();
            setCheckoutMessage(`Order placed successfully! Order ID: ${data.orderId}`);
            // Optionally clear cart after successful checkout
            // clearCart(); // If you add a clearCart function to useCart
        } catch (error) {
            console.error('Checkout error:', error);
            setCheckoutMessage('Failed to place order. Please try again.');
        } finally {
            setCheckoutLoading(false);
        }
    };

    return (
        <section id="cart" className="cart">
            <div className="container">
                <h3>Shopping Cart</h3>
                {cartItems.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem' }}>
                        <h4>Your cart is empty</h4>
                        <p>Add some delicious coffee to get started!</p>
                        <a href="/menu" className="btn" style={{ marginTop: '1rem' }}>
                            Browse Menu
                        </a>
                    </div>
                ) : (
                    <div>
                        <ul className="list-group mb-3">
                            {cartItems.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                                            {item.name}
                                        </h5>
                                        <p style={{ margin: 0, fontSize: '1.1rem', color: '#f39c12', fontWeight: '600' }}>
                                            ${parseFloat(item.price).toFixed(2)}
                                        </p>
                                    </div>
                                    <button
                                        className="btn-danger"
                                        onClick={() => removeFromCart(item.id)}
                                    >
                                        Remove
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div style={{
                            background: 'white',
                            padding: '2rem',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                            textAlign: 'center'
                        }}>
                            <h4 style={{ color: '#2c3e50', marginBottom: '1rem' }}>
                                Total: <span style={{ color: '#f39c12' }}>${parseFloat(getTotalPrice()).toFixed(2)}</span>
                            </h4>
                            <button
                                className="btn-primary"
                                onClick={handleCheckout}
                                disabled={checkoutLoading || cartItems.length === 0}
                            >
                                {checkoutLoading ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                            {checkoutMessage && (
                                <p style={{ marginTop: '1rem', color: checkoutMessage.includes('successfully') ? 'green' : 'red' }}>
                                    {checkoutMessage}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Cart;
