const btns = document.querySelectorAll(".btn");
const fullscreen = document.querySelector(".fullscreen");
const pianoKeys = document.querySelectorAll(".piano-key");
const piano = document.querySelector(".piano");

const audio = {};
const keys = {};

btns.forEach((elem) => {
  elem.addEventListener("click", () => {
    if (!elem.classList.contains("btn-active")) {
      btns.forEach((elem) => {
        elem.classList.toggle("btn-active");
      });
      pianoKeys.forEach((elem) => {
        elem.classList.toggle("letter");
      });
    }
  });
});

fullscreen.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else if (document.exitFullscreen) document.exitFullscreen();
});

for (let i = 0; i < pianoKeys.length; i++) {
  if (pianoKeys[i].dataset.note != undefined) {
    let note = pianoKeys[i].dataset.note;
    let letter = pianoKeys[i].dataset.letter;
    audio[`${note}`] = new Audio(`./assets/audio/${note}.mp3`);
    keys[`${note}`] = letter;
  }
}

function playAudio(note) {
  audio[`${note}`].currentTime = 0;
  audio[`${note}`].play();
}

const start = (event) => {
  event.target.classList.add("piano-key-active");
  const note = event.target.dataset.note;
  playAudio(note);
};

const stop = (event) => {
  event.target.classList.remove("piano-key-active");
};

const startOverPosition = (event) => {
  if (event.target.classList.contains("piano-key")) {
    const note = event.target.dataset.note;
    playAudio(note);
    event.target.classList.add("piano-key-active");
  }
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", start);
    elem.addEventListener("mouseout", stop);
  });
};

const stopOverPosition = (event) => {
  event.target.classList.add("piano-key-active");
  pianoKeys.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.removeEventListener("mouseover", start);
    elem.removeEventListener("mouseout", stop);
  });
};

piano.addEventListener("mousedown", startOverPosition, false);
document.addEventListener("mouseup", stopOverPosition);

function startKey(letter) {
  pianoKeys.forEach((elem) => {
    if (elem.dataset.letter === letter) {
      elem.classList.add("piano-key-active");
    }
  });
}

function stopKey(letter) {
  pianoKeys.forEach((elem) => {
    if (elem.dataset.letter === letter) {
      elem.classList.remove("piano-key-active");
    }
  });
}

window.addEventListener("keydown", (event) => {
  if (event.repeat) return;
  for (let key in keys) {
    if (event.code.substr(-1) === keys[key]) {
      playAudio(key);
      startKey(keys[key]);
    }
  }
});

window.addEventListener("keyup", (event) => {
  for (let key in keys) {
    if (event.code.substr(-1) === keys[key]) {
      stopKey(keys[key]);
    }
  }
});
