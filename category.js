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

const categories = document.getElementsByClassName("category-button");
const allButton = document.getElementById("all-button");

const categoryAndIcon = {
  Clothes: "fa-tshirt",
  Electronics: "fa-robot",
  Decoration: "fa-couch",
  "Sports and Outdoors": "fa-football-ball",
  Games: "fa-gamepad",
  Hobbies: "fa-palette",
  Books: "fa-book-open",
  Cooking: "fa-cookie-bite",
  Accessories: "fa-shopping-bag",
};

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

function hideAllIcons() {
  const icons = document.getElementsByClassName("fas");
  for (icon of icons) {
    icon.classList.add("invisible");
  }
}

for (let category of categories) {
  category.addEventListener("click", () => {
    selectOrDeselect(category);
    showOrHideIcon(category.innerHTML);
    allButton.classList.remove("black-selected");
  });
}

allButton.addEventListener("click", () => {
  allButton.classList.toggle("black-selected");
  if (allButton.classList.contains("black-selected")) {
    selectAll(categories);
    showAllIcons();
  } else {
    deselectAll(categories);
    hideAllIcons();
  }
});

const dropDownDiv = document.getElementById("select-div");
let cookieValue = [];

function checkWhatCookieValue() {
  if (window.getComputedStyle(dropDownDiv).display === "none") {
    let categoryCollection = document.getElementsByClassName("selected");
    if (!categoryCollection.length) {
      categoryCollection = categories;
    }
    for (let category of categoryCollection) {
      cookieValue.push(category.innerHTML);
    }
  } else {
    if (dropDown.value === "all") {
      for (let category of categories) {
        cookieValue.push(category.innerHTML);
      }
    } else {
      cookieValue = dropDown.value;
    }
  }
  return cookieValue;
}

continueBtn.addEventListener("click", () => {
  checkWhatCookieValue();
  setCookie("category", cookieValue);
});
