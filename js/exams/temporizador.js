export function startTimer(
    initialSeconds,
    timerElement,
    onFinish
) {

    let timeRemaining = initialSeconds;

    function updateTimer() {

        const minutes =
            Math.floor(timeRemaining / 60);

        const seconds =
            timeRemaining % 60;

        timerElement.update(
            `Tiempo restante: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
        );
    }

    updateTimer();

    const interval = setInterval(() => {

        timeRemaining--;

        updateTimer();

        if (timeRemaining <= 0) {

            clearInterval(interval);

            onFinish();

        }

    }, 1000);
}