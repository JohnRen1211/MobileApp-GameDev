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
  },
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
