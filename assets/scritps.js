$("document").ready(function () {
  let flash;
  let flashOrder = [];
  let score = 0;

  let green = document.querySelector("#topLeft");
  let red = document.querySelector("#topRight");
  let yellow = document.querySelector("#bottomLeft");
  let blue = document.querySelector("#bottomRight");

  let start = document.querySelector("#middle");

  function startBtn() {
    start.addEventListener("click", function () {
      if (start) {
        console.log("START");
      }
    });
  }
  startBtn();

  function greenBtn() {
    green.addEventListener("click", function () {
      if (green) {
        console.log("green");
      };
    });
  }
  greenBtn();




























  
});
