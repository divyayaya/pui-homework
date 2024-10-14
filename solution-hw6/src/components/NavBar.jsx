import React from "react";
import "../styles/styles.css";

function NavBar({ toggleCartVisibility }) {
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
              {/*Adding a toggle functionlity to the CART link to display/hide cart items*/}
              <a href="#" onClick={toggleCartVisibility}>
                CART
              </a>
            </li>
          </ul>
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
