document.addEventListener("DOMContentLoaded", () => {
  const orderTotalPrice = document.getElementById("order-total-price");
  const hiddenTotal = document.getElementById("hidden-total");

  // Fetch total price from localStorage
  const cartTotal = localStorage.getItem("cartTotal") || "0.00";
  orderTotalPrice.textContent = cartTotal;
  hiddenTotal.value = cartTotal;

  const orderForm = document.getElementById("order-form");
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("customerName").value;
    const address = document.getElementById("address").value;
    const contact = document.getElementById("contact").value;
    const total = hiddenTotal.value;

    try {
      const response = await fetch("/user/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerName, address, contact }),
      });

      const result = await response.json();
      if (response.ok) {
        // Show success modal
        showModal("Success", `Thank you for your order!\nTotal Payment: $${cartTotal}`);
      } else {
        // Show error modal
        showModal("Error", result.message);
      }

      // Clear cart data
      localStorage.removeItem("cart");
      localStorage.removeItem("cartTotal");

      // Redirect to the home page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Delay for user to see the popup

    } catch (error) {
      // Show error modal
      showModal("Error", "An error occurred while placing the order.");
    }
  });

  function showModal(title, message) {
    const modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
      <div class="modal-content">
        <h2>${title}</h2>
        <p>${message}</p>
        <button class="close-btn">Close</button>
      </div>
    `;
    document.body.appendChild(modal);

    // Close the modal when the button is clicked
    modal.querySelector(".close-btn").addEventListener("click", () => {
      modal.remove();
    });
  }
});