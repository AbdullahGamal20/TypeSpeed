const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Town",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Github",
  "Leetcode",
  "Internet",
  "Python",
  "Scala",
  "Destructuring",
  "Paradigm",
  "Styling",
  "Cascade",
  "Documentation",
  "Coding",
  "Funny",
  "Working",
  "Dependencies",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelectorAll("#sel");
let discSpan1 = document.querySelector(".dis .one");
let discSpan2 = document.querySelector(".dis .two");
let discSpan3 = document.querySelector(".dis .three");

let defaultLevelName = "Normal";
let defaultLevelSeconds = lvls[defaultLevelName];

// setting level name + seconds + score
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

discSpan1.innerHTML = defaultLevelName;
discSpan2.innerHTML = defaultLevelSeconds;

let value = defaultLevelSeconds;
function reDeclare() {
  select.forEach((option) => {
    option.addEventListener("click", function () {
      const selectedOption = this.value;
      lvlNameSpan.innerHTML = selectedOption;
      secondsSpan.innerHTML = lvls[selectedOption];
      timeLeftSpan.innerHTML = lvls[selectedOption];
      value = timeLeftSpan.innerHTML;
      discSpan1.innerHTML = selectedOption;
      discSpan2.innerHTML = lvls[selectedOption];
    });
  });
}
reDeclare();

// disable paste event
input.onpaste = function () {
  return false;
};

// start game
startButton.onclick = function () {
  this.remove();
  input.focus();
  genWords();
};

// generate word function
function genWords() {
  let randomWord = words[Math.floor(Math.random() * words.length)];
  let wordIndex = words.indexOf(randomWord);
  // delete this word from our array to ignore showing to user again
  words.splice(wordIndex, 1);
  // show the random word
  theWord.innerHTML = randomWord;

  upcomingWords.innerHTML = "";

  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(words[i]));
    upcomingWords.appendChild(div);
  }
  // call start play function
  startPlay();
}

// start play func

function startPlay() {
  timeLeftSpan.innerHTML = value;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        scoreGot.innerHTML++;
        if (words.length > 0) {
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          span.appendChild(document.createTextNode("Great Job"));
          finishMessage.appendChild(span);
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        span.appendChild(document.createTextNode("Game Over"));
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}
