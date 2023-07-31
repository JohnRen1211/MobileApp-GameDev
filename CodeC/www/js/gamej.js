const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "Who developed JavaScript Programming Language?",
    "choice1": "Brendan Eich",
    "choice2": "Rasmus Lerdorf",
    "choice3": "Wick van Rossum",
    "choice4": "Niene Stom",
    "answer": 1
  },

  {
    "question": "What syntax to use to print in JavaScript?",
    "choice1": "var",
    "choice2": "console.log",
    "choice3": "int",
    "choice4": "float",
    "answer": 2
  },

  {
    "question": "Which type of Programming does JavaScript support?",
    "choice1": "structured programming",
    "choice2": "object-oriented programming",
    "choice3": "all of the mentioned",
    "choice4": "functional programming",
    "answer": 3
  },

  {
    "question": "Is JavaScript case sensitive when dealing with identifiers?",
    "choice1": "None of the mentioned",
    "choice2": "No",
    "choice3": "Machine dependent",
    "choice4": "Yes",
    "answer": 4
  },
  {
    "question": "Is JavaScript code compiled or interpreted?",
    "choice1": "JavaScript code is interpreted",
    "choice2": "JavaScript code is compiled",
    "choice3": "JavaScript code is both compiled and interpreted",
    "choice4": "JavaScript code is neither compiled nor interpreted",
    "answer": 1
  },
  {
    "question": "Which of the following is the correct extension of the JavaScript file?",
    "choice1": ".doc",
    "choice2": ".js",
    "choice3": ".php",
    "choice4": ".html",
    "answer": 2
  },
  {
    "question": "All keywords in JavaScript are in _________",
    "choice1": "lower case",
    "choice2": "UPPER CASE",
    "choice3": "None of the mentioned",
    "choice4": "Capitalized",
    "answer": 3
  },
  {
    "question": "Which of the following is used to define a block of code in JavaScript language?",
    "choice1": "Curly Braces",
    "choice2": "Parentheses",
    "choice3": "Square Brackets",
    "choice4": "All of the mentioned",
    "answer": 1
  },
  {
    "question": "You can get the data type of a variable with the what function?",
    "choice1": "typeof()",
    "choice2": "bool()",
    "choice3": "int()",
    "choice4": "dict()",
    "answer": 1
  }
];



//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();
