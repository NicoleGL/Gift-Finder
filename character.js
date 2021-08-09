const buttons = document.querySelectorAll(".character-button");

buttons.forEach((element) => {
  element.addEventListener("click", () => {
    setCookie("character", element.id);
  });
});
