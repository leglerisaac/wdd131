import recipes from './recipes.mjs';

const searchButton = document.getElementById("search-button");

function random() {
    return Math.floor(Math.random() * recipes.length);
}

function getRandomListEntry(list) {
    return list[random()]
}

function recipeTemplate(recipe) {
	return `<figure class="recipe">
	    <img src="${recipe.image}" alt="Image of ${recipe.name}" />
	    <figcaption>
		    <ul class="recipe__tags">
			    ${tagsTemplate(recipe.tags)}
		    </ul>
		    <h2><a href="${recipe.url}">${recipe.name}</a></h2>
		    <p class="recipe__ratings">
			    ${ratingTemplate(recipe.rating)}
            </p>
		    <p class="recipe__description">
			    ${recipe.description}
		    </p>
        </figcaption>
    </figure>`;
}

function tagsTemplate(tags) {
	// loop through the tags list and transform the strings to HTML
    let html = tags.map(tag => `<li>${tag}</li>`).join('');
    return html;
}

function ratingTemplate(rating) {
	// begin building an html string using the ratings HTML written earlier as a model.
	let html = `
    <span
	class="rating"
	role="img"
	aria-label="Rating: ${rating} out of 5 stars">`
    // our ratings are always out of 5, so create a for loop from 1 to 5
        for (let i = 0; i < 5; i++) {
            // check to see if the current index of the loop is less than our rating
            if (i < rating) {
                // if so then output a filled star
                html += `
                <span aria-hidden="true" class="icon-star">⭐</span>`;
            } else {
                // else output an empty star
                html += `
                <span aria-hidden="true" class="icon-star-empty">☆</span>`;
            }
        }
	// after the loop, add the closing tag to our string
	html += `
    </span>`
	// return the html string
	return html
}

function renderRecipes(recipeList) {
	// get the element we will output the recipes into
    const recipeListElement = document.getElementById('recipes');
	// use the recipeTemplate function to transform our recipe objects into recipe HTML strings
    const recipeHTML = recipeList.map(recipe => recipeTemplate(recipe)).join('');
	// Set the HTML strings as the innerHTML of our output element.
    recipeListElement.innerHTML = recipeHTML;
}

function filterRecipes(query) {
    function searchCallback(recipes) {
        return (
            recipes.name.toLowerCase().includes(query) ||
            recipes.description.toLowerCase().includes(query) ||
            recipes.tags.find((tag) => tag.toLowerCase().includes(query)) ||
            recipes.recipeIngredient.find((ingredient) => ingredient.toLowerCase().includes(query))
        );
    }
    const filteredList = recipes.filter(searchCallback);
    const sortedList = filteredList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    renderRecipes(sortedList);
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    filterRecipes(query);
}

function init() {
  // get a random recipe
  const recipe = getRandomListEntry(recipes)
  // render the recipe with renderRecipes.
  renderRecipes([recipe]);
}

init();

searchButton.addEventListener('click', searchHandler);