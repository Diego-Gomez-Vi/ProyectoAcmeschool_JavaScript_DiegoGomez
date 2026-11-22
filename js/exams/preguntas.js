import {
    getExams,
    updateExam
} from "../data/storage.js";

const selectedExamCode =
    localStorage.getItem("selectedExam");

const selectedExamTitle =
    document.getElementById("selectedExamTitle");

const exams = getExams();

const selectedExam = exams.find(
    exam => exam.codigo === selectedExamCode
);

const questionForm =
    document.getElementById("questionForm");

const questionsTableBody =
    document.getElementById("questionsTableBody");

let editingQuestionId = null;

if (selectedExam) {

    selectedExamTitle.textContent =
        `Examen seleccionado: ${selectedExam.codigo} - ${selectedExam.titulo}`;

}

if (!selectedExam.preguntas) {
    selectedExam.preguntas = [];
}

console.log("Examen seleccionado:", selectedExam);

function renderQuestions() {

    questionsTableBody.innerHTML = "";

    selectedExam.preguntas.forEach((question, index) => {

        questionsTableBody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${question.pregunta}</td>
                <td>${question.correcta}</td>
                <td>
                    <button class="btn-edit">
                        Editar
                    </button>

                    <button class="btn-delete">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

}

renderQuestions();

questionForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const pregunta =
        document.getElementById("pregunta").value.trim();

    const respuestaA =
        document.getElementById("respuestaA").value.trim();

    const respuestaB =
        document.getElementById("respuestaB").value.trim();

    const respuestaC =
        document.getElementById("respuestaC").value.trim();

    const respuestaD =
        document.getElementById("respuestaD").value.trim();

    const respuestaCorrecta =
        document.getElementById("respuestaCorrecta").value;

    const newQuestion = {
        id: Date.now(),

        pregunta,

        respuestas: [
            {
                opcion: "A",
                texto: respuestaA,
                correcta: respuestaCorrecta === "A"
            },
            {
                opcion: "B",
                texto: respuestaB,
                correcta: respuestaCorrecta === "B"
            },
            {
                opcion: "C",
                texto: respuestaC,
                correcta: respuestaCorrecta === "C"
            },
            {
                opcion: "D",
                texto: respuestaD,
                correcta: respuestaCorrecta === "D"
            }
        ],

        correcta: respuestaCorrecta
    };

    selectedExam.preguntas.push(newQuestion);

    console.log("Pregunta agregada:", selectedExam);

    updateExam(selectedExam);

    renderQuestions();

    questionForm.reset();

});

console.log("Módulo de preguntas cargado");