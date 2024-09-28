import React from "react";
import NavBar from "../../components/NavBar.jsx";
import ProductCard from "../../components/ProductCard.jsx";
const HomePage = () => {
  return (
    <>
      {/* Creating product catalog with 6 different product cards */}
      <NavBar />
      <ProductCard
        imageSource="images/products/original-cinnamon-roll.jpg"
        imageAltText="Original cinnamon roll"
        rollName="Original cinnamon roll"
        rollPrice={2.49}
        packSizeID="pack-size-1"
        packSizeSet="1st"
        buttonIndex="0"
      />
      <ProductCard
        imageSource="images/products/apple-cinnamon-roll.jpg"
        imageAltText="Apple cinnamon roll"
        rollName="Apple cinnamon roll"
        rollPrice={3.49}
        packSizeID="pack-size-2"
        packSizeSet="2nd"
        buttonIndex={1}
      />

      <ProductCard
        imageSource="images/products/raisin-cinnamon-roll.jpg"
        imageAltText="Raisin cinnamon roll"
        rollName="Raisin cinnamon roll"
        rollPrice={2.99}
        packSizeID="pack-size-3"
        packSizeSet="3rd"
        buttonIndex={2}
      />

      <ProductCard
        imageSource="images/products/walnut-cinnamon-roll.jpg"
        imageAltText="Walnut cinnamon roll"
        rollName="Walnut cinnamon roll"
        rollPrice={3.49}
        packSizeID="pack-size-4"
        packSizeSet="4th"
        buttonIndex={3}
      />

      <ProductCard
        imageSource="images/products/double-chocolate-cinnamon-roll.jpg"
        imageAltText="Double-chocolate cinnamon roll"
        rollName="Double-chocolate cinnamon roll"
        rollPrice={3.99}
        packSizeID="pack-size-5"
        packSizeSet="5th"
        buttonIndex={4}
      />

      <ProductCard
        imageSource="images/products/strawberry-cinnamon-roll.jpg"
        imageAltText="Strawberry cinnamon roll"
        rollName="Strawberry cinnamon roll"
        rollPrice={3.99}
        packSizeID="pack-size-6"
        packSizeSet="6th"
        buttonIndex={5}
      />
    </>
  );
};

export default HomePage;
