const pathToJsons = "./Jsons/";

//Array functions

function getRandomElementFromArray(arr) {
  const randomNum = Math.floor(Math.random() * arr.length);
  const result = arr[randomNum];
  return result;
}

function removeFromArray(el, array) {
  const index = array.indexOf(el);
  if (index !== -1) {
    array.splice(index, 1);
  }
}

//Functions to update the product

function updateText(el, text) {
  document.getElementById(el).innerHTML = text;
}

function updateImage(el, link) {
  let imageLink = link;
  if (Array.isArray(link)) {
    imageLink = link[0];
  }
  document.getElementById(el).src = imageLink;
}

function updateURL(el, link) {
  document.getElementById(el).href = link;
}

function updateProduct(product) {
  updateText("product-title", product.title);
  updateText(
    "product-price",
    `${product.retail_price / 100} ${product.price_currency}`
  );
  updateText("product-brand", product.brand);
  updateText("product-description", product.product_description);
  updateImage("product-img", product.image_url);
  updateURL("store-link", product.web_url);
}

function getAProduct() {
  const product = getRandomElementFromArray(finalList);
  if (product) {
    updateProduct(product);
    removeFromArray(product, finalList);
  } else {
    // Remove everything and add error message (if there isn't one)
    if (document.getElementById("error-message") === null) {
      hideElement("photo-and-link");
      hideElement("product-info");

      const node = document.createTextNode(
        "There are no more products with these characteristics"
      );
      const noProductsMsg = document.createElement("p");
      noProductsMsg.appendChild(node);
      noProductsMsg.setAttribute("id", "error-message");

      resultDiv.appendChild(noProductsMsg);
      resultDiv.classList.add("center-text");
    }
  }
}

//Cookie functions

function checkCookie(nameOfCookie) {
  let cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    if (cookie.includes(nameOfCookie)) {
      return cookie.split("=")[1];
    }
  }
}

//To fade in the result

const resultDiv = document.getElementById("result");

function fadeIn(el) {
  el.classList.add("show");
  el.classList.remove("hide");
}

//To make the loader appear and disappear

function showElement(ID) {
  let element = document.getElementById(ID);
  if (element !== null) {
    element.style.display = "block";
  }
}

function hideElement(ID) {
  let element = document.getElementById(ID);
  if (element !== null) {
    element.style.display = "none";
  }
}

let finalList = [];

async function main() {
  const selectedCategory = checkCookie("category").toLowerCase();
  let listOfProducts = [];

  showElement("loader");
  if (selectedCategory === "all") {
    const categories = await fetchJsonData("categories.json");
    const promises = categories.map((category) =>
      fetchJsonData(category.replace(/ /g, "").concat(".json"))
    );
    listOfProducts = await Promise.all(promises).then((data) => data.flat());
  } else {
    listOfProducts = await fetchJsonData(
      selectedCategory.replace(/ /g, "").concat(".json")
    );
  }
  hideElement("loader");

  const budget = parseInt(checkCookie("budget"));
  let withinBudget = [];

  if (budget === 101) {
    withinBudget = listOfProducts;
  } else {
    for (let product of listOfProducts) {
      if (product.retail_price / 100 <= budget) {
        withinBudget.push(product);
      }
    }
  }

  const character = checkCookie("character");

  for (let product of withinBudget) {
    if (product.character.includes(character)) {
      finalList.push(product);
    }
  }

  getAProduct();

  fadeIn(resultDiv);
}

main();

const randomizeAgainBtn = document.getElementById("randomize-again");
randomizeAgainBtn.addEventListener("click", getAProduct);
