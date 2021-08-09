const pathToJsons = "./Jsons/";
const dropDown = document.getElementById("category");
const continueBtn = document.getElementById("continue-btn");

function capitalizeCategories(categories) {
  const array = [];
  for (let category of categories) {
    const upperCategory = category[0].toUpperCase() + category.slice(1);
    array.push(upperCategory);
  }
  return array;
}

function renderData(categories) {
  const capitalizedCategories = capitalizeCategories(categories);
  for (let category of capitalizedCategories) {
    const option = document.createElement("option");
    option.value = category;
    option.innerHTML = category;
    dropDown.appendChild(option);
  }
}

async function main() {
  const categories = await fetchJsonData("categories.json");
  renderData(categories);
}

main();

continueBtn.addEventListener("click", () =>
  setCookie("category", dropDown.value)
);
