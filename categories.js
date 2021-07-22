const pathToJsons = './jsons/'
const dropDown = document.getElementById("category");

async function fetchJsonData(nameOfJson) {
    const pathToFile = pathToJsons.concat(nameOfJson)
    const response = await fetch(pathToFile, { 'method': 'get', 'mode': "no-cors" })
    const data = response.json()
    return data

}

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
        option.value = category
        option.innerHTML = category;
        dropDown.appendChild(option);
    }
}

async function main() {
    const categories = await fetchJsonData('categories.json')
    renderData(categories);
}

main();
