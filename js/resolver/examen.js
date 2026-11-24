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

const finishExamBtn =
    document.getElementById("finishExamBtn");

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

        finishExam();
    }
);

finishExamBtn.addEventListener("click", finishExam);

function finishExam() {

    let correctAnswers = 0;

    selectedExam.preguntas.forEach(question => {

        const selectedOption =
            document.querySelector(
                `input[name="question-${question.id}"]:checked`
            );

        if (
            selectedOption &&
            selectedOption.value === question.correcta
        ) {
            correctAnswers++;
        }

    });

    const totalQuestions =
        selectedExam.preguntas.length;

    const percentage =
        (correctAnswers / totalQuestions) * 100;

    const approved =
        percentage >= Number(selectedExam.aprobacion);

    const result = {

        estudiante:
            studentData.nombre,

        identificacion:
            studentData.identificacion,

        examen:
            selectedExam.titulo,

        correctas:
            correctAnswers,

        total:
            totalQuestions,

        porcentaje:
            percentage.toFixed(2),

        porcentajeRequerido:
            selectedExam.aprobacion,

        aprobado:
            approved

    };

    localStorage.setItem(
        "examResult",
        JSON.stringify(result)
    );

    window.location.href =
        "./resultado.html";
}