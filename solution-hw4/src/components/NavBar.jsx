import React from "react";
import "../styles/styles.css";
function NavBar({ numberOfItems, totalCartPrice }) {
  return (
    <>
      <span id="logo-span">
        <img
          id="logo"
          src="images/logo/logo-01.svg"
          alt="Logo of the Bun Bun bake shop"
        />
      </span>
      <div className="heading">
        <nav>
          <ul>
            <li>
              <a href="#">PRODUCTS</a>
            </li>
            <li>
              <a href="#">CART</a>
            </li>
          </ul>
          {/* displaying cart status */}
          <div id="cart-status">
            <h2 id="number-of-items">{numberOfItems} Item</h2>
            <h3 id="total-cart-value">Total: ${totalCartPrice.toFixed(2)}</h3>
          </div>
        </nav>
        <div id="motto">
          <h1>Our hand-made cinnamon rolls</h1>
        </div>
        <div id="popup"></div>
      </div>
    </>
  );
}
export default NavBar;
