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

grades = lettergrades.map(letter => gradeValue(letter)); // use map to convert the grades to their values
console.log(grades);