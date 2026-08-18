// Mirrors the QuizAPI "HTML" quiz (quiz_id cmsyy33660qadfbutxyq0nqzl) one-to-one.
// Content is intentionally identical to the API response so the fallback is
// indistinguishable from a live fetch. Re-pull from the API if the quiz changes.
const htmlQuestions = [
  {
    id: 'html-1',
    question: "What does HTML stand for?",
    answers: [
      "Hyper Trainer Marking Language",
      "HyperText Markup Language",
      "HyperText Markup Leveling",
      "Home Tool Markup Language"
    ],
    correctAnswer: "HyperText Markup Language",
    explanation: "HTML is an acronym for HyperText Markup Language"
  },
  {
    id: 'html-2',
    question: "Which tag is used to create a hyperlink? (uses angle brackets)",
    answers: [
      "link",
      "href",
      "a",
      "url"
    ],
    correctAnswer: "a",
    explanation: "The anchor tag is used for hyperlinks"
  },
  {
    id: 'html-3',
    question: "Which HTML element is used to define the largest heading? (uses angle brackets)",
    answers: [
      "h6",
      "heading",
      "h1",
      "head"
    ],
    correctAnswer: "h1",
    explanation: "The h1 tag will yield the biggest header"
  },
  {
    id: 'html-4',
    question: "What is the correct HTML element for inserting a line break? (uses angle brackets)",
    answers: [
      "break",
      "lb",
      "br",
      "newline"
    ],
    correctAnswer: "br",
    explanation: "A br tag will insert a line break"
  },
  {
    id: 'html-5',
    question: "Which attribute is used to provide an alternate text for an image if it cannot be displayed?",
    answers: [
      "description",
      "title",
      "alt",
      "src"
    ],
    correctAnswer: "alt",
    explanation: "The alt tag provides an alternative text for images"
  },
  {
    id: 'html-6',
    question: "Which tag is used to define an unordered (bulleted) list? (uses angle brackets)",
    answers: [
      "ol",
      "list",
      "ul",
      "dl"
    ],
    correctAnswer: "ul",
    explanation: "The ul tag is for unordered lists"
  },
  {
    id: 'html-7',
    question: "What is the correct HTML tag for creating a table row? (uses angle brackets)",
    answers: [
      "td",
      "tr",
      "table",
      "th"
    ],
    correctAnswer: "tr",
    explanation: "The tr table is for a table row"
  },
  {
    id: 'html-8',
    question: "Which HTML tag is used to embed a JavaScript file? (uses angle brackets)",
    answers: [
      "js",
      "javascript",
      "script",
      "code"
    ],
    correctAnswer: "script",
    explanation: "The script opening and closing tags allow you to put JavaScript into your HTML file."
  },
  {
    id: 'html-9',
    question: "Which element defines the document type in HTML5? (uses angle brackets)",
    answers: [
      "!DOCTYPE html",
      "html type=\"5\"",
      "meta doctype=\"html5\"",
      "doc html=\"5\""
    ],
    correctAnswer: "!DOCTYPE html",
    explanation: "The !DOCTYPE html tag is what starts out HTML5 files ."
  },
  {
    id: 'html-10',
    question: "Which HTML attribute specifies where to open a linked document?",
    answers: [
      "rel",
      "link",
      "href",
      "target"
    ],
    correctAnswer: "target",
    explanation: "The target attribute points to where to open a linked document."
  }
];

export default htmlQuestions;
