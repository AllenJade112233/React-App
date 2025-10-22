import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleSpecialClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            <section id="home" className="hero">
                <div className="container">
                    <h2>Welcome to AJDM cafe</h2>
                    <p>Experience the finest coffee in town with our expertly crafted beverages</p>
                    <button className="btn" onClick={handleSpecialClick}>
                        View Today's Special
                    </button>
                </div>
            </section>

            {showPopup && (
                <div className="popup" style={{ display: 'flex' }}>
                    <div className="popup-content">
                        <span className="close" onClick={closePopup}>&times;</span>
                        <h3>Today's Special!</h3>
                        <p>🎉 20% off on all Mocha drinks! 🎉</p>
                        <p>Valid until end of day. Don't miss out!</p>
                        <button className="btn" onClick={closePopup}>Got it!</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
