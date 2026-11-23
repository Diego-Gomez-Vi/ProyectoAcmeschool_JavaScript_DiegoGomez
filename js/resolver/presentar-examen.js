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

const studentForm =
    document.getElementById("studentForm");

studentForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const nombre =
        document.getElementById("studentName").value.trim();

    const identificacion =
        document.getElementById("studentId").value.trim();

    const studentData = {
        nombre,
        identificacion,
        examen: examCode
    };

    localStorage.setItem(
        "studentExamData",
        JSON.stringify(studentData)
    );

    window.location.href = "./examen.html";

});