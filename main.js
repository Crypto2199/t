
document.addEventListener("DOMContentLoaded", function () {
  const likeButtons = document.querySelectorAll(".like-btn");
  likeButtons.forEach(button => {
    button.addEventListener("click", () => {
      const icon = button.querySelector("i");
      if (icon.classList.contains("far")) {
        icon.classList.remove("far");
        icon.classList.add("fas", "liked");
      } else {
        icon.classList.remove("fas", "liked");
        icon.classList.add("far");
      }
    });
  });
});
