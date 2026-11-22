import {
    getExams,
    saveExams
} from "../data/storage.js";

const currentSession = JSON.parse(
    localStorage.getItem("session")
);

if (!currentSession) {
    window.location.href = "./index.html";
}

const examForm =
    document.getElementById("examForm");

const examsTableBody =
    document.getElementById("examsTableBody");

const submitExamBtn =
    document.getElementById("submitExamBtn");

let editingExamCode = null;

function renderExams() {

    const exams = getExams();

    examsTableBody.innerHTML = "";

    exams.forEach(exam => {

        examsTableBody.innerHTML += `
            <tr>
                <td>${exam.codigo}</td>
                <td>${exam.titulo}</td>
                <td>${exam.tiempo} min</td>
                <td>${exam.aprobacion}%</td>
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

renderExams();

examForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const codigo =
        document.getElementById("codigo").value.trim();

    const titulo =
        document.getElementById("titulo").value.trim();

    const tiempo =
        document.getElementById("tiempo").value;

    const aprobacion =
        document.getElementById("aprobacion").value;

    const descripcion =
        document.getElementById("descripcion").value.trim();

    const exams = getExams();

    const examExists = exams.some(
        exam =>
            exam.codigo === codigo
    );

    if (examExists) {

        alert(
            "Ya existe un examen con ese código"
        );

        return;
    }

    const newExam = {
        codigo,
        titulo,
        tiempo,
        aprobacion,
        descripcion
    };

    exams.push(newExam);

    saveExams(exams);

    renderExams();

    examForm.reset();

});

console.log("Módulo de exámenes cargado");