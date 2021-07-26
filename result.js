const pathToJsons = './jsons/'

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
    let category = checkCookie("category");
    if (category === "all") {
        const categories = await fetchJsonData("categories.json");
        category = getRandomElementFromArray(categories);
    }

    const listOfProducts = await fetchJsonData(category.replace(/ /g, "").concat(".json"));
    const budget = parseInt(checkCookie("budget"));
    const withinBudget = [];
    for (let product of listOfProducts) {
        if (product.retail_price / 100 <= budget) {
            withinBudget.push(product);
        }
    }

    const product = getRandomElementFromArray(withinBudget);

    updateProduct(product);
}


main();



