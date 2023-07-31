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
    question: "Who developed C# Programming Language?",
    choice1: "Anders Hejlsberg",
    choice2: "Rasmus Lerdorf",
    choice3: "James Gosling",
    choice4: "Bjarne Stroustrup",
    answer: 1,
  },
  {
    question: "What syntax to use to print in C#?",
    choice1: "var" ,
    choice2: "Console.WriteLine",
    choice3: "int",
    choice4: "float",
    answer: 2,
  },
  {
    question: "Which type of Programming does C# support?",
    choice1: "structured programming" ,
    choice2: "object-oriented programming",
    choice3: "all of the mentioned",
    choice4: "functional programming",
    answer: 3,
  },
  {
    question: "Which type of Programming does C# support?",
    choice1: "functional programming" ,
    choice2: "object-oriented programming",
    choice3: "structured programming",
    choice4: "all of the mentioned",
    answer: 4,
  },
  {
    question: "Is C# case sensitive when dealing with identifiers?",
    choice1: "Yes",
    choice2: "No",
    choice3: "Machine dependent",
    choice4: "None of the mentioned",
    answer: 1,
  },
  {
    question: "Is C# code compiled or interpreted?",
    choice1: "C# code is interpreted",
    choice2: "C# code is compiled",
    choice3: "C# code is both compiled and interpreted",
    choice4: "C# code is neither compiled nor interpreted",
    answer: 2,
  },
  {
    question: "Which of the following is the correct extension of the C# file?",
    choice1: ".php", 
    choice2: ".doc",
    choice3: ".cs",
    choice4: ".html",
    answer: 3,
  },
  {
    question: "All keywords in C# are in _________",
    choice1: "None of the mentioned", 
    choice2: "UPPER CASE",
    choice3: "Capitalized",
    choice4: "lower case",
    answer: 4,
  },
  {
    question: "Which of the following is used to define a block of code in C# language?",
    choice1: "Brackets",
    choice2: "Indentation",
    choice3: "Keywords",
    choice4: "All of the mentioned",
    answer: 1,
  },
  {
    question: "You can get the data type of a variable with the what function?",
    choice1: "bool", 
    choice2: "typeof",
    choice3: "int",
    choice4: "string",
    answer: 2,
  },
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
