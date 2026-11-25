class ExamCard extends HTMLElement {

    connectedCallback() {

        const titulo =
            this.getAttribute("titulo");

        const codigo =
            this.getAttribute("codigo");

        const tiempo =
            this.getAttribute("tiempo");

        const aprobacion =
            this.getAttribute("aprobacion");

        const preguntas =
            this.getAttribute("preguntas");

        this.innerHTML = `
            <div class="exam-card">

                <h3>${titulo}</h3>

                <p>
                    Código: ${codigo}
                </p>

                <p>
                    Preguntas: ${preguntas}
                </p>

                <p>
                    Tiempo: ${tiempo} minutos
                </p>

                <p>
                    Aprobación: ${aprobacion}%
                </p>

                <button
                    class="btn-start"
                    data-codigo="${codigo}"
                >
                    Presentar Examen
                </button>

            </div>
        `;
    }

}

customElements.define(
    "exam-card",
    ExamCard
);