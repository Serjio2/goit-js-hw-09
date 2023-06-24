
const buttonStartColorsChangeEl = document.querySelector(".btn-start");
const buttonStopColorsChangeEl = document.querySelector(".btn-stop");

// console.log(buttonStartColorsChangeEl);
// console.log(buttonStopColorsChangeEl);

let timerId = null;

buttonStartColorsChangeEl.addEventListener("click", startColorChange);
buttonStopColorsChangeEl.addEventListener("click", stopColorChange)


function startColorChange() {
    // console.log("Start");
    
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    buttonStartColorsChangeEl.disabled = true;
}


function stopColorChange() {
    // console.log("Stop");
    clearInterval(timerId);
    buttonStartColorsChangeEl.disabled = false;
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }

    
    

