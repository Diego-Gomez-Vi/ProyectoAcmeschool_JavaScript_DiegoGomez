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
                    <button
                        class="btn-edit"
                        data-id="${question.id}"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-delete"
                        data-id="${question.id}"
                    >
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });

    const deleteButtons =
        document.querySelectorAll(".btn-delete");

    const editButtons =
        document.querySelectorAll(".btn-edit");

    editButtons.forEach(button => {

        button.addEventListener("click", () => {

            const questionId =
                button.dataset.id;

            editQuestion(questionId);

        });

    });

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const questionId =
                button.dataset.id;

            deleteQuestion(questionId);

        });

    });

}

renderQuestions();

function deleteQuestion(questionId) {

    selectedExam.preguntas =
        selectedExam.preguntas.filter(
            question =>
                question.id !== Number(questionId)
        );

    updateExam(selectedExam);

    renderQuestions();
}

function editQuestion(questionId) {

    const question =
        selectedExam.preguntas.find(
            question =>
                question.id === Number(questionId)
        );

    if (!question) return;

    document.getElementById("pregunta").value =
        question.pregunta;

    document.getElementById("respuestaA").value =
        question.respuestas[0].texto;

    document.getElementById("respuestaB").value =
        question.respuestas[1].texto;

    document.getElementById("respuestaC").value =
        question.respuestas[2].texto;

    document.getElementById("respuestaD").value =
        question.respuestas[3].texto;

    document.getElementById("respuestaCorrecta").value =
        question.correcta;

    editingQuestionId = question.id;

    document.getElementById(
        "submitQuestionBtn"
    ).textContent =
        "Actualizar Pregunta";
}

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

    if (editingQuestionId) {

        const questionIndex =
            selectedExam.preguntas.findIndex(
                question =>
                    question.id === editingQuestionId
            );

        selectedExam.preguntas[questionIndex] = {

            id: editingQuestionId,

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

        editingQuestionId = null;

        document.getElementById(
            "submitQuestionBtn"
        ).textContent =
            "Guardar Pregunta";

    } else {

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
    }

    updateExam(selectedExam);

    renderQuestions();

    questionForm.reset();

});

console.log("Módulo de preguntas cargado");