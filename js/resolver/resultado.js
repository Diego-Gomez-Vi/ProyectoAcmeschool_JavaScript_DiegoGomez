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

const requiredPercentage =
    document.getElementById("requiredPercentage");

studentResult.textContent =
    result.estudiante;

examResultName.textContent =
    `Examen: ${result.examen}`;

correctAnswers.textContent =
    `Respuestas correctas: ${result.correctas} de ${result.total}`;

percentageResult.textContent =
    `Porcentaje obtenido: ${result.porcentaje}%`;

requiredPercentage.textContent =
    `Porcentaje requerido: ${result.porcentajeRequerido}%`;

if (result.aprobado) {

    approvalResult.innerHTML = `
        <div class="result-status success">

            <h2>✅ Aprobado</h2>

            <p>
                ¡Enhorabuena! Has superado el porcentaje mínimo requerido.
            </p>

        </div>
    `;

} else {

    approvalResult.innerHTML = `
        <div class="result-status fail">

            <h2>❌ No Aprobado</h2>

            <p>
                Necesitas alcanzar el porcentaje mínimo de aprobación para superar este examen.
            </p>

        </div>
    `;

}