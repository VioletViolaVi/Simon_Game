// DELETE ALL CONSOLE LOGS AT END
$("document").ready(function () {
  // green noise
  function greenSound() {
    $(".green").click(function () {
      let greenSound = document.getElementById("beep1");
      greenSound.play();
      console.log("greenSound: " + greenSound);
    });
  }
  greenSound();

  // red noise
  function redSound() {
    $(".red").click(function () {
      let redSound = document.getElementById("beep2");
      redSound.play();
      console.log("redSound: " + redSound);
    });
  }
  redSound();

  // yellow noise
  function yellowSound() {
    $(".yellow").click(function () {
      let yellowSound = document.getElementById("beep3");
      yellowSound.play();
      console.log("yellowSound: " + yellowSound);
    });
  }
  yellowSound();

  // blue noise
  function blueSound() {
    $(".blue").click(function () {
      let blueSound = document.getElementById("beep4");
      blueSound.play();
      console.log("blueSound: " + blueSound);
    });
  }
  blueSound();

  // hides text scores
  function hideScoresText() {
    $("#yourScore").hide();
    $("#highScore").hide();
    $("#restart").hide();
  }
  hideScoresText();

  let flashLevel = 0;

  // starts game round
  function startRound() {
    $("#startBtn").click(function () {
      flashLevel++;
      handleSimonSequence();
    });
  }
  startRound();

  let userInputOrder = [];

  // for users picking colours
  function userColourInput() {
    $(".quarter").click(function () {
      htmlID = $(this).attr("id");
      flashColour = $(this).attr("class").split(" ")[1];
      userInputOrder.push(htmlID);
      console.log("htmlID: " + htmlID + " flashColour: " + flashColour);
      console.log("userInputOrder: " + userInputOrder);
      flashHighlightAndSound(htmlID, flashColour);
      // check user's input order
      if (!compareUserInputWithSimon()) {
        displayError();
        userInputOrder = [];
      }
      // occurs when user's length input is same as simon's
      if (userInputOrder.length === simonFlashOrder.length) {
        flashLevel++;
        userInputOrder = [];
        handleSimonSequence();
      }
    });
  }
  userColourInput();

  // check user's input with simon's
  function compareUserInputWithSimon() {
    for (let index = 0; index < userInputOrder.length; index++) {
      if (userInputOrder[index] != simonFlashOrder[index]) {
        return false;
      }
    }
    return true;
  }
  compareUserInputWithSimon();

  // shows error
  function displayError() {
    console.log("ERROR");
    let counter = 0;
    let myError = setInterval(() => {
      $("#level").text("--");
      counter++;
      if (counter === 3) {
        $("#level").text(flashLevel);
        clearInterval(myError);
        userInputOrder = [];
        counter = 0;
      }
    }, 500);
  }

  // changes game level
  function changeGameLevel() {
    $("#level").text(flashLevel);
    console.log("Level: " + flashLevel);
  }

  let htmlID = 0;
  let flashColour = 0;
  let simonFlashOrder = [0, 2, 1];
  let numOfLevels = 3;

  // controls simon sequence
  function handleSimonSequence() {
    changeGameLevel();
    // produceRandomNumForSimonFlashOrder();
    let indexOfSimonArray = 0;
    let myInterval = setInterval(function () {
      htmlID = simonFlashOrder[indexOfSimonArray];
      flashColour = $("#" + htmlID)
        .attr("class")
        .split(" ")[1];
      // console.log("htmlID: " + htmlID + " flashColour: " + flashColour);
      flashHighlightAndSound(htmlID, flashColour);
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
  function flashHighlightAndSound(htmlID, flashColour) {
    $("#" + htmlID).addClass(flashColour + "Active");
    playSimonSounds(htmlID);
    setTimeout(function () {
      $("#" + htmlID).removeClass(flashColour + "Active");
    }, 500);
  }

  let beepSounds = [
    "media/sounds/beep1.mp3",
    "media/sounds/beep2.mp3",
    "media/sounds/beep3.mp3",
    "media/sounds/beep4.mp3",
  ];

  // sounds for game
  function playSimonSounds(htmlID) {
    let sound = new Audio(beepSounds[htmlID]);
    sound.play();
  }
});
