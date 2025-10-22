import React, { useState, useEffect } from 'react';
import { fetchMenuItems } from '../utils/data';

const Menu = ({ addToCart }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMenu = async () => {
            const items = await fetchMenuItems();
            setMenuItems(items);
            setLoading(false);
        };
        loadMenu();
    }, []);

    const getImagePath = (itemName) => {
        const imageMap = {
            'Espresso': 'espresso.jpg',
            'Cappuccino': 'cappuccino.jpg',
            'Latte': 'latte.jpg',
            'Mocha': 'mocha.jpg'
        };
        return `/images/${imageMap[itemName] || 'espresso.jpg'}`;
    };

    if (loading) {
        return (
            <section id="menu" className="menu">
                <h2>Our Menu</h2>
                <p>Loading menu...</p>
            </section>
        );
    }

    return (
        <section id="menu" className="menu">
            <h2>Our Menu</h2>
            <div className="row">
                {menuItems.map((item) => (
                    <div className="col-md-4" key={item.id}>
                        <div className="card mb-4">
                            <img
                                src={getImagePath(item.name)}
                                className="card-img-top"
                                alt={item.name}
                                onError={(e) => {
                                    e.target.src = '/images/espresso.jpg'; // Fallback image
                                }}
                            />
                            <div className="card-body">
                                <h3 className="card-title">{item.name}</h3>
                                <p className="card-text">{item.description}</p>
                                <span className="price">${parseFloat(item.price).toFixed(2)}</span>
                                <button
                                    className="btn mt-2"
                                    onClick={() => addToCart(item)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Menu;
