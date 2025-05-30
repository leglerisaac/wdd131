const lettergrades = ['A', 'B', 'A'];
function gradeValue(letter){
    switch (letter) {
        case 'A':
        return 4;
        case 'B':
        return 3;
        case 'C':
        return 2;
        case 'D':
        return 1;
        default:
        return 0; // F or any other grade
    }
}
grades = lettergrades.map(letter => gradeValue(letter));
console.log(grades);

gpa = grades.reduce((total, grade) => total + grade, 0) / grades.length;
console.log(gpa); 
