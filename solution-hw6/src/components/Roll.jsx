import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";
import { useState } from "react";

//component Roll has the following props
const Roll = ({
  imageSource,
  imageAltText,
  rollType,
  rollPrice,
  packSizeID,
  buttonIndex,
  packSizeSet,
  priceLabelId,
  updateCartStatus,
}) => {
  const [glazing, setGlazing] = useState("Keep original");
  const [packSize, setPackSize] = useState(1);
  const basePrice = rollPrice;
  const [totalPrice, setTotalPrice] = useState(basePrice);
  //storing price change for glazing options
  const glazingOptions = [
    { label: "Keep original", priceChange: 0 },
    { label: "Sugar milk", priceChange: 0 },
    { label: "Vanilla milk", priceChange: 0.5 },
    { label: "Double chocolate", priceChange: 1.5 },
  ];

  //storing price multipliers for pack size options
  const packSizeOptions = [
    { size: 1, multiplier: 1 },
    { size: 3, multiplier: 3 },
    { size: 6, multiplier: 5 },
    { size: 12, multiplier: 10 },
  ];

  //conditional styling
  const radioStyle = () => ({
    display: "none",
  });

  const radioLabelStyle = (size) => {
    return {
      backgroundColor:
        packSize === size ? "rgb(191,191,191)" : "rgb(255,255,255)", //modifying color for selected pack size
    };
  };

  //event handler for when glazing option is changed
  const handleGlazingChange = (event) => {
    const selectedGlazing = glazingOptions.find(
      (option) => option.label === event.target.value
    );
    setGlazing(selectedGlazing.label);
    if (packSize === -1) setPackSize(1);
    updatePrice(selectedGlazing.priceChange, packSize); //calculating price change for selected glazing
  };

  //event handler for when pack size option is changed
  const handlePackSizeChange = (event) => {
    const selectedPack = parseInt(event.target.value);
    setPackSize(selectedPack);
    if (packSize === -1) setPackSize(1);
    const selectedGlazing = glazingOptions.find(
      (option) => option.label === glazing
    );
    //calculating price multiplier for selected pack size
    updatePrice(
      selectedGlazing.priceChange,
      packSizeOptions.find((option) => option.size === selectedPack).multiplier
    );
  };

  //calculating price of selected roll configuration based on the formula
  const updatePrice = (glazingPrice, packMultiplier) => {
    const basePrice = rollPrice;
    const newPrice = (basePrice + glazingPrice) * packMultiplier;
    const priceLabel = document.getElementById(`price-label-${priceLabelId}`);
    setTotalPrice(newPrice);
    priceLabel.textContent = `$ ${newPrice.toFixed(2)}`; //dyamically updating the price label of each Roll card
  };

  //event handler for when 'Add to Cart' button is clicked
  const handleAddToCart = () => {
    if (packSize === -1) setPackSize(1);
    pushToCart(rollType, glazing, packSize, totalPrice);
  };

  function pushToCart(type, glaze, pack, price) {
    displayPopup(type, glaze, pack, price);
    const pushRoll = {
      rollIndex: Date.now(),
      rollType: type,
      rollGlaze: glaze,
      rollPack: pack,
      rollPrice: price,
      rollImage: imageSource,
      rollAltText: imageAltText,
    };
    updateCartStatus(pushRoll);
  }

  function displayPopup(rollType, glazing, packSize, totalPrice) {
    const popupContainer = document.getElementById("popup");
    const dynamicContent = `
      <div id="prompt">
          <h3>Added to cart:</h3>
          <h2 id="roll-type">${rollType}</h2>
          <h3 id="glaze">${glazing} glazing</h3>
          <h3 id="pack">Pack of ${packSize}</h3>
          <h3 id="pricing">Price: $${totalPrice.toFixed(2)}</h3>
      </div>
      `;

    popupContainer.innerHTML = dynamicContent; //dynamically populating HTML content within the container

    //revealing the popup
    popupContainer.classList.remove("hidden");
    popupContainer.classList.add("visible");

    //hiding the popup after 3 seconds
    setTimeout(() => {
      popupContainer.classList.remove("visible");
      popupContainer.classList.add("hidden");
    }, 3000);
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageSource} alt={imageAltText} />
      </div>
      <h1>{rollType}</h1>

      <form action="#">
        {" "}
        {/*form to take user input before adding to the cart*/}
        <div className="row-1">
          <label htmlFor="glazing-options">Glazing: </label>
          <select
            name="glazing"
            className="glazing"
            id="glazing-options"
            onChange={handleGlazingChange}
          >
            {/* dynamically populating dropdown menu */}
            {/*“Source: [React] - How to use the map method in React.” 
            Accessed: Sep. 29, 2024. [Online]. 
            Available: https://www.shecodes.io/athena/7184-how-to-use-the-map-method-in-react */}
            {glazingOptions.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="row-2">
          <label id={packSizeID} htmlFor={`${packSizeSet}-pack-size`}>
            Pack size:{" "}
          </label>
          {/* row-2 of product-card defines the pack size using radio buttons for user input */}
          <input
            type="radio"
            id={`${packSizeID}-1`}
            name={`${packSizeSet}-pack-size`}
            value="1"
            onChange={handlePackSizeChange}
            style={radioStyle()}
          />
          <label
            className={`${packSizeID}-1`}
            htmlFor={`${packSizeID}-1`}
            style={radioLabelStyle(1)}
          >
            1
          </label>
          <input
            type="radio"
            id={`${packSizeID}-3`}
            name={`${packSizeSet}-pack-size`}
            value="3"
            onChange={handlePackSizeChange}
            style={radioStyle()}
          />
          <label
            className={`${packSizeID}-3`}
            htmlFor={`${packSizeID}-3`}
            style={radioLabelStyle(3)}
          >
            3
          </label>
          <input
            type="radio"
            id={`${packSizeID}-6`}
            name={`${packSizeSet}-pack-size`}
            value="6"
            onChange={handlePackSizeChange}
            style={radioStyle()}
          />
          <label
            className={`${packSizeID}-6`}
            htmlFor={`${packSizeID}-6`}
            style={radioLabelStyle(6)}
          >
            6
          </label>
          <input
            type="radio"
            id={`${packSizeID}-12`}
            name={`${packSizeSet}-pack-size`}
            value="12"
            onChange={handlePackSizeChange}
            style={radioStyle()}
          />
          <label
            className={`${packSizeID}-12`}
            htmlFor={`${packSizeID}-12`}
            style={radioLabelStyle(12)}
          >
            12
          </label>
        </div>
        <div className="row-3">
          {" "}
          {/* row-3 of product-card displays the price with an Add to Cart button */}
          <label
            htmlFor="add-to-cart"
            className="price"
            id={`price-label-${priceLabelId}`}
          >
            $ {rollPrice}
          </label>
          {/* adding data-index attribute to uniquely identify each 'Add to Cart' button */}
          <button
            type="button"
            className="add-to-cart"
            data-index={buttonIndex}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </form>
    </div>
  );
};

/* validating prop types */
/* Source: “Typechecking With PropTypes – React.” 
Accessed: Sep. 22, 2024. [Online]. 
Available: https://legacy.reactjs.org/docs/typechecking-with-proptypes.html */
Roll.propTypes = {
  imageSource: PropTypes.string.isRequired,
  imageAltText: PropTypes.string.isRequired,
  rollType: PropTypes.string.isRequired,
  rollPrice: PropTypes.number.isRequired,
  packSizeID: PropTypes.string.isRequired,
  buttonIndex: PropTypes.number.isRequired,
  packSizeSet: PropTypes.string.isRequired,
};

export default Roll;
