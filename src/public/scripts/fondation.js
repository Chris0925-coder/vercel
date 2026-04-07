const date = new Date();
const footerDate = document.querySelector(".date");

const menu = document.querySelector(".btn-menu");
const nav = document.querySelector(".nav-bar");

menu.addEventListener("click", () => {
  nav.classList.toggle("show");
});

footerDate.append(date.getFullYear());
