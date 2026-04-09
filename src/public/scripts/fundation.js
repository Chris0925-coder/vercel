const date = new Date();
const footerDate = document.querySelector(".date");

const menu = document.querySelector(".btn-menu");
const nav = document.querySelector(".nav-bar");

menu.addEventListener("click", (e) => {
  nav.classList.toggle("show");

  navListen();
});

function navListen() {
  nav.addEventListener("click", (e) => {
    if (e.target.tagName == "A") nav.classList.remove("show");
  });
}

footerDate.append(date.getFullYear());
