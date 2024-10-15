import React from "react";
import { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.jsx";
import Roll from "../../components/Roll.jsx";
import SearchBar from "../../components/SearchBar.jsx";
import Cart from "../../components/Cart.jsx";
const HomePage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [cart, setCart] = useState([]); //list to store cart
  const [searchFlag, setSearchFlag] = useState(-1);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
  };

  const rollsData = [
    {
      imageSource: "images/products/original-cinnamon-roll.jpg",
      imageAltText: "Original cinnamon roll",
      rollType: "Original cinnamon roll",
      rollPrice: 2.49,
      packSizeID: "pack-size-1",
      packSizeSet: "1st",
      buttonIndex: 0,
      priceLabelId: "1",
    },
    {
      imageSource: "images/products/apple-cinnamon-roll.jpg",
      imageAltText: "Apple cinnamon roll",
      rollType: "Apple cinnamon roll",
      rollPrice: 3.49,
      packSizeID: "pack-size-2",
      packSizeSet: "2nd",
      buttonIndex: 1,
      priceLabelId: "2",
    },
    {
      imageSource: "images/products/raisin-cinnamon-roll.jpg",
      imageAltText: "Raisin cinnamon roll",
      rollType: "Raisin cinnamon roll",
      rollPrice: 2.99,
      packSizeID: "pack-size-3",
      packSizeSet: "3rd",
      buttonIndex: 2,
      priceLabelId: "3",
    },
    {
      imageSource: "images/products/walnut-cinnamon-roll.jpg",
      imageAltText: "Walnut cinnamon roll",
      rollType: "Walnut cinnamon roll",
      rollPrice: 3.49,
      packSizeID: "pack-size-4",
      packSizeSet: "4th",
      buttonIndex: 3,
      priceLabelId: "4",
    },
    {
      imageSource: "images/products/double-chocolate-cinnamon-roll.jpg",
      imageAltText: "Double-chocolate cinnamon roll",
      rollType: "Double-chocolate cinnamon roll",
      rollPrice: 3.99,
      packSizeID: "pack-size-5",
      packSizeSet: "5th",
      buttonIndex: 4,
      priceLabelId: "5",
    },
    {
      imageSource: "images/products/strawberry-cinnamon-roll.jpg",
      imageAltText: "Strawberry cinnamon roll",
      rollType: "Strawberry cinnamon roll",
      rollPrice: 3.99,
      packSizeID: "pack-size-6",
      packSizeSet: "6th",
      buttonIndex: 5,
      priceLabelId: "6",
    },
  ];

  //Implementing a function to serialize a cart to JSON
  const cartToStorage = (currentCart) => {
    localStorage.setItem("cart", JSON.stringify(currentCart)); //Adding cart JSON to local storage
  };

  useEffect(() => {
    const readCart = retrieveCart(); //retrieving the cart from local storage
    if (readCart.length > 0) {
      setCart(readCart);
      setNumberOfItems(readCart.length);
      let totalPrice = 0.0;
      readCart.forEach((item) => {
        totalPrice += item.rollPrice; //calculating total cart price from retrieved cart items
      });
      setTotalCartPrice(totalPrice);
    } else localStorage.removeItem("cart");
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      cartToStorage(cart); //checking for updates to cart and changing stored cart value
      console.log(localStorage.getItem("cart")); //printing out the cart in local storage whenever it is updated
    }
  }, [cart]);

  const updateCartStatus = (item) => {
    setCart([...cart, item]);
    setNumberOfItems(numberOfItems + 1); //incrementing number of items in the cart
    setTotalCartPrice(totalCartPrice + item.rollPrice); //adding item price to get total cart value
  };

  const removeItem = (index) => {
    const newCart = cart.filter((cartItem) => cartItem.rollIndex !== index);
    const removedItem = cart.find((cartItem) => cartItem.rollIndex === index);
    setCart(newCart);
    setNumberOfItems(numberOfItems - 1);
    setTotalCartPrice(totalCartPrice - removedItem.rollPrice);
    if (newCart.length === 0) localStorage.removeItem("cart");
  };
  const handleSearch = (boxInput) => {
    let results = rollsData.filter(
      (roll) => roll.rollType.toLowerCase().includes(boxInput.toLowerCase()) //filtering
    );
    setSearchResults(results);
    if (results.length === 0) {
      setSearchFlag(0);
    } else {
      setSearchFlag(1);
    }
  };

  /* Source: “Array.prototype.sort() - JavaScript | MDN.” 
  Accessed: Oct. 08, 2024. [Online]. 
  Available: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort */

  const comparePrice = (a, b) => {
    const priceA = a.rollPrice;
    const priceB = b.rollPrice;
    if (priceA < priceB) {
      return -1;
    }
    if (priceA > priceB) {
      return 1;
    }
    return 0;
  };

  const compareName = (a, b) => {
    const nameA = a.rollType.toUpperCase();
    const nameB = b.rollType.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  };
  const handleSort = (sortInput) => {
    let results = [];
    if (sortInput === "Name") {
      setSearchFlag(2);
      results = rollsData.sort(compareName);
    }
    if (sortInput === "Base Price") {
      setSearchFlag(3);
      results = rollsData.sort(comparePrice);
    }
    setSearchResults(results);
  };

  //function to deserialize JSON to a cart instance
  const retrieveCart = () => {
    const retrievedCart = JSON.parse(localStorage.getItem("cart"));
    if (retrievedCart)
      return retrievedCart; //retrieving the cart from the local storage. If no cart exists in the storage, returning an empty cart
    else return [];
  };

  return (
    <>
      <NavBar toggleCartVisibility={toggleCartVisibility} />
      <SearchBar
        handleSearch={handleSearch}
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSort={handleSort}
      />
      {isCartVisible && (
        <Cart
          numberOfItems={numberOfItems}
          totalCartPrice={totalCartPrice}
          cart={cart}
          removeItem={removeItem}
        ></Cart>
      )}
      {searchFlag === -1 && (
        <>
          <Roll
            imageSource="images/products/original-cinnamon-roll.jpg"
            imageAltText="Original cinnamon roll"
            rollType="Original cinnamon roll"
            rollPrice={2.49}
            packSizeID="pack-size-1"
            packSizeSet="1"
            buttonIndex={0}
            priceLabelId="1"
            updateCartStatus={updateCartStatus}
          />
          <Roll
            imageSource="images/products/apple-cinnamon-roll.jpg"
            imageAltText="Apple cinnamon roll"
            rollType="Apple cinnamon roll"
            rollPrice={3.49}
            packSizeID="pack-size-2"
            packSizeSet="2"
            buttonIndex={1}
            priceLabelId="2"
            updateCartStatus={updateCartStatus}
          />

          <Roll
            imageSource="images/products/raisin-cinnamon-roll.jpg"
            imageAltText="Raisin cinnamon roll"
            rollType="Raisin cinnamon roll"
            rollPrice={2.99}
            packSizeID="pack-size-3"
            packSizeSet="3"
            buttonIndex={2}
            priceLabelId="3"
            updateCartStatus={updateCartStatus}
          />

          <Roll
            imageSource="images/products/walnut-cinnamon-roll.jpg"
            imageAltText="Walnut cinnamon roll"
            rollType="Walnut cinnamon roll"
            rollPrice={3.49}
            packSizeID="pack-size-4"
            packSizeSet="4"
            buttonIndex={3}
            priceLabelId="4"
            updateCartStatus={updateCartStatus}
          />

          <Roll
            imageSource="images/products/double-chocolate-cinnamon-roll.jpg"
            imageAltText="Double-chocolate cinnamon roll"
            rollType="Double-chocolate cinnamon roll"
            rollPrice={3.99}
            packSizeID="pack-size-5"
            packSizeSet="5"
            buttonIndex={4}
            priceLabelId="5"
            updateCartStatus={updateCartStatus}
          />

          <Roll
            imageSource="images/products/strawberry-cinnamon-roll.jpg"
            imageAltText="Strawberry cinnamon roll"
            rollType="Strawberry cinnamon roll"
            rollPrice={3.99}
            packSizeID="pack-size-6"
            packSizeSet="6"
            buttonIndex={5}
            priceLabelId="6"
            updateCartStatus={updateCartStatus}
          />
        </>
      )}
      {(searchFlag === 1 || searchFlag === 2 || searchFlag === 3) && (
        <>
          {searchResults.map((roll, index) => (
            <Roll
              key={index}
              imageSource={roll.imageSource}
              imageAltText={roll.imageAltText}
              rollType={roll.rollType}
              rollPrice={roll.rollPrice}
              packSizeID={`pack-size-${index + 1}`}
              packSizeSet={`${index + 1}`}
              buttonIndex={index}
              priceLabelId={`${index + 1}`}
              updateCartStatus={updateCartStatus} //passing a method across components
            />
          ))}
        </>
      )}

      {searchFlag === 0 && (
        <>
          <h5>No Match!</h5>
        </>
      )}
    </>
  );
};
export default HomePage;
