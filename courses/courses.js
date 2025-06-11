// courses.js
const aCourse = {
    code: "CSE121b",
    name: "Javascript Language",
    sections: [
        { sectionNum: 1, roomNum: 'STC 353', enrolled: 26, days: 'TTh', instructor: 'Bro T'},
        { sectionNum: 2, roomNum: 'STC 347', enrolled: 28, days: 'TTh', instructor: 'Sis A'}
    ],
    enrollStudent: function(sectionNum) {
        const sectionIndex = this.sections.findIndex((section) => section.sectionNum);
        if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled++;
            renderSections(this.sections);
        }
    },
    dropStudent: function(sectionNum) {
        const sectionIndex = this.sections.findIndex((section) => section.sectionNum);
        if (sectionIndex >= 0) {
            this.sections[sectionIndex].enrolled--;
            renderSections(this.sections);
        }
    }
};


function setCourse(aCourse) {
    const courseNameHTML = document.getElementById("courseName");
    const courseCodeHTML = document.getElementById("courseCode");
    courseNameHTML.innerHTML = aCourse.name;
    courseCodeHTML.innerHTML = aCourse.code;
}

function sectionTemplate(section) {
    return`
    <tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
    </tr>
    `
}

function renderSections(sections) {
    const html = sections.map(sectionTemplate);
    document.getElementById("sections").innerHTML = html.join('');
}

document.getElementById("enrollStudent").addEventListener("click", aCourse.enrollStudent.bind(aCourse));
document.getElementById("dropStudent").addEventListener("click", aCourse.dropStudent.bind(aCourse));

setCourse(aCourse);
renderSections(aCourse.sections);