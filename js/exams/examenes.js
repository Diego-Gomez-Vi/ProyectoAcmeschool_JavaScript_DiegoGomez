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
                    <button
                        class="btn-edit"
                        data-codigo="${exam.codigo}"
                    >
                        Editar
                    </button>

                    <button
                        class="btn-delete"
                        data-codigo="${exam.codigo}"
                    >
                        Eliminar
                    </button>

                    <button
                        class="btn-questions"
                        data-codigo="${exam.codigo}"
                    >
                        Preguntas
                    </button>
                </td>
            </tr>
        `;
    });

    const deleteButtons =
        document.querySelectorAll(".btn-delete");

    deleteButtons.forEach(button => {

        button.addEventListener("click", () => {

            const examCode =
                button.dataset.codigo;

            deleteExam(examCode);

        });

    });

    const editButtons =
        document.querySelectorAll(".btn-edit");

    editButtons.forEach(button => {

        button.addEventListener("click", () => {

            const examCode =
                button.dataset.codigo;

            editExam(examCode);

        });

    });

    const questionButtons =
        document.querySelectorAll(".btn-questions");

    questionButtons.forEach(button => {

        button.addEventListener("click", () => {

            const examCode =
                button.dataset.codigo;

            localStorage.setItem(
                "selectedExam",
                examCode
            );

            window.location.href =
                "./preguntas.html";

        });

    });

}

renderExams();

function deleteExam(examCode) {

    const exams = getExams();

    const filteredExams = exams.filter(
        exam => exam.codigo !== examCode
    );

    saveExams(filteredExams);

    renderExams();
}

function editExam(examCode) {

    const exams = getExams();

    const exam = exams.find(
        exam => exam.codigo === examCode
    );

    if (!exam) return;

    document.getElementById("codigo").value =
        exam.codigo;

    document.getElementById("titulo").value =
        exam.titulo;

    document.getElementById("tiempo").value =
        exam.tiempo;

    document.getElementById("aprobacion").value =
        exam.aprobacion;

    document.getElementById("descripcion").value =
        exam.descripcion;

    editingExamCode = examCode;

    submitExamBtn.textContent =
        "Actualizar Examen";
}

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
            exam.codigo === codigo &&
            exam.codigo !== editingExamCode
    );

    if (examExists) {

        alert(
            "Ya existe un examen con ese código"
        );

        return;
    }

    if (editingExamCode) {

        const examIndex = exams.findIndex(
            exam => exam.codigo === editingExamCode
        );

        exams[examIndex] = {
            codigo,
            titulo,
            tiempo,
            aprobacion,
            descripcion
        };

        editingExamCode = null;

        submitExamBtn.textContent =
            "Guardar Examen";

    } else {

        const newExam = {
            codigo,
            titulo,
            tiempo,
            aprobacion,
            descripcion
        };

        exams.push(newExam);

    }

    saveExams(exams);

    renderExams();

    examForm.reset();

});

console.log("Módulo de exámenes cargado");