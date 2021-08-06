// const pathToJsons = "./Jsons/";
// const dropDown = document.getElementById("category");
// const continueBtn = document.getElementById("continue-btn");

// function capitalizeCategories(categories) {
//   const array = [];
//   for (let category of categories) {
//     const upperCategory = category[0].toUpperCase() + category.slice(1);
//     array.push(upperCategory);
//   }
//   return array;
// }

// function renderData(categories) {
//   const capitalizedCategories = capitalizeCategories(categories);
//   for (let category of capitalizedCategories) {
//     const option = document.createElement("option");
//     option.value = category;
//     option.innerHTML = category;
//     dropDown.appendChild(option);
//   }
// }

// async function main() {
//   const categories = await fetchJsonData("categories.json");
//   renderData(categories);
// }

// main();

// continueBtn.addEventListener("click", () =>
//   setCookie("category", dropDown.value)
// );

const categories = document.getElementsByClassName("category-button");
const allCategories = document.getElementById("all-categories");

const categoryAndIcon = {
  Clothes: "fa-tshirt",
  Electronics: "fa-robot",
  Decoration: "fa-couch",
  "Sports &amp; Outdoors": "fa-football-ball",
  Games: "fa-gamepad",
  Hobbies: "fa-palette",
  Books: "fa-book-open",
  Cooking: "fa-cookie-bite",
  Accessories: "fa-shopping-bag",
};

function selectOrDeselect(el) {
  el.classList.toggle("selected");
}

function selectAll() {
  for (let category of categories) {
    category.classList.add("selected");
  }
}

function showOrHideIcon(category) {
  const iconClass = categoryAndIcon[category];
  const icon = document.getElementsByClassName(iconClass)[0];
  icon.classList.toggle("invisible");
}

function showAllIcons() {
  const icons = document.getElementsByClassName("fas");
  for (icon of icons) {
    icon.classList.remove("invisible");
  }
}

for (let category of categories) {
  category.addEventListener("click", () => {
    selectOrDeselect(category);
    showOrHideIcon(category.innerHTML);
  });
}

allCategories.addEventListener("click", () => {
  selectAll();
  showAllIcons();
});
