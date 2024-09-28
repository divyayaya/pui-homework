import React from "react";
import "../styles/styles.css";
function NavBar() {
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
        </nav>
        <div id="motto">
          <h1>Our hand-made cinnamon rolls</h1>
        </div>
      </div>
    </>
  );
}
export default NavBar;
