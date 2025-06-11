let count = 1;

addButton = document.getElementById("add");
addButton.addEventListener("click", addParticipant);

participantForm = document.querySelector("form");
participantForm.addEventListener("submit", submitForm);

summary = document.getElementById("summary")
summary.style.display = "none";

function participantTemplate(count) {
    return`
        <section class="participant${count}">
            <p>Participant ${count}</p>
            <div class="item">
              <label for="fname"> First Name<span>*</span></label>
              <input id="fname${count}" type="text" name="fname" value="" required />
            </div>
            <div class="item activities">
              <label for="activity">Activity #<span>*</span></label>
              <input id="activity${count}" type="text" name="activity" />
            </div>
            <div class="item">
              <label for="fee">Fee ($)<span>*</span></label>
              <input id="fee${count}" type="number" name="fee" />
            </div>
            <div class="item">
              <label for="date">Desired Date <span>*</span></label>
              <input id="date${count}" type="date" name="date" />
            </div>
            <div class="item">
              <p>Grade</p>
              <select>
                <option selected value="" disabled selected></option>
                <option value="1">1st</option>
                <option value="2">2nd</option>
                <option value="3">3rd</option>
                <option value="4">4th</option>
                <option value="5">5th</option>
                <option value="6">6th</option>
                <option value="7">7th</option>
                <option value="8">8th</option>
                <option value="9">9th</option>
                <option value="10">10th</option>
                <option value="11">11th</option>
                <option value="12">12th</option>
              </select>
            </div>
        </section>
    `;
}

function successTemplate(info) {
    return `
    <h2>Registration Complete</h2>
    <p>Thank you ${info.name} for registering.</p>
    <p>You have registered ${info.count} participants and owe $${info.total} in fees.</p>
  `;
}

function totalFees() {
    // the selector below lets us grab any element that has an id that begins with "fee"
    let feeElements = document.querySelectorAll("[id^=fee]");
    console.log("nodelist: " + feeElements);
    // querySelectorAll returns a NodeList. It's like an Array, but not exactly the same.
    // The line below is an easy way to convert something that is list-like to an actual Array so we can use all of the helpful Array methods...like reduce
    // The "..." is called the spread operator. It "spreads" apart the list, then the [] we wrapped it in inserts those list items into a new Array.
    feeElements = [...feeElements];
    console.log("Array:" + feeElements);
    // sum up all of the fees. Something like Array.reduce() could be very helpful here :) Or you could use a Array.forEach() as well.
    // Remember that the text that was entered into the input element will be found in the .value of the element.
    const total = feeElements.reduce((total, feeElement) => total + number(feeElement.value), 0);
    // once you have your total make sure to return it!'
    console.log(total);
    return total;
}

function addParticipant() {
    count++;
    const newParticipant = participantTemplate(count);
    addButton.insertAdjacentHTML("beforebegin", newParticipant);
}

function submitForm(event) {
    event.preventDefault();
    
    const total = totalFees();
    const adultName = participantForm.adult_name.value;
    
    summaryHTML = successTemplate({
        name: adultName,
        count: count,
        total: total
    });
    
    summary.style.display = "block";
    summary.innerHTML = summaryHTML;
}

