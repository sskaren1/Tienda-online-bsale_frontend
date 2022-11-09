// Fixed navigation function
function fixedNavigation() {
  const header = document.querySelector("header");
  header.classList.toggle("fijo", window.scrollY > 0);
}

export default fixedNavigation;