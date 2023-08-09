import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Cart ({ cart }){
    return(
        <div className = "cart">
            <h2> Your Cart</h2>
            {cart.map(item => (
                <div key = {item.id}>
                    {item.name} x {item.quantity} = P{item.price * item.quantity}
                     </div>
            ))}
            <strong>
                Total: P{cart.reduce((acc, item) => + item.price * item.quantity, 0)}
            </strong>
        </div>
    );
}

export default Cart;