$("document").ready(function () {
  
  let htmlID = 0;
  let flashColour = 0;
  let flashLevel = 0;  
  let numOfLevels = 500;  
  let userInputOrder = [];  
  let simonFlashOrder = [];
  let beepSounds = [
    "media/sounds/beep1.mp3",
    "media/sounds/beep2.mp3",
    "media/sounds/beep3.mp3",
    "media/sounds/beep4.mp3",
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

  // for users picking colours
  function userColourInput() {
    $(".quarter").click(function () {
      htmlID = $(this).attr("id");
      flashColour = $(this).attr("class").split(" ")[1];
      userInputOrder.push(htmlID);
      flashHighlightAndSound(htmlID, flashColour);
      // check user's input order
      if (!compareUserInputWithSimon()) {
        displayError();
        userInputOrder = [];
      }
      // occurs when user's length input is same as simon's
      if (userInputOrder.length === simonFlashOrder.length && userInputOrder.length < numOfLevels) {
        flashLevel++;
        userInputOrder = [];
        handleSimonSequence();
      }
      // checking for winners 
      if (userInputOrder.length === numOfLevels) {
        $("#level").text("Win");
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
    let counter = 0;
    let myError = setInterval(function() {
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
  }

  // controls simon sequence
  function handleSimonSequence() {
    changeGameLevel();
    produceRandomNumForSimonFlashOrder();
    let indexOfSimonArray = 0;
    let myInterval = setInterval(function () {
      htmlID = simonFlashOrder[indexOfSimonArray];
      flashColour = $("#" + htmlID)
        .attr("class")
        .split(" ")[1];
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
  }

  // added highlight colours and sounds
  function flashHighlightAndSound(htmlID, flashColour) {
    $("#" + htmlID).addClass(flashColour + "Active");
    playSimonSounds(htmlID);
    setTimeout(function () {
      $("#" + htmlID).removeClass(flashColour + "Active");
    }, 500);
  }

  // sounds for game
  function playSimonSounds(htmlID) {
    let sound = new Audio(beepSounds[htmlID]);
    sound.play();
  }
});
