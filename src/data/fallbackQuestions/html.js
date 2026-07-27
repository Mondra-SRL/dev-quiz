const htmlQuestions = [
  {
    id: 'html-1',
    question: "What does HTML stand for?",
    answers: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "HyperText Machine Language"
    ],
    correctAnswer: "HyperText Markup Language",
    explanation: "HTML stands for HyperText Markup Language. It is used to structure content on web pages."
  },
  {
    id: 'html-2',
    question: "Which element defines the largest heading?",
    answers: ["<head>", "<heading>", "<h1>", "<h6>"],
    correctAnswer: "<h1>",
    explanation: "Headings run from <h1> down to <h6>, with <h1> being the largest and most important."
  },
  {
    id: 'html-3',
    question: "Which attribute provides alternative text for an image?",
    answers: ["title", "alt", "src", "caption"],
    correctAnswer: "alt",
    explanation: "The alt attribute describes an image for screen readers and displays if the image fails to load."
  },
  {
    id: 'html-4',
    question: "Which element creates an unordered (bulleted) list?",
    answers: ["<ol>", "<li>", "<ul>", "<dl>"],
    correctAnswer: "<ul>",
    explanation: "<ul> creates an unordered list, while <ol> creates an ordered one. Both contain <li> items."
  },
  {
    id: 'html-5',
    question: "What belongs inside the <head> element?",
    answers: [
      "Metadata such as the title, character set, and stylesheet links",
      "The visible page content",
      "The page footer and copyright notice",
      "The main navigation menu"
    ],
    correctAnswer: "Metadata such as the title, character set, and stylesheet links",
    explanation: "<head> holds information about the document. Visible content goes inside <body>."
  }
];

export default htmlQuestions;
