// Sourced from quizapi.io (quiz_id in src/data/quizTopics.js).
// Used when the live API call fails.
const tsQuestions = [
  {
    id: 'typescript-1',
    question: "What is the inferred type of `result` in the following code? ```ts const result = 42; ```",
    answers: [
      "number",
      "42",
      "any",
      "int",
    ],
    correctAnswer: "42",
    explanation: "When you use `const` with a primitive value, TypeScript infers a literal type. Since `42` is assigned to a `const`, the type is the literal `42`, not `number`. If `let` were used instead, the type would be `number`."
  },
  {
    id: 'typescript-2',
    question: "Which of the following correctly defines an interface with an optional property `age` and a required property `name`?",
    answers: [
      "interface User { name: string; age?: number; }",
      "interface User { name: string; age: number | undefined; }",
      "interface User { name: string; optional age: number; }",
      "interface User { name: string; age: number = 0; }",
    ],
    correctAnswer: "interface User { name: string; age?: number; }",
    explanation: "In TypeScript, optional properties are marked with a `?` after the property name. `age?: number` means the property may or may not be present on objects implementing this interface."
  },
  {
    id: 'typescript-3',
    question: "What does the following union type allow? ```ts type Status = \"loading\" | \"success\" | \"error\"; ```",
    answers: [
      "Any string value",
      "An array containing all three strings",
      "Only the exact strings \"loading\", \"success\", or \"error\"",
      "An object with three boolean properties",
    ],
    correctAnswer: "Only the exact strings \"loading\", \"success\", or \"error\"",
    explanation: "This is a union of string literal types. A variable of type `Status` can only hold one of those three exact string values. This is different from `string`, which would allow any string."
  },
  {
    id: 'typescript-4',
    question: "What is the key difference between `interface` and `type` alias in TypeScript?",
    answers: [
      "Type aliases can describe objects but interfaces cannot",
      "Interfaces can be extended but type aliases cannot",
      "Interfaces support declaration merging while type aliases do not",
      "Interfaces support declaration merging, while type aliases can represent unions and primitives",
    ],
    correctAnswer: "Interfaces support declaration merging, while type aliases can represent unions and primitives",
    explanation: "Interfaces support declaration merging — if you declare the same interface name twice, TypeScript merges them. Type aliases do not support this. Both can be extended, and both can describe object shapes, but declaration merging is unique to interfaces."
  },
  {
    id: 'typescript-5',
    question: "What will TypeScript report as the type of `value` inside the `if` block? ```ts function process(value: string | number) { if (typeof value === \"string\") { // What is the type of value here? } } ```",
    answers: [
      "string | number",
      "any",
      "unknown",
      "string",
    ],
    correctAnswer: "string",
    explanation: "TypeScript uses control flow analysis for type narrowing. Inside the `if (typeof value === \"string\")` block, TypeScript narrows the type from `string | number` to just `string`, giving you access to string methods."
  },
  {
    id: 'typescript-6',
    question: "Which of these correctly defines a readonly array that cannot be modified after creation?",
    answers: [
      "const arr: number[] = [1, 2, 3];",
      "let arr: readonly number[] = [1, 2, 3];",
      "let arr: frozen number[] = [1, 2, 3];",
      "let arr: immutable number[] = [1, 2, 3];",
    ],
    correctAnswer: "let arr: readonly number[] = [1, 2, 3];",
    explanation: "`ReadonlyArray` and `readonly number[]` both create an array type where mutation methods like `push`, `pop`, and index assignment are not available. `const` only prevents reassignment of the variable, not mutation of the array contents."
  },
  {
    id: 'typescript-7',
    question: "What is the resulting type of accessing a tuple element at a specific index? ```ts type MyTuple = [string, number, boolean]; type Second = MyTuple[1]; ```",
    answers: [
      "number",
      "boolean",
      "string",
      "string | number | boolean",
    ],
    correctAnswer: "number",
    explanation: "Tuples in TypeScript have fixed types at each position. Using indexed access `MyTuple[1]` retrieves the type at index 1, which is `number`. This is different from regular arrays where all elements share the same type."
  },
  {
    id: 'typescript-8',
    question: "Given the following enum, what is the value of `Direction.Down`? ```ts enum Direction { Up = 1, Down, Left, Right } ```",
    answers: [
      "0",
      "1",
      "\"Down\"",
      "2",
    ],
    correctAnswer: "2",
    explanation: "In numeric enums, TypeScript auto-increments values from the last explicitly set value. `Up` is set to `1`, so `Down` is `2`, `Left` is `3`, and `Right` is `4`."
  },
  {
    id: 'typescript-9',
    question: "What happens when you try to compile the following TypeScript code? ```ts interface Config { readonly host: string; readonly port: number; } const config: Config = { host: \"localhost\", port: 3000 }; config.port = 8080; ```",
    answers: [
      "It compiles and runs successfully, setting port to 8080",
      "It throws a runtime error when assigning to port",
      "It produces a compile-time error because port is readonly",
      "It silently ignores the assignment and port remains 3000",
    ],
    correctAnswer: "It produces a compile-time error because port is readonly",
    explanation: "The `readonly` modifier on interface properties prevents reassignment after the object is created. Attempting to assign a new value to `config.port` will produce a compile-time error, but only in TypeScript — it has no runtime effect."
  },
  {
    id: 'typescript-10',
    question: "What type does TypeScript infer for the variable `items` in this code? ```ts let items = [1, \"hello\", true]; ```",
    answers: [
      "(string | number | boolean)[]",
      "[number, string, boolean]",
      "any[]",
      "unknown[]",
    ],
    correctAnswer: "(string | number | boolean)[]",
    explanation: "When TypeScript infers the type of an array containing mixed types, it creates a union type array. Since the array contains a number, a string, and a boolean, the inferred type is `(string | number | boolean)[]`."
  },
];

export default tsQuestions;
