import {
    getExams
} from "../data/storage.js";

import {
    startTimer
} from "../exams/temporizador.js";

const examTitle =
    document.getElementById("examTitle");

const studentInfo =
    document.getElementById("studentInfo");

const timerElement =
    document.getElementById("timer");

const questionsContainer =
    document.getElementById("questionsContainer");

const studentData = JSON.parse(
    localStorage.getItem("studentExamData")
);

const exams = getExams();

const selectedExam = exams.find(
    exam =>
        exam.codigo === studentData.examen
);

if (!selectedExam) {

    window.location.href =
        "./resolver.html";

}

examTitle.textContent =
    selectedExam.titulo;

studentInfo.textContent =
    `${studentData.nombre} - ${studentData.identificacion}`;

function renderQuestions() {

    questionsContainer.innerHTML = "";

    selectedExam.preguntas.forEach(
        (question, index) => {

            questionsContainer.innerHTML += `
                <div class="question-card">

                    <h3>
                        ${index + 1}. ${question.pregunta}
                    </h3>

                    ${question.respuestas.map(response => `
                        <div class="option">

                            <label>
                                <input
                                    type="radio"
                                    name="question-${question.id}"
                                    value="${response.opcion}"
                                >

                                ${response.opcion}) ${response.texto}

                            </label>

                        </div>
                    `).join("")}

                </div>
            `;
        }
    );

}

renderQuestions();

startTimer(
    Number(selectedExam.tiempo) * 60,
    timerElement,
    () => {

        alert(
            "El tiempo del examen ha finalizado"
        );

    }
);