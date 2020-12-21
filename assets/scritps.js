// DELETE ALL CONSOLE LOGS AT END
$("document").ready(function () {
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
  function flashHighlightAndSound(id, flashColour) {
    $("#" + id).addClass(flashColour + "Active");
    // playSimonSounds(id);
    setTimeout(function () {
      $("#" + id).removeClass(flashColour + "Active");
    }, 500);
  }

  // sounds for game
  function playSimonSounds(id) {}
});
