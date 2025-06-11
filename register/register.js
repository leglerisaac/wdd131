import templates from "./templates.js"
let count = 1;

const addButton = document.getElementById("add");
addButton.addEventListener("click", addParticipant);

const participantForm = document.querySelector("form");
participantForm.addEventListener("submit", submitForm);

const summary = document.getElementById("summary")
summary.style.display = "none";

function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
    // Remember that the text that was entered into the input element will be found in the .value of the element.
    const total = feeElements.reduce((total, feeElement) => total + Number(feeElement.value), 0);
    // once you have your total make sure to return it!'
    return total;
}

function addParticipant() {
    count++;
    const newParticipant = templates.participantTemplate(count);
    addButton.insertAdjacentHTML("beforebegin", newParticipant);
}

function submitForm(event) {
    event.preventDefault();
    
    const total = totalFees();
    const adultName = participantForm.adult_name.value;
    
    const summaryHTML = templates.successTemplate({
        name: adultName,
        count: count,
        total: total
    });

    // window.location.reload();
    participantForm.style.display = "none";
    summary.innerHTML = summaryHTML;
    summary.style.display = "block";
}

