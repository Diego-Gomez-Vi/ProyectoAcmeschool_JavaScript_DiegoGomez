import {
    getExams
} from "../data/storage.js";

const examCode =
    localStorage.getItem("examToResolve");

const examTitle =
    document.getElementById("examTitle");

const exams = getExams();

const selectedExam = exams.find(
    exam => exam.codigo === examCode
);

if (selectedExam) {

    examTitle.textContent =
        `${selectedExam.codigo} - ${selectedExam.titulo}`;

}

console.log("Presentar examen cargado");