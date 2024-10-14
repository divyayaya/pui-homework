import React from "react";
import "../styles/styles.css";

function CartItem({ cartItem, removeItem, index }) {
  {
    return (
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
    );
  }
}
export default CartItem;
