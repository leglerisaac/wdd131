
const menuButton = document.getElementById("menu-button");
const menu = document.querySelector("nav");
const modal = document.createElement("dialog")
const gallery = document.querySelector(".gallery");

modal.innerHTML = "<img><button class='close-viewer'>X</button>"
document.body.appendChild(modal);

function toggleMenu () {
    menu.classList.toggle("hide");
}

function handleResize() {
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

function closeModal() {
    modal.close()
}


menuButton.addEventListener("click", toggleMenu);
window.addEventListener("resize", handleResize);
gallery.addEventListener("click", (event) => {
    const img = event.target.closest("img");
    const src = img.getAttribute("src").split("-")[0] + "-full.jpeg";
    const alt = img.getAttribute("alt");
    console.log(src);
    modal.querySelector("img").setAttribute("src", src);
    modal.querySelector("img").setAttribute("alt", alt);
    modal.showModal();
    const closeButton = document.querySelector(".close-viewer");
    closeButton.addEventListener("click", closeModal)
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
})

handleResize();