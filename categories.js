const data = {
    categories: [
        "clothes",
        "accesories",
        "electronics",
        "decoration",
        "sport & outdoors",
        "games",
        "hobbies",
        "books",
        "cooking",
    ]
}
const dropDown = document.getElementById("category");


function capitalizeCategories(categories) {
    const array = [];
    for (let category of categories) {
        const upperCategory = category[0].toUpperCase() + category.slice(1);
        array.push(upperCategory);
    }
    return array;
}

function renderStaticData() {
    const categories = capitalizeCategories(data.categories);
    for (let category of categories) {
        const option = document.createElement("option");
        option.value = category
        option.innerHTML = category;
        dropDown.appendChild(option);
    }
}



async function renderDataFromAPI() {
    const data = await fetch("https://60f6af7118254c00176e03d3.mockapi.io/api/v1/categories")
        .then(res => res.json())
        .then(data => data)
        .catch(e => console.log(e))

    for (let element of data) {
        const option = document.createElement("option");
        option.value = element.type
        option.innerHTML = element.type;
        dropDown.appendChild(option);
    }

}

renderStaticData()
