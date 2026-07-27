const typescriptQuestions = [
  {
    id: 'typescript-1',
    question: "What does TypeScript add to JavaScript?",
    answers: [
      "A faster runtime engine",
      "Static type checking at compile time",
      "Built-in database access",
      "Automatic memory management"
    ],
    correctAnswer: "Static type checking at compile time",
    explanation: "TypeScript checks types before your code runs, then compiles to plain JavaScript."
  },
  {
    id: 'typescript-2',
    question: "What does the ? mean in `name?: string`?",
    answers: [
      "The property is optional",
      "The property is read-only",
      "The property can be null but not undefined",
      "The property is private"
    ],
    correctAnswer: "The property is optional",
    explanation: "A ? marks the property optional, so its type becomes string | undefined."
  },
  {
    id: 'typescript-3',
    question: "How does the unknown type differ from any?",
    answers: [
      "unknown is only for objects",
      "There is no difference",
      "unknown must be narrowed before you can use it",
      "unknown disables type checking entirely"
    ],
    correctAnswer: "unknown must be narrowed before you can use it",
    explanation: "any turns off type checking, while unknown forces you to check the type before using the value."
  },
  {
    id: 'typescript-4',
    question: "Which file configures the TypeScript compiler?",
    answers: ["package.json", "tsconfig.json", "types.config.js", ".tsrc"],
    correctAnswer: "tsconfig.json",
    explanation: "tsconfig.json sets compiler options such as the target version, module system, and strictness."
  },
  {
    id: 'typescript-5',
    question: "What is the difference between an interface and a type alias?",
    answers: [
      "Interfaces can be reopened and merged, type aliases cannot",
      "Type aliases only work with primitives",
      "Interfaces are removed at compile time but type aliases are not",
      "They are completely interchangeable in every situation"
    ],
    correctAnswer: "Interfaces can be reopened and merged, type aliases cannot",
    explanation: "Declaring the same interface twice merges the declarations. A type alias can describe unions, which interfaces cannot."
  }
];

export default typescriptQuestions;
