const themeSelector = document.querySelector("select");
const logo = document.querySelector("img");

function changeTheme() {
    let theme = themeSelector.value;
    if (theme == "dark") {
        document.body.classList.add("dark");
        logo.src = "byui-logo_white.png";        
    } else if (theme == "light") {
        document.body.classList.remove("dark");
        logo.src = "byui-logo_blue.webp";
    }
}

themeSelector.addEventListener('change', changeTheme);
