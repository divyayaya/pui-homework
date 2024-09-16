//Declaring Rolls objects with default attributes
let Rolls = [
    {
        type: 'Original cinnamon roll', //type of cinnamon roll
        price: 2.49, //base price
        glazing: 'Keep original', //glazing option
        packSize: 1, //size of the pack
        totalPrice: 2.49 //total price initialized to the base price
    },
    {
        type: 'Apple cinnamon roll',
        price: 3.49,
        glazing: 'Keep original',
        packSize: 1,
        totalPrice: 3.49
    },
    {
        type: 'Raisin cinnamon roll',
        price: 2.99,
        glazing: 'Keep original',
        packSize: 1,
        totalPrice: 2.99
    },
    {
        type: 'Walnut cinnamon roll',
        price: 3.49,
        glazing: 'Keep original',
        packSize: 1,
        totalPrice: 3.49
    },
    {
        type: 'Double-chocolate cinnamon roll',
        price: 3.99,
        glazing: 'Keep original',
        packSize: 1,
        totalPrice: 3.99
    },
    {
        type: 'Strawberry cinnamon roll',
        price: 3.99,
        glazing: 'Keep original',
        packSize: 1,
        totalPrice: 3.99
    }
];

let packSelection = []; //an array to store the pack size selection
let glazingSelection = []; //an array to store the glazing selection
let cart = []; //an array to store the items added to the cart
let numberOfItems = 0; //number of items in the cart; initialized to 0
let cartValue = 0; //total value of the cart; initialized to 0

//a function to determine the selected radio buttons and options from the dropdown menus
function getAllSelectedOptions() {
    //starting with empty arrays
    packSelection = [];
    glazingSelection = [];

    //going through each product card's form to determine selected values
    document.querySelectorAll('.product-card form').forEach(form => {
        const selectedGlazing = form.querySelector('select[name="glazing"]').value;
        glazingSelection.push(selectedGlazing); //pushing the selected glazing option onto the array
        const selectedPackSize = form.querySelector('input[name="pack-size"]:checked'); //retrieving selected radio buttons
        if (selectedPackSize) {
            packSelection.push(parseInt(selectedPackSize.value)); //pushing the integer value of the selected radio button onto the array
        } else {
            packSelection.push(1);  // Default case, when pack size has not been selected
        }
    });
}

function glazingChange(glazing) {
    let priceChange = 0; //initializing the price adaptation to 0
    switch (glazing) {
        case 'Vanilla milk':
            priceChange = 0.50; //Vanilla milk + $ 0.50
            break;
        case 'Double chocolate':
            priceChange = 1.50; //Double chocolate + $ 1.50
            break;
        default:
            priceChange = 0; //for Keep original and Sugar milk + $ 0.00
    }
    return priceChange;
}

function packChange(pack) {
    let priceChange = 0; //initializing the price adaptation to 0
    switch (pack) {
        //determining multipliers for selected pack size
        case 1:
            priceChange = 1;
            break;
        case 3:
            priceChange = 3;
            break;
        case 6:
            priceChange = 5;
            break;
        case 12:
            priceChange = 10;
    }
    return priceChange;
}

function pushToCart(index) {
    cart.push(Rolls[index]); //adding selected cinnamon roll configuration to the cart
    //dynamically populate the content and reveal popup using the displayPopup function
    displayPopup(Rolls[index].type, Rolls[index].glazing, Rolls[index].packSize, Rolls[index].totalPrice);
    cartValue += Rolls[index].totalPrice; //updating the price of the cart
    numberOfItems += 1; //incrementing the number of items in the cart
    updateCartStatus(numberOfItems, cartValue); //dynamically update the cart status

}

function updateCartStatus(number, total) {
    const cartValue = document.getElementById('cart-status');
    const dynamicContent = `
    <h4 id="number-of-items">${number} items</h4>
    <h5 id="total-cart-value">Total: $${total.toFixed(2)}</h5>
    `;

    cartValue.innerHTML = dynamicContent; //dynamically populating HTML content within the container
}

function displayPopup(rollType, glazing, packSize, totalPrice) {
    const popupContainer = document.getElementById('popup');
    const dynamicContent = `
        <div id="prompt">
            <h3>Added to cart:</h2>
            <h2 id="roll-type">${rollType}</h3>
            <h3 id="glaze">${glazing} glazing</h2>
            <h3 id="pack">Pack of ${packSize}</h2>
            <h3 id="pricing">Price: $${totalPrice.toFixed(2)}</h2>
        </div>
        `;

    popupContainer.innerHTML = dynamicContent; //dynamically populating HTML content within the container

    //revealing the popup
    popupContainer.classList.remove('hidden');
    popupContainer.classList.add('visible');

    //hiding the popup after 3 seconds
    setTimeout(() => {
        popupContainer.classList.remove('visible');
        popupContainer.classList.add('hidden');
    }, 3000);

}

function populateDropdown() {
    const dropdownContainer = document.getElementsByClassName('glazing')
    const dynamicContent = `
    <option value="Keep original">Keep original</option>
    <option value="Sugar milk">Sugar milk</option>
    <option value="Vanilla milk">Vanilla milk</option>
    <option value="Double chocolate">Double chocolate</option>
                        `;
    for (let i = 0; i < 6; i++)
        dropdownContainer[i].innerHTML = dynamicContent; //dynamically populating HTML content within the container for each product card
}

document.addEventListener('DOMContentLoaded', function () { //runs after page content has loaded
    populateDropdown();
    cart = [];
    const packs = document.querySelectorAll('input[name="pack-size"]');
    const glazing = document.querySelectorAll('select[name="glazing"]')
    const labels = document.querySelectorAll('label[for="add-to-cart"].price');
    const addToCart = document.querySelectorAll('button[type="button"]');

    //adding an event listener for change in radio button selection
    packs.forEach(radio => {
        radio.addEventListener('change', function () {
            getAllSelectedOptions(); //update the arrays of selected options
            for (let i = 0; i < 6; i++) {
                Rolls[i].totalPrice = Rolls[i].price; //initializing the total price to base price
                Rolls[i].packSize = packSelection[i]; //updating packSize attribute of the Rolls object with selection
                Rolls[i].glazing = glazingSelection[i]; //updating glazing attribute of the Rolls object with selection
                //calling glazingChange and packChange functions to determine price adaptation and calculate total price
                Rolls[i].totalPrice = (Rolls[i].price + glazingChange(Rolls[i].glazing)) * packChange(Rolls[i].packSize);
                labels[i].textContent = `$ ${Rolls[i].totalPrice.toFixed(2)}`; //dyamically updating the price label of each product card
            }
        });
    });

    //adding an event listener for change in dropdown option selection
    glazing.forEach((dropdown) => {
        dropdown.addEventListener('change', function () {
            getAllSelectedOptions(); //update the arrays of selected options
            for (let i = 0; i < Rolls.length; i++) {
                Rolls[i].totalPrice = Rolls[i].price; //initializing the total price to base price
                Rolls[i].packSize = packSelection[i]; //updating packSize attribute of the Rolls object with selection
                Rolls[i].glazing = glazingSelection[i]; //updating glazing attribute of the Rolls object with selection
                //calling glazingChange and packChange functions to determine price adaptation and calculate total price
                Rolls[i].totalPrice = (Rolls[i].price + glazingChange(Rolls[i].glazing)) * packChange(Rolls[i].packSize);
                labels[i].textContent = `$ ${Rolls[i].totalPrice.toFixed(2)}`; //dyamically updating the price label of each product card
            }
        });
    });

    //adding an event listener for when an 'Add to Cart' button is clicked
    addToCart.forEach(button => {
        button.addEventListener('click', function () {
            const productNumber = this.getAttribute('data-index'); //retrieving the product card where interaction took place using its unique index
            pushToCart(productNumber); // Pushing the product to cart
        });
    });

});