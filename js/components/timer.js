class TimerComponent extends HTMLElement {

    connectedCallback() {

        this.innerHTML = `
            <p id="timerDisplay">
                Tiempo restante:
            </p>
        `;
    }

    update(timeText) {

        const timerDisplay =
            this.querySelector("#timerDisplay");

        timerDisplay.textContent =
            timeText;

    }

}

customElements.define(
    "timer-component",
    TimerComponent
);