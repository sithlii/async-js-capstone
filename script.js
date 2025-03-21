document.addEventListener("DOMContentLoaded", () => {
    fetch('https://fe-students.onrender.com/api/users')
    .then(res => res.json())
    .then(data => {
        const studentList = document.getElementById('studentList');
        window.studentArray = [];

        data.results.forEach(student => {
            const studObj = {name: student.name, weight: 1};
            window.studentArray.push(studObj);

            const studElement = document.createElement('div');
            studElement.classList.add('studentInfo');
            studElement.setAttribute('attribute', student.name);

            const nameElement = document.createElement('span');
            nameElement.textContent = `${student.name}: `;

            const weightChance = document.createElement('span');
            weightChance.textContent = `${studObj.weight}`;
            weightChance.classList.add('studentInfo');

            const weightContainer = document.createElement('div');
            weightContainer.classList.add('weight-container');

            const decreaseBtn = document.createElement('button');
            decreaseBtn.classList.add('decrease-btn');
            decreaseBtn.textContent = '<';
            decreaseBtn.addEventListener('click', () => {
                if (studObj.weight > 1) {
                    studObj.weight--;
                    weightChance.textContent = `${studObj.weight}`;
                }
            });

            const increaseBtn = document.createElement('button');
            increaseBtn.classList.add('increase-btn');
            increaseBtn.textContent = '>';
            increaseBtn.addEventListener('click', () => {
                studObj.weight++;
                weightChance.textContent = `${studObj.weight}`;
            });

            weightContainer.appendChild(decreaseBtn);
            weightContainer.appendChild(increaseBtn);

            studElement.appendChild(nameElement);
            studElement.appendChild(weightChance);
            studElement.appendChild(weightContainer);
            studentList.appendChild(studElement);
        })
    })
    .catch(error => console.error("Error fetching students: ", error))
})


function randomStudent() {
    const loader = document.getElementById('loader');
    loader.classList.add('active');
    setTimeout(() => {
        const weightedStudList = [];
        window.studentArray.forEach(student => {
            for (let i = 0; i < student.weight; i++) {
                weightedStudList.push(student.name);
            }
        });

        const randomStudent = weightedStudList[Math.floor(Math.random() * weightedStudList.length)]
        let chosenStud = document.getElementById('currentStudent');
        
        chosenStud.innerText = randomStudent;

        highlightStudent(randomStudent);
        loader.classList.remove('active');
    }, 1500);
}

function highlightStudent(stud) {
    const prevStudent = document.querySelector('.studentInfo.selected');
    if (prevStudent) {
        prevStudent.classList.remove('selected');
    }

    const studEles = document.querySelectorAll('.studentInfo');
    studEles.forEach(student => {
        if (student.getAttribute('attribute') === stud) {
            student.classList.add('selected');
        }
    });
}