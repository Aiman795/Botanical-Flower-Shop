// Get cart data from local storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get cart items container and update the content
const cartItemsContainer = document.getElementById("cart-items");
const totalItemsElement = document.getElementById("total-items");
const totalPriceElement = document.getElementById("total-price");

function updateCart() {
  // Clear the cart container
  cartItemsContainer.innerHTML = "";

  // If the cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalItemsElement.textContent = 0;
    totalPriceElement.textContent = "0.00";
    localStorage.setItem("cartTotal", "0.00");
    return;
  }

  let totalPrice = 0;
  let totalItems = 0;

  // Render cart items
  cart.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.classList.add("cart-item");

    // Calculate price based on quantity
    const itemTotal = item.price * item.quantity;

    itemElement.innerHTML = `
      <p>${item.name}</p>
      <p>Price: $${item.price.toFixed(2)}</p>
      <input type="number" min="1" value="${
        item.quantity
      }" onchange="updateQuantity(${index}, this.value)" />
      <p>Total: $${itemTotal.toFixed(2)}</p>
      <button onclick="removeFromCart(${index})">Delete</button>
    `;
    cartItemsContainer.appendChild(itemElement);

    totalItems += item.quantity;
    totalPrice += itemTotal;
  });

  // Update total items and total price
  totalItemsElement.textContent = totalItems;
  totalPriceElement.textContent = totalPrice.toFixed(2);
  localStorage.setItem("cartTotal", totalPrice.toFixed(2));
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateQuantity(index, quantity) {
  const newQuantity = parseInt(quantity, 10);
  if (newQuantity > 0) {
    cart[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart(); // Re-render the updated cart
  }
}

function removeFromCart(index) {
  // Remove the item at the given index
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart(); // Re-render the updated cart
}

function proceedToCheckout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    return;
  }
  window.location.href = "/order"; // Navigate to the order page
}

// Initial render - call updateCart to load the cart items when the page loads
updateCart();
