// Function to add items to the "like" list
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

// Function to remove an item from the liked items list
function removeFromLike(productName) {
  // Get the current liked items from localStorage
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];

  // Filter out the item to be removed
  const updatedItems = likedItems.filter((item) => item.name !== productName);

  // Save the updated list back to localStorage
  localStorage.setItem("likedItems", JSON.stringify(updatedItems));

  // Re-render the liked items
  renderLikedItems();
}

// Function to render liked items on the "like.html" page
function renderLikedItems() {
  const likedItems = JSON.parse(localStorage.getItem("likedItems")) || [];
  const likeContainer = document.getElementById("like-items");

  if (likedItems.length === 0) {
    likeContainer.innerHTML = "<p>No liked items yet!</p>";
  } else {
    likeContainer.innerHTML = likedItems
      .map(
        (item) =>
          `<div class="liked-item">
              <h2>${item.name}</h2>
              <p>Price: $${item.price}</p>
              <button style="background-color: pink;" onclick="removeFromLike('${item.name}')">Delete</button>
            </div>`
      )
      .join("");
  }
}
