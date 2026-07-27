const pythonQuestions = [
  {
    id: 'python-1',
    question: "Which keyword defines a function in Python?",
    answers: ["function", "def", "func", "define"],
    correctAnswer: "def",
    explanation: "Functions are declared with def, followed by the name and a parameter list."
  },
  {
    id: 'python-2',
    question: "Which of these collection types is immutable?",
    answers: ["list", "dict", "set", "tuple"],
    correctAnswer: "tuple",
    explanation: "A tuple cannot be changed after creation. Lists, dicts, and sets are all mutable."
  },
  {
    id: 'python-3',
    question: "What character starts a single-line comment?",
    answers: ["//", "#", "--", "/*"],
    correctAnswer: "#",
    explanation: "Python uses # for single-line comments. Everything after it on that line is ignored."
  },
  {
    id: 'python-4',
    question: "What does len() return when given a string?",
    answers: [
      "The number of characters in the string",
      "The number of words in the string",
      "The memory size of the string in bytes",
      "The index of the last character"
    ],
    correctAnswer: "The number of characters in the string",
    explanation: "len() returns the number of items in a sequence, which for a string means its characters."
  },
  {
    id: 'python-5',
    question: "How does Python group a block of code?",
    answers: [
      "With curly braces",
      "With begin and end keywords",
      "With indentation",
      "With parentheses"
    ],
    correctAnswer: "With indentation",
    explanation: "Python uses indentation rather than braces, so consistent spacing is part of the syntax itself."
  }
];

export default pythonQuestions;
