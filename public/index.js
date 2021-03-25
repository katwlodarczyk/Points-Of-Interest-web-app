// HAMBURGER MENU

function hamburgerMenu() {
    var x = document.getElementById("nav"),
      z = document.getElementById("hamburger");
    var z_states = [
      '<img src="assets/icons/menu.svg" alt="menu">',
      '<img src="assets/icons/Close.svg" alt="close">',
    ];
    if (z.innerHTML == z_states[0]) {
      z.innerHTML = z_states[1];
      x.classList.add("responsive");
    } else {
      z.innerHTML = z_states[0];
      x.classList.remove("responsive");
    }
  }

// AUTOMATIC DATE UPDATE FOR FOOTER

const footerYear = document.getElementById("year");
const date = new Date();
const year = date.getFullYear();

footerYear.innerText = year;