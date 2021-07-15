let slider = document.getElementById("slider")
let budgetText = document.getElementById("budget-text")

function onChange() {
    if (slider.value === "101") {
        budgetText.innerHTML = "Any budget";
    } else {
        budgetText.innerHTML = `${slider.value}€ or less`;
    }
}

slider.addEventListener('input', onChange)