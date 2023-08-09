import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import React, { useState } from 'react';
import Product from './component/product-component'
import Cart from './component/cart';
import'./app-styling.css'


function App(){
    const[products] = useState([
        {id: 1, name: 'Laptop', price: 1000},
        {id: 2, name: 'Phone', price: 500},
        {id: 3, name: 'Watch', price: 100}
    ]);

    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        const cartItem = cart.find(item => item.id === product.id);
        if(cartItem){
            setCart(cart.map(item=> item.id=== product.id ? {...cartItem, quantity: cartItem.quantity + 1}: item));
        }
        else{
            setCart([...cart, {...product, quantity: 1}]);
        }
    };
    return(
        <div className = "App">
            <h1> Suds and Scents Ordering System</h1>
            <div className = "products">
                {products.map(product=>(
                    <Product key = {product.id} product = {product} onAddToCart = {addtoCart} />
                ))}
            </div>
            <Cart cart = {cart} />
        </div>
    );
}
export default App;