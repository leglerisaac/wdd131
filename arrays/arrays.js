const steps = ["one", "two", "three"];
function listTemplate(step) {
    console.log(step); // log the step to the console
    return `<li>${step}</li>`;
}
const stepsHtml = steps.map(listTemplate);

document.getElementById("myList").innerHTML = stepsHtml.join("");// set the innerHTML