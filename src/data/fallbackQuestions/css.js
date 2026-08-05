// Sourced from quizapi.io (quiz_id in src/data/quizTopics.js).
// Used when the live API call fails.
const cssQuestions = [
  {
    id: 'css-1',
    question: "You have a flex container with three child elements. You want all items to be evenly spaced with equal gaps between them and no space at the edges. Which `justify-content` value achieves this?",
    answers: [
      "space-around",
      "space-between",
      "space-evenly",
      "center",
    ],
    correctAnswer: "space-between",
    explanation: "`space-between` distributes items so the first item is flush to the start, the last is flush to the end, and remaining space is evenly distributed between them — no space at the edges."
  },
  {
    id: 'css-2',
    question: `Given this CSS, what is the total width of the element?
\`\`\`css
.box {
  width: 200px;
  padding: 20px;
  border: 5px solid black;
  margin: 10px;
  box-sizing: content-box;
}
\`\`\``,
    answers: [
      "200px",
      "240px",
      "250px",
      "270px",
    ],
    correctAnswer: "250px",
    explanation: "With `box-sizing: content-box` (the default), total width = width + left padding + right padding + left border + right border = 200 + 20 + 20 + 5 + 5 = 250px. Margins are not included in the element's width."
  },
  {
    id: 'css-3',
    question: "Which `position` value removes an element from the normal document flow AND positions it relative to the nearest positioned ancestor?",
    answers: [
      "relative",
      "fixed",
      "sticky",
      "absolute",
    ],
    correctAnswer: "absolute",
    explanation: "`position: absolute` removes the element from normal flow and positions it relative to the nearest ancestor that has a position value other than `static`. If no positioned ancestor exists, it uses the initial containing block."
  },
  {
    id: 'css-4',
    question: "In CSS Grid, what does the `fr` unit represent? ```css .grid { display: grid; grid-template-columns: 1fr 2fr 1fr; } ```",
    answers: [
      "A fraction of the available space in the grid container",
      "A fixed unit equal to 1% of the viewport width",
      "A fraction of the parent element's font size",
      "A shorthand for 'flexible rem' units",
    ],
    correctAnswer: "A fraction of the available space in the grid container",
    explanation: "The `fr` unit represents a fraction of the available space in the grid container. In this example, the container is divided into 4 equal parts (1+2+1), with the middle column getting 2 parts and the outer columns getting 1 part each."
  },
  {
    id: 'css-5',
    question: "You want a flex item to take up twice as much available space as its siblings. Which property should you set on that item?",
    answers: [
      "flex-basis: 200%",
      "flex-shrink: 2",
      "flex-grow: 2",
      "flex-direction: grow",
    ],
    correctAnswer: "flex-grow: 2",
    explanation: "`flex-grow: 2` tells the browser to give this item twice as much of the remaining space compared to siblings with `flex-grow: 1` (the default when using the `flex` shorthand). It controls how extra space is distributed."
  },
  {
    id: 'css-6',
    question: "What happens when you set `display: inline-block` on an element compared to `display: inline`?",
    answers: [
      "The element starts on a new line and takes full width",
      "The element flows inline but respects width, height, and vertical margin/padding",
      "The element becomes invisible but still takes up space",
      "The element behaves identically to display: inline",
    ],
    correctAnswer: "The element flows inline but respects width, height, and vertical margin/padding",
    explanation: "`inline-block` elements flow inline like text but respect width/height and vertical margin/padding, unlike pure `inline` elements which ignore explicit width/height settings and don't respect top/bottom margins."
  },
  {
    id: 'css-7',
    question: "Which CSS property controls the spacing between grid tracks (rows and columns) in a grid container?",
    answers: [
      "grid-spacing",
      "margin",
      "padding",
      "gap",
    ],
    correctAnswer: "gap",
    explanation: "The `gap` property (shorthand for `row-gap` and `column-gap`) sets the spacing between grid tracks. It replaced the older `grid-gap` property and also works in Flexbox containers."
  },
  {
    id: 'css-8',
    question: "A child element has `z-index: 9999` but still appears behind another element with `z-index: 1`. What is the most likely cause?",
    answers: [
      "The parent element creates a stacking context with a lower z-index",
      "z-index values above 999 are invalid and get ignored",
      "The child element needs position: relative to use z-index",
      "The other element is using !important on its z-index",
    ],
    correctAnswer: "The parent element creates a stacking context with a lower z-index",
    explanation: "Each stacking context is self-contained — a child's `z-index` only competes within its parent's stacking context. If the parent creates a stacking context with a lower `z-index` than another element's context, the child can never appear above it regardless of its own `z-index` value."
  },
  {
    id: 'css-9',
    question: "You want a navigation bar to scroll with the page normally, but then stick to the top when the user scrolls past it. Which `position` value should you use?",
    answers: [
      "fixed",
      "absolute",
      "sticky",
      "relative",
    ],
    correctAnswer: "sticky",
    explanation: "`position: sticky` acts like `relative` until the element reaches a specified scroll position (e.g., `top: 0`), then it behaves like `fixed`, sticking in place. It requires a `top`, `bottom`, `left`, or `right` value to work."
  },
  {
    id: 'css-10',
    question: "What is the default `flex-direction` of a flex container, and how does it affect the main axis?",
    answers: [
      "column — items stack vertically and the main axis is vertical",
      "row — items flow horizontally and the main axis is horizontal",
      "row-reverse — items flow right-to-left and the main axis is horizontal",
      "inherit — it depends on the parent element's direction",
    ],
    correctAnswer: "row — items flow horizontally and the main axis is horizontal",
    explanation: "The default `flex-direction` is `row`, which sets the main axis to horizontal (left to right in LTR languages). `justify-content` works along this main axis, while `align-items` works along the cross axis (vertical)."
  },
];

export default cssQuestions;
