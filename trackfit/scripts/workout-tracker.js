function dateTemplate(timestamp) {
    const time_started = new Date(timestamp);
    return "Time Started: " + time_started.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
}

function exerciseTemplate() {
    return `
        <div class="exercise-card">
                    <input type="text" placeholder="Exercise Name" id="exercise-name${exerciseCount}" name="exercise-name${exerciseCount}">
                    <input type="text" placeholder="notes" id="exercise-notes${exerciseCount}" name="exercise-notes${exerciseCount}">
                    <table id="exercise-details${exerciseCount}">
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th><span aria-hidden="true" class="icon-checked">✅</span></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>
                                <label for="set-reps"></label>
                                <input type="number" value="0" class="set-reps" name="set-reps" min="0"></td>
                            <td>
                                <input type="number" value="0" class="set-weight" name="set-weight" min="0">
                                <label for="set-weight">lbs</label>
                            </td>
                            <td>
                                <label for="checkbox"></label>
                                <input type="checkbox" name="checkbox">
                            </td>
                        </tr>
                    </table>    
                    <div class="set-controls">
                        <button id="add-set${exerciseCount}">Add Set</button>
                        <button id="remove-set${exerciseCount}">Remove Set</button>
                        <button id="remove-exercise${exerciseCount}">Remove Exercise</button>
                    </div>
                </div>`;
}

function setTemplate(setNumber) {
    return `
    <tr>
        <td>${setNumber}</td>
        <td>
            <input type="number" value="0" class="set-reps" name="set-reps" min="0"></td>
        <td>
            <input type="number" value="0" class="set-weight" name="set-weight" min="0">
            <label for="set-weight">lbs</label>
        </td>
        <td>
            <input type="checkbox" name="checkbox">
        </td>
    </tr>`;
}


function addSet(event) {
    event.preventDefault();
    let targetExercise = event.target.id;
    setNumber = targetExercise[targetExercise.length - 1];
    count[setNumber]++;
    const newSet = setTemplate(count[setNumber]);
    event.target.parentElement.previousElementSibling.querySelector('tbody').insertAdjacentHTML('beforeend', newSet);
    
}

function removeSet(event) {
    event.preventDefault();
    let targetExercise = event.target.parentElement.previousElementSibling;
    let targetSet = targetExercise.id[targetExercise.id.length - 1];
    console.log(targetSet);
    // if (targetSet > 1) {
        targetExercise.removeChild(targetExercise.lastElementChild);
        count[targetSet]--;
    // } else {
        // alert("You cannot remove the only set from an exercise. Please try removing the exercise instead.");
    // }

}

function removeExercise(event) {
    event.preventDefault();
    let targetExercise = event.target.parentElement.parentElement;
    let exerciseIndex = targetExercise.id[targetExercise.id.length - 1];
    targetExercise.remove();
    event.preventDefault();
    exerciseCount--;
    delete count[exerciseIndex];
}

function addExercise(event) {
    event.preventDefault();
    exerciseCount += 1;
    count[exerciseCount] = 1;
    const newExercise = exerciseTemplate();
    exerciseContainer.insertAdjacentHTML('beforeend', newExercise);
    document.getElementById("add-set" + exerciseCount).addEventListener("click", addSet);
    document.getElementById("remove-set" + exerciseCount).addEventListener("click", removeSet)
    document.getElementById("remove-exercise" + exerciseCount).addEventListener("click", removeExercise);
}

function finishWorkout(event) {
    event.preventDefault();
    const exercisesDone = Object.keys(count).length;
    const setsDone = Object.values(count).reduce((i, sum) => sum + i, 0);
    document.body.innerHTML = `<h1>Congrats on another great workout, bro.</h1>
    <h2 class="details">Exercises Done: ${exercisesDone}</h2>
    <h2 class="details">Sets Completed: ${setsDone}</h2>
    `;
}


let exerciseCount = 1;
let count = {
    "1": 1
};

const exerciseContainer = document.getElementById("exercise-container");

const addExerciseButton = document.getElementById("add-exercise");
const finishButton = document.getElementById("finish-workout");
const addSetButton = document.getElementById("add-set1");
const removeSetButton = document.getElementById("remove-set1");
const removeExerciseButton = document.getElementById("remove-exercise1");

addExerciseButton.addEventListener("click", addExercise);
finishButton.addEventListener("click", finishWorkout);
addSetButton.addEventListener("click", addSet);
removeSetButton.addEventListener("click", removeSet);
removeExerciseButton.addEventListener("click", removeExercise);



const time_started_field = document.getElementById("time-started");
const timestamp = Date.now();
time_started_field.innerHTML = dateTemplate(timestamp);