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
            <div class="exam-card">

                <h3>${exam.titulo}</h3>

                <p>
                    Código: ${exam.codigo}
                </p>

                <p>
                    Tiempo: ${exam.tiempo} minutos
                </p>

                <p>
                    Aprobación: ${exam.aprobacion}%
                </p>

                <button
                    class="btn-start"
                    data-codigo="${exam.codigo}"
                >
                    Presentar Examen
                </button>

            </div>
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