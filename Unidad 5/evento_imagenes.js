//mouseover
const imgs = document.querySelectorAll("img");

imgs.forEach((img) => {
  img.addEventListener("mouseover", function () {
    img.style.width = "200px";
    img.style.height = "200px";
    img.style.borderColor = "red";
    img.style.borderWidth = "3px solid transparent";
  });
  img.addEventListener("mouseout", function () {
    img.style.width = "100px";
    img.style.height = "100px";
    img.style.borderColor = "transparent";
    img.style.borderWidth = "none";
  });
});
