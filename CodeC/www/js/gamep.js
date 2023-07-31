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
    "question": "Who developed Python Programming Language?",
    "choice1": "Guido van Rossum",
    "choice2": "Rasmus Lerdorf",
    "choice3": "Wick van Rossum",
    "choice4": "Niene Stom",
    "answer": 1
  },

  {
    "question": "What syntax to use to print in python?",
    "choice1": "float" ,
    "choice2": "var",
    "choice3": "int",
    "choice4": "print",
    "answer": 4
  },

  {
    "question": "Which type of Programming does Python support?",
    "choice1": "all of the mentioned",
    "choice2": "object-oriented programming",
    "choice3": "structured programming",
    "choice4": "functional programming",
    "answer": 1
  },

  {
    "question": "Which type of Programming does Python support?",
    "choice1": "object-oriented programming" ,
    "choice2": "all of the mentioned",
    "choice3": "structured programming",
    "choice4": "functional programming",
    "answer": 2
  },
  {
    "question": "Is Python case sensitive when dealing with identifiers?",
    "choice1": "Machine dependent",
    "choice2": "No",
    "choice3": "Yes",
    "choice4": "None of the mentioned",
    "answer": 3
  },
  {
    "question": "Python code is neither compiled nor interpreted",
    "choice1": "Python code is both compiled and interpreted",
    "choice2": "Python code is only compiled",
    "choice3": "Python code is only interpreted",
    "choice4": "Python code is both compiled and interpreted",
    "answer": 4
  },
  {
    "question": "Which of the following is the correct extension of the Python file?",
    "choice1": ".py",
    "choice2": ".doc",
    "choice3": ".php",
    "choice4": ".html",
    "answer": 1
  },
  {
    "question": "All keywords in Python are in _________",
    "choice1": "UPPER CASE",
    "choice2": "None of the mentioned",
    "choice3": "lower case",
    "choice4": "Capitalized",
    "answer": 2
  },
  {
    "question": "Which of the following is used to define a block of code in Python language?",
    "choice1": "Brackets",
    "choice2": "Key",
    "choice3": "Indention",
    "choice4": "All of the mentioned",
    "answer": 3
  },
  {
    "question": "You can get the data type of a variable with the what function?",
    "choice1": "dict()",
    "choice2": "bool()",
    "choice3": "int()",
    "choice4": "type()",
    "answer": 4
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