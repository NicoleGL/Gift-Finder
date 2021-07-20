const pathToJsons = './jsons/'

async function fetchJsonData(nameOfJson) {
    const pathToFile = pathToJsons.concat(nameOfJson);
    const response = await fetch(pathToFile, { 'method': 'get', 'mode': "no-cors" });
    const data = response.json();
    return data;
}

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

async function main() {
    const categories = await fetchJsonData("categories.json");
    const category = getRandomElementFromArray(categories);

    const listOfProducts = await fetchJsonData(category.replace(/ /g, "").concat(".json"));
    const product = getRandomElementFromArray(listOfProducts);

    updateProduct(product);
}


main();



