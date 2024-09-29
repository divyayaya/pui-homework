import React from "react";
import { useState } from "react";
import NavBar from "../../components/NavBar.jsx";
import Roll from "../../components/Roll.jsx";
const HomePage = () => {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const cart = [];

  const updateCartStatus = (itemPrice) => {
    setNumberOfItems(numberOfItems + 1); // Increment number of items in the cart
    setTotalCartPrice(totalCartPrice + itemPrice); // Add the item price to the total cart price
  };
  return (
    <>
      {/* Creating product catalog with 6 different product cards */}
      <NavBar numberOfItems={numberOfItems} totalCartPrice={totalCartPrice} />
      <Roll
        imageSource="images/products/original-cinnamon-roll.jpg"
        imageAltText="Original cinnamon roll"
        rollType="Original cinnamon roll"
        rollPrice={2.49}
        packSizeID="pack-size-1"
        packSizeSet="1st"
        buttonIndex={0}
        priceLabelId="1"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />
      <Roll
        imageSource="images/products/apple-cinnamon-roll.jpg"
        imageAltText="Apple cinnamon roll"
        rollType="Apple cinnamon roll"
        rollPrice={3.49}
        packSizeID="pack-size-2"
        packSizeSet="2nd"
        buttonIndex={1}
        priceLabelId="2"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />

      <Roll
        imageSource="images/products/raisin-cinnamon-roll.jpg"
        imageAltText="Raisin cinnamon roll"
        rollType="Raisin cinnamon roll"
        rollPrice={2.99}
        packSizeID="pack-size-3"
        packSizeSet="3rd"
        buttonIndex={2}
        priceLabelId="3"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />

      <Roll
        imageSource="images/products/walnut-cinnamon-roll.jpg"
        imageAltText="Walnut cinnamon roll"
        rollType="Walnut cinnamon roll"
        rollPrice={3.49}
        packSizeID="pack-size-4"
        packSizeSet="4th"
        buttonIndex={3}
        priceLabelId="4"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />

      <Roll
        imageSource="images/products/double-chocolate-cinnamon-roll.jpg"
        imageAltText="Double-chocolate cinnamon roll"
        rollType="Double-chocolate cinnamon roll"
        rollPrice={3.99}
        packSizeID="pack-size-5"
        packSizeSet="5th"
        buttonIndex={4}
        priceLabelId="5"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />

      <Roll
        imageSource="images/products/strawberry-cinnamon-roll.jpg"
        imageAltText="Strawberry cinnamon roll"
        rollType="Strawberry cinnamon roll"
        rollPrice={3.99}
        packSizeID="pack-size-6"
        packSizeSet="6th"
        buttonIndex={5}
        priceLabelId="6"
        updateCartStatus={updateCartStatus}
        cart={cart}
      />
    </>
  );
};

export default HomePage;
