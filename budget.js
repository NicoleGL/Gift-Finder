const slider = document.getElementById("slider");
const budgetText = document.getElementById("budget-text");
const continueBtn = document.getElementById("continue-btn");

function onChange() {
    if (slider.value === "101") {
        budgetText.innerHTML = "Any budget";
    } else {
        budgetText.innerHTML = `$${slider.value} or less`;
    }
}

slider.addEventListener('input', onChange);
continueBtn.addEventListener("click", () => setCookie("budget", slider.value));