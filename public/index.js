// index.js - JavaScript to handle adding products to the cart

// Function to add product to the cart
function addToCart(productName, productPrice) {
  // Get existing cart from local storage or initialize an empty cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add the new product to the cart
  cart.push({ name: productName, price: productPrice });

  // Save the updated cart to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Display a confirmation message
  alert(`${productName} has been added to your cart!`);
}

// Add event listeners to all 'Add to Cart' buttons
document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", function () {
    const productName = this.getAttribute("data-name");
    const productPrice = parseFloat(this.getAttribute("data-price"));

    // Call the function to add the item to the cart
    addToCart(productName, productPrice);
  });
});

//like page

function addToLike(productName, productPrice) {
  // Get the current liked items from localStorage or initialize an empty array
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

  // Check if the product is already in the liked list
  const exists = likedItems.some((item) => item.name === productName);

  if (!exists) {
    // Add the new product to the liked items array
    likedItems.push({ name: productName, price: productPrice });
    // Save back to localStorage
    localStorage.setItem("likedItems", JSON.stringify(likedItems));
    alert(`${productName} has been added to your liked items!`);
  } else {
    alert(`${productName} is already in your liked items.`);
  }
}
