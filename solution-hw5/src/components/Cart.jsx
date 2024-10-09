import React from "react";
import "../styles/styles.css";

function Cart({ numberOfItems, totalCartPrice, cart, setCart, removeItem }) {
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
              <div key={index} className="cart-card">
                <img
                  id="cart-image"
                  src={cartItem.rollImage}
                  alt={cartItem.rollAltText}
                />
                <h3 id="cart-roll-type">{cartItem.rollType}</h3>
                <h3 id="cart-glaze">Glazing: {cartItem.rollGlaze}</h3>
                <h3 id="cart-pack">Pack Size: {cartItem.rollPack}</h3>
                <h2 id="cart-pricing">$ {cartItem.rollPrice.toFixed(2)}</h2>
                <a onClick={() => removeItem(cartItem.rollIndex)}>Remove</a>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Cart;
