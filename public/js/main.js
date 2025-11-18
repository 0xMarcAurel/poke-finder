const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
let isMenuOpen = false;

hamburger.addEventListener("click", () => {
  if (isMenuOpen === false) {
    navLinks.style.display = "flex";
    isMenuOpen = true;
  } else {
    navLinks.style.display = "none";
    isMenuOpen = false;
  }
});

document.addEventListener("click", (event) => {
  if (
    isMenuOpen &&
    !event.target.closest(".header") &&
    !event.target.closest(".hamburger")
  ) {
    navLinks.style.display = "none";
    isMenuOpen = false;
  }
});
