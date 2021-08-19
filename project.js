function setCookie(name, value) {
  document.cookie = `${name}=${value};path=/`;
}

async function fetchJsonData(nameOfJson) {
  const pathToFile = pathToJsons.concat(nameOfJson);
  const response = await fetch(pathToFile, { method: "get", mode: "no-cors" });
  const data = response.json();
  return data;
}

function selectOrDeselect(el) {
  el.classList.toggle("selected");
}

function selectAll(elements) {
  for (let element of elements) {
    element.classList.add("selected");
  }
}

function deselectAll(elements) {
  for (let element of elements) {
    element.classList.remove("selected");
  }
}
