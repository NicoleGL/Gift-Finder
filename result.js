const pathToJsons = './Jsons/'

function getRandomElementFromArray(arr) {
    const randomNum = Math.floor(Math.random() * arr.length);
    const result = arr[randomNum]
    return result;
}

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
    updateText("product-price", `${product.retail_price / 100} ${product.price_currency}`);
    updateText("product-brand", product.brand);
    updateText("product-description", product.product_description);
    updateImage("product-img", product.image_url);
    updateURL("store-link", product.web_url);
}


function checkCookie(nameOfCookie) {
    let cookies = document.cookie.split(";");

    for (let cookie of cookies) {
        if (cookie.includes(nameOfCookie)) {
            return cookie.split("=")[1];
        }
    }
}




async function main() {
    const selectedCategory = checkCookie("category").toLowerCase();
    let listOfProducts = [];

    if (selectedCategory === "all") {
        const categories = await fetchJsonData("categories.json");
        for (let category of categories) {
            let products = await fetchJsonData(category.replace(/ /g, "").concat(".json"));
            listOfProducts = listOfProducts.concat(products);
        }
    } else {
        listOfProducts = await fetchJsonData(selectedCategory.replace(/ /g, "").concat(".json"));
    }

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
    let finalList = [];

    for (let product of withinBudget) {
        if (product.character.includes(character)) {
            finalList.push(product);
        }
    }

    const product = getRandomElementFromArray(finalList);

    updateProduct(product);
}


main();



