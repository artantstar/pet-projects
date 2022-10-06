const inputs = document.querySelectorAll(".filters input");
const reset = document.querySelector(".btn-reset");
const nextPicture = document.querySelector(".btn-next");
const img = document.querySelector("img");
const loadPicture = document.querySelector(".btn-load--input");
const savePicture = document.querySelector(".btn-save");
const fullscreen = document.querySelector(".fullscreen");
const btns = document.querySelectorAll(".btn");

function filtersUpdate() {
  let unit = this.dataset.sizing;
  document.documentElement.style.setProperty(
    `--${this.name}`,
    this.value + unit
  );
  let output = document.querySelector(
    `input[name="${this.name}"]~output[name="result"]`
  );
  output.value = this.value;
}

function filtersReset() {
  for (let i = 0; i < inputs.length; i++) {
    let input = inputs[i];
    let value = input.getAttribute("value");
    let unit = input.dataset.sizing;
    let output = document.querySelector(
      `input[name="${input.name}"]~output[name="result"]`
    );
    output.value = value;
    input.value = value;
    document.documentElement.style.setProperty(`--${input.name}`, value + unit);
  }
}

const date = new Date();
const currentHour = date.getHours();
let times;
if (currentHour < 6) {
  times = "night";
}
if (currentHour >= 6 && currentHour < 12) {
  times = "morning";
}
if (currentHour >= 12 && currentHour < 18) {
  times = "day";
}
if (currentHour >= 18) {
  times = "evening";
}

const urlFolder =
  "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/";
let acc = 0;
let url;
function getImage() {
  acc++;
  if (acc <= 9) {
    url = urlFolder + times + "/" + 0 + acc + ".jpg";
  }
  if (acc > 9) {
    url = urlFolder + times + "/" + acc + ".jpg";
  }
  if (acc > 20) {
    acc = 1;
    url = urlFolder + times + "/" + 0 + acc + ".jpg";
  }
  img.setAttribute("src", `${url}`);
}

loadPicture.addEventListener("change", () => {
  const file = loadPicture.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    let src = reader.result;
    img.setAttribute("src", `${src}`);
    loadPicture.value = null;
  };
  reader.readAsDataURL(file);
});

function saveImage() {
  let canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  let ctx = canvas.getContext("2d");
  ctx.filter = getComputedStyle(img).filter.replace();
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  let link = document.createElement("a");
  link.download = "image.png";
  link.href = canvas.toDataURL();
  link.click();
}

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
});

btns.forEach((elem) => {
  elem.addEventListener("click", () => {
    btns.forEach((elem) => {
      elem.classList.remove("btn-active");
    });
    elem.classList.add("btn-active");
  });
});

inputs.forEach((item) => item.addEventListener("input", filtersUpdate));
reset.addEventListener("click", filtersReset);
nextPicture.addEventListener("click", getImage);
savePicture.addEventListener("click", saveImage);
