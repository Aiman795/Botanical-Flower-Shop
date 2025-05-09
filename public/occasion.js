document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const likeButtons = document.querySelectorAll(".like-button");

  // Add to Cart functionality
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = button.dataset.name;
      const productPrice = button.dataset.price;
      alert(`Added ${productName} for $${productPrice} to the cart.`);
    });
  });

  // Like functionality
  likeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const productName = button.dataset.name;
      alert(`Liked ${productName}.`);
      button.querySelector("i").style.color = "red";
    });
  });
});
