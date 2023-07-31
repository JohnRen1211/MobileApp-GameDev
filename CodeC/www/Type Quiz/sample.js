const questions = [
  {
    question: 'Get the data type of a variable (x = 6) using the type function:',
    answer: 'print(type(x))'
  },
  {
    question: 'How do you print "Hello World" in python programming?',
    answer: 'print("Hello World")'
  },
  {
    question: 'Create a variable name "A" with a value of 10 remember to use space and it is case sensitive',
    answer: 'A = 10'
  },
  {
    question: 'Convert x = 1 into float use "a" as variable name',
    answer: 'a = float(x)'
  },
  {
    question: 'Use len() function to count the length this string (a = "Hello world!")',
    answer: 'print(len(a))'
  },

  // Add more questions as needed
];

let currentQuestionIndex = -1;
let isAnswerCorrect = false;

function checkAnswer() {
  const inputBox = document.getElementById('input-box');
  const feedback = document.getElementById('feedback');

  if (inputBox.value.trim() === questions[currentQuestionIndex].answer) {
    isAnswerCorrect = true;
    feedback.textContent = 'Correct! Good job!';
    feedback.style.color = 'green';
  } else {
    isAnswerCorrect = false;
    feedback.textContent = 'Wrong answer. Try again!';
    feedback.style.color = 'red';
  }

  // Hide the typing area and submit button
  inputBox.style.display = 'none';
  document.getElementById('submit-btn').style.display = 'none';

  // Show the proceed button
  document.getElementById('proceed-btn').style.display = 'block';
  feedback.style.display = 'block';
}

function proceedNext() {
  // Show the typing area and submit button
  const inputBox = document.getElementById('input-box');
  inputBox.style.display = 'block';
  inputBox.value = ''; // Clear the input box

  // Hide the proceed button and feedback
  document.getElementById('proceed-btn').style.display = 'none';
  document.getElementById('feedback').style.display = 'none';

  // Show the submit button
  document.getElementById('submit-btn').style.display = 'block';

  // If the answer was correct, move to the next question
  if (isAnswerCorrect) {
    showNextQuestion();
  }
}

function showNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    // Quiz completed
    document.getElementById('quiz-container').innerHTML = `
      <h2>Quiz Completed!</h2>
      <p>Congratulations! You have completed the quiz.</p>
    `;
    return;
  }

  // Display the next question
  document.getElementById('question').textContent = questions[currentQuestionIndex].question;
  document.getElementById('input-box').style.display = 'block';

  // Reset the answer status
  isAnswerCorrect = false;
}

document.getElementById('submit-btn').addEventListener('click', checkAnswer);
document.getElementById('proceed-btn').addEventListener('click', proceedNext);

// Show the first question on page load
showNextQuestion();
