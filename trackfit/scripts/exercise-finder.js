import exercises from './exercises.mjs';

const searchButton = document.getElementById("search-button");
const filterButton = document.getElementById("filter-button");

function exerciseTemplate(exercise) {
	return `
    <div class="exercise">
        <h2 class="exercise_name">${exercise.name}</h2>
        <h3 class="exercise_primary-muscles">Primary Muscles: ${exercise.primaryMuscles.join(', ')}</h3>
        <h3 class="exercise_secondary-muscles">Secondary Muscles: ${exercise.secondaryMuscles.join(', ')}</h3>
        <h3 class="exercise_equipment">Equipment: ${exercise.equipment.join(', ')}</h3>
    </div>`;
}

function renderExercises(exerciseList) {
    const exerciseListElement = document.getElementById('exercise-list');
    const sortedList = exerciseList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    const exerciseHTML = sortedList.map(exercise => exerciseTemplate(exercise)).join('');
    exerciseListElement.innerHTML = exerciseHTML;
}

function searchExercises(query) {
    function searchCallback(exercises) {
        return (
            exercises.name.toLowerCase().includes(query) ||
            exercises.primaryMuscles.find((muscle) => muscle.toLowerCase().includes(query)) ||
            exercises.secondaryMuscles.find((muscle) => muscle.toLowerCase().includes(query)) ||
            exercises.equipment.find((item) => item.toLowerCase().includes(query))
        );
    }
    const filteredList = exercises.filter(searchCallback);
    const sortedList = filteredList.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    renderExercises(sortedList);
}

function searchHandler(event) {
    event.preventDefault();
    const query = document.getElementById('search').value.toLowerCase();
    searchExercises(query);
}

function filterHandler(event) {
    event.preventDefault();
    const selectedPrimaryMuscle = document.getElementById('primary-muscle').value.toLowerCase();
    const selectedSecondaryMuscle = document.getElementById('secondary-muscle').value.toLowerCase();
    const selectedEquipment = document.getElementById('equipment').value.toLowerCase();
    console.log(selectedPrimaryMuscle, selectedEquipment);
    const filteredList = exercises.filter(exercise => 
        (exercise.primaryMuscles.some(muscle => muscle.toLowerCase() === selectedPrimaryMuscle) || selectedPrimaryMuscle == "" )&&
        (exercise.secondaryMuscles.some(muscle => muscle.toLowerCase() === selectedSecondaryMuscle) || selectedSecondaryMuscle == "" )&&
        (exercise.equipment.some(equip => equip.toLowerCase() === selectedEquipment) || selectedEquipment == "")
    );
    if (filteredList.length === 0) {
        document.getElementById('exercise-list').innerHTML = '<h3 id="error">No exercises found matching your criteria.</h3>';
        return;
    } else {
        renderExercises(filteredList);
    }
}


searchButton.addEventListener('click', searchHandler);
filterButton.addEventListener('click', filterHandler);

renderExercises(exercises);