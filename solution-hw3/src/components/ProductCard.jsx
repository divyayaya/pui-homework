import React from "react";
import PropTypes from "prop-types";
import "../styles/styles.css";

/* component ProductCard has the following props */
export const ProductCard = ({
  imageSource,
  imageAltText,
  rollName,
  rollPrice,
  packSizeID,
  buttonIndex,
  packSizeSet,
}) => {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={imageSource} alt={imageAltText} />
      </div>
      <h1>{rollName}</h1>

      <form action="#">
        {" "}
        {/* form to take user input before adding to the cart */}
        <div className="row-1">
          <label htmlFor="glazing-options">Glazing: </label>
          <select name="glazing" className="glazing" id="glazing-options">
            <option value="Keep original">Keep original</option>
            <option value="Sugar milk">Sugar milk</option>
            <option value="Vanilla milk">Vanilla milk</option>
            <option value="Double chocolate">Double chocolate</option>
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
          />
          <label htmlFor={`${packSizeID}-1`}>1</label>
          <input
            type="radio"
            id={`${packSizeID}-3`}
            name={`${packSizeSet}-pack-size`}
            value="3"
          />
          <label htmlFor={`${packSizeID}-3`}>3</label>
          <input
            type="radio"
            id={`${packSizeID}-6`}
            name={`${packSizeSet}-pack-size`}
            value="6"
          />
          <label htmlFor={`${packSizeID}-6`}>6</label>
          <input
            type="radio"
            id={`${packSizeID}-12`}
            name={`${packSizeSet}-pack-size`}
            value="12"
          />
          <label htmlFor={`${packSizeID}-12`}>12</label>
        </div>
        <div className="row-3">
          {" "}
          {/* row-3 of product-card displays the price with an Add to Cart button */}
          <label htmlFor="add-to-cart" className="price">
            ${rollPrice}
          </label>
          {/* adding data-index attribute to uniquely identify each 'Add to Cart' button */}
          <button
            type="button"
            className="add-to-cart"
            data-index={buttonIndex}
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
ProductCard.propTypes = {
  imageSource: PropTypes.string.isRequired,
  imageAltText: PropTypes.string.isRequired,
  rollName: PropTypes.string.isRequired,
  rollPrice: PropTypes.number.isRequired,
  packSizeID: PropTypes.string.isRequired,
  buttonIndex: PropTypes.number.isRequired,
  packSizeSet: PropTypes.string.isRequired,
};

export default ProductCard;
