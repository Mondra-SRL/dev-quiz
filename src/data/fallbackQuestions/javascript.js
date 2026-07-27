const javascriptQuestions = [
  {
    id: 'javascript-1',
    question: "Which keyword declares a block-scoped variable that cannot be reassigned?",
    answers: ["var", "let", "const", "static"],
    correctAnswer: "const",
    explanation: "const is block-scoped and cannot be reassigned, though the contents of an object it holds can still change."
  },
  {
    id: 'javascript-2',
    question: "How does === differ from ==?",
    answers: [
      "=== compares value and type without converting either side",
      "=== only works on numbers",
      "=== compares object references only",
      "There is no difference"
    ],
    correctAnswer: "=== compares value and type without converting either side",
    explanation: "== converts operands before comparing, so '1' == 1 is true but '1' === 1 is false."
  },
  {
    id: 'javascript-3',
    question: "What does Array.prototype.map() return?",
    answers: [
      "The original array, modified in place",
      "A new array containing the results of the callback",
      "The number of items processed",
      "The first matching item"
    ],
    correctAnswer: "A new array containing the results of the callback",
    explanation: "map() builds a new array and leaves the original untouched, which is why it is safe in React renders."
  },
  {
    id: 'javascript-4',
    question: "What does typeof null return?",
    answers: ["\"null\"", "\"undefined\"", "\"object\"", "\"boolean\""],
    correctAnswer: "\"object\"",
    explanation: "typeof null returns \"object\". This is a long-standing bug in JavaScript kept for backwards compatibility."
  },
  {
    id: 'javascript-5',
    question: "What is a closure?",
    answers: [
      "A function that keeps access to variables from the scope it was created in",
      "A loop that never terminates",
      "A way to close a browser window",
      "A method that removes an event listener"
    ],
    correctAnswer: "A function that keeps access to variables from the scope it was created in",
    explanation: "A closure remembers its surrounding scope even after the outer function has returned."
  }
];

export default javascriptQuestions;
