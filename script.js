let countdownInterval;

function startCountdown() {
    console.log("Starting countdown...");
    const dateInput = document.getElementById("datePicker");
    const countdown = document.getElementById("countdown");
    const stopBtn = document.getElementById("stopBtn");

    const selectedDate = new Date(dateInput.value);
    const today = new Date();

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    if (!dateInput.value || selectedDate < today.setHours(0, 0, 0, 0)) {
        countdown.innerText = "⚠️ Please select a future date!";
        stopBtn.style.display = "none";
        return;
    }

    stopBtn.style.display = "inline-block";

    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const target = new Date(dateInput.value).getTime();
        const distance = target - now;

        if (distance <= 0) {
            clearInterval(countdownInterval);
            countdown.innerText = "🎊 It's your special day!";
            stopBtn.style.display = "none";
            // Add effects
            countdown.classList.add("celebrate");
            setTimeout(() => countdown.classList.remove("celebrate"), 2000);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdown.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s left`;
    }, 1000);
}

function stopCountdown() {
    const countdown = document.getElementById("countdown");
    const stopBtn = document.getElementById("stopBtn");
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        countdown.innerText = "⏹️ Countdown stopped.";
        stopBtn.style.display = "none";
        // Add stop effect
        countdown.classList.add("stopped");
        setTimeout(() => countdown.classList.remove("stopped"), 1000);
    }
}

window.onload = function () {
    const datePicker = document.getElementById("datePicker");
    const today = new Date().toISOString().split("T")[0];
    datePicker.setAttribute("min", today);

    if (!document.getElementById("stopBtn")) {
        const stopBtn = document.createElement("button");
        stopBtn.id = "stopBtn";
        stopBtn.innerText = "Stop Countdown";
        stopBtn.style.display = "none";
        stopBtn.onclick = stopCountdown;
        datePicker.parentNode.insertBefore(stopBtn, datePicker.nextSibling);
    }

    // Add event listener for the Start Countdown button
    const startBtn = document.getElementById("startBtn");
    if (startBtn) {
        startBtn.onclick = startCountdown;
    }
};
