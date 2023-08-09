import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
function Product({product, onAddToCart}){
    return(
        <div className = "product">
            <h2>{product.name}</h2>
            <p>Price: P{product.price}</p>
            <button onClick = {() => onAddToCart(product)} Add to Cart></button>
        </div>
    );
}

export default Product;