const reactQuestions = [
  {
    id: 'react-1',
    question: "What does JSX stand for?",
    answers: [
      "JavaScript XML",
      "Java Syntax Extension",
      "JSON XML",
      "JavaScript Extension"
    ],
    correctAnswer: "JavaScript XML",
    explanation: "JSX lets you write HTML-like syntax inside JavaScript."
  },
  {
    id: 'react-2',
    question: "Which React Hook is used to manage local component state?",
    answers: ["useEffect", "useState", "useContext", "useRef"],
    correctAnswer: "useState",
    explanation: "useState adds a state variable that can be updated within a component."
  },
  {
    id: 'react-3',
    question: "Why does a list of elements need a key prop?",
    answers: [
      "It helps React identify which items changed, were added, or removed",
      "It sets the display order of the items",
      "It gives each element a unique CSS class",
      "It is required for the list to be clickable"
    ],
    correctAnswer: "It helps React identify which items changed, were added, or removed",
    explanation: "Keys let React match elements between renders. Without stable keys it may reuse the wrong DOM nodes."
  },
  {
    id: 'react-4',
    question: "What does the dependency array of useEffect control?",
    answers: [
      "How many times the component can render",
      "When the effect re-runs after a render",
      "Which props the component accepts",
      "The order in which effects are declared"
    ],
    correctAnswer: "When the effect re-runs after a render",
    explanation: "The effect re-runs whenever a value in the array changes. An empty array runs it only on mount."
  },
  {
    id: 'react-5',
    question: "How does data pass from a parent component to a child?",
    answers: ["Through state", "Through refs", "Through props", "Through hooks"],
    correctAnswer: "Through props",
    explanation: "Parents pass data down as props. To send data back up, the parent passes a callback function down."
  }
];


export default reactQuestions;