import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Header from './components/Header';
import Home from './components/Home';
import About from './components/About';
import Menu from './components/Menu';
import Contact from './components/Contact';
import Cart from './components/Cart';
import useCart from './hooks/useCart';
import './App.css';

function App() {
    const location = useLocation();
    const { cartItems, addToCart, removeFromCart, getTotalPrice } = useCart();

    return (
        <div className="App">
            <Header />
            <TransitionGroup>
                <CSSTransition
                    key={location.key}
                    classNames="page"
                    timeout={500}
                >
                    <Switch location={location}>
                        <Route path="/" exact component={Home} />
                        <Route path="/about" component={About} />
                        <Route path="/menu" render={(props) => <Menu {...props} addToCart={addToCart} />} />
                        <Route path="/contact" component={Contact} />
                        <Route path="/cart" render={(props) => <Cart {...props} cartItems={cartItems} removeFromCart={removeFromCart} getTotalPrice={getTotalPrice} />} />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
        </div>
    );
}

export default App;
