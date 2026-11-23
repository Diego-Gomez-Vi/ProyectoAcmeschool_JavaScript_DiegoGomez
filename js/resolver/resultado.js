const result = JSON.parse(
    localStorage.getItem("examResult")
);

const studentResult =
    document.getElementById("studentResult");

const examResultName =
    document.getElementById("examResultName");

const correctAnswers =
    document.getElementById("correctAnswers");

const percentageResult =
    document.getElementById("percentageResult");

const approvalResult =
    document.getElementById("approvalResult");

studentResult.textContent =
    result.estudiante;

examResultName.textContent =
    `Examen: ${result.examen}`;

correctAnswers.textContent =
    `Respuestas correctas: ${result.correctas} de ${result.total}`;

percentageResult.textContent =
    `Porcentaje obtenido: ${result.porcentaje}%`;

if (result.aprobado) {

    approvalResult.textContent =
        "✅ APROBADO";

    approvalResult.style.color =
        "#22c55e";

} else {

    approvalResult.textContent =
        "❌ NO APROBADO";

    approvalResult.style.color =
        "#ef4444";

}