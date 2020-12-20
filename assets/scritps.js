// DELETE ALL CONSOLE LOGS AT END
$("document").ready(function () {

  let flashLevel = 0;

  let userInputOrder = [];
  let beepSounds = [
    "https://freesound.org/people/KorgMS2000B/sounds/54415/",
    "https://freesound.org/people/altemark/sounds/39747/",
    "https://freesound.org/people/shukran/sounds/53243/",
    "https://freesound.org/people/carbilicon/sounds/65243/",
  ];

  // hides text scores
  function hideScoresText() {
    $("#yourScore").hide();
    $("#highScore").hide();
    $("#restart").hide();
  }
  hideScoresText();

  // starts game round
  function startRound() {
    $("#startBtn").click(function () {
      flashLevel++;
      handleSimonSequence();
    });
  }
  startRound();

  // changes game level
  function changeGameLevel() {
    $("#level").text(flashLevel);
  }

  let indexContent = 0;
  let flashColour = 0;
  let simonFlashOrder = [];

  // controls simon sequence
  function handleSimonSequence() {
    changeGameLevel();
    produceRandomNumForSimonFlashOrder();
    let indexOfSimonArray = 0;
    let myInterval = setInterval(function () {
      indexContent = simonFlashOrder[indexOfSimonArray];
      flashColour = $("#" + indexContent).attr("class").split(" ")[1];
      console.log("indexContent: " + indexContent + " flashColour: " + flashColour);
      flashHighlightAndSound(indexContent, flashColour);
      indexOfSimonArray++;
      if (indexOfSimonArray === simonFlashOrder.length) {
        clearInterval(myInterval);
      }
    }, 1000);
  }

  // gets and stores random number for flash order
  function produceRandomNumForSimonFlashOrder() {
    let randomNum = Math.floor(Math.random() * 4 + 1);
    simonFlashOrder.push(randomNum);
    console.log("simonFlashOrder: " + simonFlashOrder);
  }

  // added highlight colours and sounds
  function flashHighlightAndSound(id, flashColour) {
    $("#" + id).addClass(flashColour +"Active");
    // playSimonSounds(id);
    setTimeout(function () {
      $("#" + id).removeClass(flashColour +"Active");
    }, 500);
  }

  // sounds for game
  function playSimonSounds(id) {}































  // let flash;
  // let flashOrder = [];

  // let playerInputOrder = [];

  // let score = 0;
  // let highScore = 0;

  // let green = document.querySelector("#topLeft");
  // let red = document.querySelector("#topRight");
  // let yellow = document.querySelector("#bottomLeft");
  // let blue = document.querySelector("#bottomRight");

  // let start = document.querySelector("#middle");

  // function startBtn() {
  //   start.addEventListener("click", function () {
  //     if (start) {
  //       console.log("START");
  //       beginGame();
  //     }
  //   });
  // }
  // startBtn();

  // function beginGame() {
  //   let flashOrder = [];
  //   let playerInputOrder = [];
  //   let score = 0;
  //   $("#highScore").hide();
  //   $("#restart").hide();
  // }

  // function greenBtn() {
  //   green.addEventListener("click", function () {
  //     if (green) {
  //       console.log("green");
  //     }
  //   });
  // }
  // greenBtn();
});
