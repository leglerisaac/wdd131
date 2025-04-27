const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.src = "https://picsum.photos/200";
newImage.alt = "New Image";
document.body.appendChild(newImage);

const newSection = document.createElement("section");
newSection.innerHTML = "<h2>DOM Basics</h2> <p>This was added through Javascript</p>";
document.body.appendChild(newSection);