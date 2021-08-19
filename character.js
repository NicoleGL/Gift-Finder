const buttons = document.querySelectorAll(".character-button");

buttons.forEach((element) => {
  element.addEventListener("click", () => {
    deselectAll(buttons);
    selectOrDeselect(element);
    setCookie("character", element.id);
  });
});
