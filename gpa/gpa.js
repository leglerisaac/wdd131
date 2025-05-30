submitButton = document.getElementById('submitButton');
submitButton.addEventListener('click', clickHandler);

function getGrades(inputSelector) {
    grades = document.getElementById(inputSelector).value;
    let letters = grades.split(',').map(grade => grade.trim().toUpperCase());
    return letters;
}

function lookupGrade(grade) {
    switch (grade) {
        case 'A':
            return 4.0;
        case 'A-':
            return 3.67;
        case 'B+':
            return 3.33;
        case 'B':
            return 3.0;
        case 'B-':
            return 2.67;
        case 'C+':
            return 2.33;
        case 'C':
            return 2.0;
        case 'C-':
            return 1.67;
        case 'D+':
            return 1.33;
        case 'D':
            return 1.0;
        case 'F':
            return 0.0;
        default:
            console.error('Invalid grade:', grade);
            return null;
    }
}

function calculateGpa(grades) {
    let numbers = grades.map(grade => lookupGrade(grade));
    gpa = numbers.reduce((total, num) => total + num) / numbers.length;
    return gpa.toFixed(2);
}

function outputGpa(gpa, selector) {
    document.getElementById(selector).textContent = "GPA: " + gpa;
}

function clickHandler() {
    grades = getGrades('grades')
    gpa = calculateGpa(grades);
    outputGpa(gpa, 'output');
}
