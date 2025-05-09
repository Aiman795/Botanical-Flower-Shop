const orderForm = document.getElementById("order-form");
const orderButton = document.getElementById("order-button");
const cartContainer = document.getElementById("cart-container");
const orderSummaryContainer = document.getElementById("order-summary");
const errorMessageContainer = document.getElementById("error-message");
let cartItems = [];

// Event Listener for placing an order
orderButton.addEventListener("click", async (e) => {
  e.preventDefault();

  // Check if cart is empty before proceeding
  if (cartItems.length === 0) {
    showError("Your cart is empty. Please add some items to the cart.");
    return;
  }

  // Prepare order data
  const orderData = {
    items: cartItems,
    totalAmount: calculateTotalAmount(),
  };

  try {
    // Send order data to the server
    const response = await fetch("/order/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (response.ok) {
      // Order success: Show success message and reset cart
      showToast(result.message || "Your order has been placed successfully!", "success");
      cartItems = []; // Clear cart
      updateCartDisplay();
      updateOrderSummary();
    } else {
      // Order failure: Show error message
      showError(result.message || "Order failed. Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    showError("Something went wrong. Please try again.");
  }
});

// Function to update the cart display
const updateCartDisplay = () => {
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  cartContainer.innerHTML = "";
  cartItems.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");
    itemDiv.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });
};

// Function to update the order summary
const updateOrderSummary = () => {
  const totalAmount = calculateTotalAmount();
  orderSummaryContainer.innerHTML = `
    <p>Total Items: ${cartItems.length}</p>
    <p>Total Amount: $${totalAmount}</p>
  `;
};

// Function to calculate total amount of the cart
const calculateTotalAmount = () => {
  return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
};

// Function to add an item to the cart
const addToCart = (item) => {
  cartItems.push(item);
  updateCartDisplay();
  updateOrderSummary();
};

// Function to remove an item from the cart
const removeFromCart = (index) => {
  cartItems.splice(index, 1);
  updateCartDisplay();
  updateOrderSummary();
};

// Function to show error messages
const showError = (message) => {
  errorMessageContainer.style.display = "block";
  errorMessageContainer.innerText = message;
};

// Function to show toast notifications
function showToast(message, type) {
  const toast = document.createElement("div");
  toast.classList.add("toast", type);
  toast.textContent = message;

  document.getElementById("toast-container").appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

