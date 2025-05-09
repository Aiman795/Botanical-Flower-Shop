// Example functionality: Alert when clicking on "Read More"
document.querySelectorAll(".read-more").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Redirecting to the full blog post...");
  });
});
