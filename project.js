function setCookie(name, value) {
    document.cookie = `${name}=${value};path=/`;
}

async function fetchJsonData(nameOfJson) {
    const pathToFile = pathToJsons.concat(nameOfJson);
    const response = await fetch(pathToFile, { 'method': 'get', 'mode': "no-cors" });
    const data = response.json();
    return data;
}