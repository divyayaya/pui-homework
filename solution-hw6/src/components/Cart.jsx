import React from "react";
import "../styles/styles.css";
import CartItem from "./CartItem";

function Cart({ numberOfItems, totalCartPrice, cart, removeItem }) {
  /*if cart has zero number of items: */
  if (numberOfItems === 0) {
    return (
      <div className="the-cart">
        <div className="cart-heading">
          <h1 className="empty-cart">The cart is empty!</h1>
        </div>
      </div>
    );
  } else {
    /*Removing items based on unique item index */
    return (
      <div className="the-cart">
        <div className="cart-heading">
          <h1>Shopping Cart ({numberOfItems} items)</h1>
          <h1>Total: ${totalCartPrice.toFixed(2)}</h1>
        </div>
        <div className="cart-items">
          {Array.isArray(cart) &&
            cart.length > 0 &&
            cart.map((cartItem, index) => (
              //using the cart item component
              <CartItem
                cartItem={cartItem}
                removeItem={removeItem}
                index={index}
              ></CartItem>
            ))}
        </div>
      </div>
    );
  }
}

export default Cart;
