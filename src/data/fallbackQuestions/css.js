const cssQuestions = [
  {
    id: 'css-1',
    question: "What does CSS stand for?",
    answers: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correctAnswer: "Cascading Style Sheets",
    explanation: "CSS stands for Cascading Style Sheets. The cascade decides which rule wins when several apply."
  },
  {
    id: 'css-2',
    question: "Which property changes the text color of an element?",
    answers: ["color", "text-color", "font-color", "foreground"],
    correctAnswer: "color",
    explanation: "The color property sets text color. background-color sets the color behind it."
  },
  {
    id: 'css-3',
    question: "What does box-sizing: border-box do?",
    answers: [
      "Adds a border around the element",
      "Includes padding and border inside the element's width and height",
      "Removes all padding and margins",
      "Centers the element inside its parent"
    ],
    correctAnswer: "Includes padding and border inside the element's width and height",
    explanation: "With border-box, setting width: 200px means the element is 200px total, padding and border included."
  },
  {
    id: 'css-4',
    question: "Which selector targets an element with id=\"nav\"?",
    answers: [".nav", "#nav", "nav", "*nav"],
    correctAnswer: "#nav",
    explanation: "# selects by id and . selects by class. A bare name selects by element type."
  },
  {
    id: 'css-5',
    question: "Which display value makes an element a flex container?",
    answers: ["block", "grid", "inline-block", "flex"],
    correctAnswer: "flex",
    explanation: "display: flex turns an element into a flex container, letting you align and distribute its children."
  }
];

export default cssQuestions;
