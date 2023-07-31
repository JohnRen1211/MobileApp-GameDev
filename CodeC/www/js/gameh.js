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
    question: "Who developed HTML?",
    choice1: "Tim Berners-Lee",
    choice2: "Brendan Eich",
    choice3: "Larry Page",
    choice4: "Mark Zuckerberg",
    answer: 1,
  },
  {
    question: "What is the basic structure of an HTML document?",
    choice1: "Script tags, CSS styles, body content",
    choice2: "DOCTYPE declaration, HTML tags, head and body sections",
    choice3: "Header tags, paragraph tags, image tags",
    choice4: "HTML tags, JavaScript code, footer section",
    answer: 2,
  },
  {
    question: "Which type of elements can be used in HTML?",
    choice1: "Media elements",
    choice2: "Text elements",
    choice3: "All of the mentioned",
    choice4: "Form elements",
    answer: 3,
  },
  {
    question: "Is HTML case sensitive when dealing with tags?",
    choice1: "None of the mentioned",
    choice2: "Yes",
    choice3: "Machine dependent",
    choice4: "No",
    answer: 4,
  },
  {
    question: "Is HTML a programming language?",
    choice1: "No, it is a markup language",
    choice2: "Yes, it is a programming language",
    choice3: "It can be both a programming language and a markup language",
    choice4: "None of the mentioned",
    answer: 1,
  },
  {
    question: "Which of the following is the correct extension of an HTML file?",
    choice1: ".doc",
    choice2: ".html",
    choice3: ".php",
    choice4: ".py",
    answer: 2,
  },
  {
    question: "Which of the following is used to define a hyperlink in HTML?",
    choice1: "<p>",
    choice2: "<h1>",
    choice3: "<a>",
    choice4: "<img>",
    answer: 3,
  },
  {
    question: "What is the purpose of the <head> section in an HTML document?",
    choice1: "To display images and multimedia",
    choice2: "To define the main content of the page",
    choice3: "To include JavaScript code",
    choice4: "To contain meta information and document title",
    answer: 4,
  },
  {
    question: "Which of the following is used to create a numbered list in HTML?",
    choice1: "<ol>",
    choice2: "<ul>",
    choice3: "<li>",
    choice4: "<dl>",
    answer: 1,
  },
  {
    question: "What is the correct way to add an image to an HTML page?",
    choice1: "<image src='image.jpg' alt='Description'>",
    choice2: "<img src='image.jpg' alt='Description'>",
    choice3: "<img href='image.jpg' alt='Description'>",
    choice4: "<image href='image.jpg' alt='Description'>",
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
