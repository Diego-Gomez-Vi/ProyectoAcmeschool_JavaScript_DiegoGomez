import {
    getExams
} from "../data/storage.js";

const examList =
    document.getElementById("examList");

function renderExams() {

    console.log("renderExams ejecutado");

    const exams = getExams();

    console.log("Exámenes encontrados:", exams);

    examList.innerHTML = "";

    exams.forEach(exam => {

        examList.innerHTML += `
            <exam-card
                titulo="${exam.titulo}"
                codigo="${exam.codigo}"
                tiempo="${exam.tiempo}"
                aprobacion="${exam.aprobacion}"
            ></exam-card>
        `;
    });

    const startButtons =
        document.querySelectorAll(".btn-start");

    startButtons.forEach(button => {

        button.addEventListener("click", () => {

            const examCode =
                button.dataset.codigo;

            localStorage.setItem(
                "examToResolve",
                examCode
            );

            window.location.href =
                "./presentar-examen.html";

        });

    });
}

renderExams();

console.log("Módulo de resolución cargado");