document.addEventListener("click", (e) => {
  if (e.target.matches("#info")) {
    document.querySelector(".informacion").classList.toggle("none");
    let btn = document.querySelector(".info");

    if (btn.innerHTML == "Más") {
      btn.innerHTML = "Mostrar menos";
    } else {
      btn.innerHTML = "Más";
    }
  }
});
