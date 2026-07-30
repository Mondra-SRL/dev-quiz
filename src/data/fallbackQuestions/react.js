// Sourced from quizapi.io (quiz_id in src/data/quizTopics.js).
// Used when the live API call fails.
const reactQuestions = [
  {
    id: 'react-1',
    question: "What does the following useState call do? ```jsx const [items, setItems] = useState(() => { return JSON.parse(localStorage.getItem('cart') || '[]'); }); ```",
    answers: [
      "It reads from localStorage on every re-render to keep state in sync",
      "It uses lazy initialization so the expensive computation only runs on the first render",
      "It creates a subscription that watches localStorage for external changes",
      "It throws an error because useState does not accept a function argument",
    ],
    correctAnswer: "It uses lazy initialization so the expensive computation only runs on the first render",
    explanation: "Passing a function to useState is called lazy initialization. The function only runs on the initial render, avoiding the expensive localStorage.getItem and JSON.parse calls on every re-render. If you passed the expression directly (without wrapping it in a function), it would execute on every render even though useState ignores the value after the first render."
  },
  {
    id: 'react-2',
    question: "What will be logged when the button is clicked once? ```jsx function Counter() { const [count, setCount] = useState(0); const handleClick = () => { setCount(count + 1); setCount(count + 1); setCount(count + 1); console.log(count); }; return Count: {count}; } ```",
    answers: [
      "It logs 3 because all three setCount calls are processed sequentially",
      "It logs 1 because React batches updates but processes them before the log",
      "It logs 0 because console.log captures the stale closure value before re-render",
      "It logs undefined because setCount is asynchronous",
    ],
    correctAnswer: "It logs 0 because console.log captures the stale closure value before re-render",
    explanation: "React batches state updates within event handlers. All three setCount calls use the same stale `count` value (0) from the closure, so they all set count to 0 + 1 = 1. The console.log runs synchronously before the re-render, so it logs the current closure value: 0. After the re-render, count will be 1, not 3. To increment three times, you'd use the functional updater: setCount(prev => prev + 1)."
  },
  {
    id: 'react-3',
    question: "What happens when this component mounts and then unmounts? ```jsx function ChatRoom({ roomId }) { useEffect(() => { const connection = createConnection(roomId); connection.connect(); return () => connection.disconnect(); }, [roomId]); return Welcome to {roomId}; } ```",
    answers: [
      "connect() runs on mount; disconnect() never runs because roomId doesn't change",
      "connect() runs on every render; disconnect() runs on unmount",
      "Both connect() and disconnect() run on mount due to React Strict Mode",
      "connect() runs on mount; disconnect() runs on unmount via the cleanup function",
    ],
    correctAnswer: "connect() runs on mount; disconnect() runs on unmount via the cleanup function",
    explanation: "The useEffect cleanup function (the returned arrow function) runs when the component unmounts and also before the effect re-runs when roomId changes. On mount, it connects. On unmount, the cleanup calls connection.disconnect(). This pattern prevents resource leaks like open WebSocket connections or event listeners."
  },
  {
    id: 'react-4',
    question: "This component has a bug. The alert always shows the initial message even after typing. Why? ```jsx function Messenger() { const [message, setMessage] = useState(''); useEffect(() => { const timer = setTimeout(() => { alert(message); }, 3000); }, []); return setMessage(e.target.value)} />; } ```",
    answers: [
      "setTimeout doesn't work inside useEffect due to React's synthetic event system",
      "The empty dependency array causes a stale closure — the callback captures the initial message value",
      "setMessage is asynchronous so the alert fires before state updates propagate",
      "The input is uncontrolled so message never actually updates",
    ],
    correctAnswer: "The empty dependency array causes a stale closure — the callback captures the initial message value",
    explanation: "The useEffect has an empty dependency array [], so it only runs once on mount. The setTimeout callback closes over the initial value of `message` (an empty string). Even though message updates via setMessage, the closure inside setTimeout still references the original value. This is a classic stale closure bug. To fix it, add `message` to the dependency array (and clear the previous timer in a cleanup function), or use a ref to track the latest value."
  },
  {
    id: 'react-5',
    question: "What is the primary use case for useRef that does NOT involve DOM elements? ```jsx function StopWatch() { const [elapsed, setElapsed] = useState(0); const intervalRef = useRef(null); const start = () => { intervalRef.current = setInterval(() => { setElapsed(prev => prev + 1); }, 1000); }; const stop = () => clearInterval(intervalRef.current); return (/* ... */); } ```",
    answers: [
      "Storing mutable values that persist across renders without triggering re-renders",
      "Caching expensive computations between renders to improve performance",
      "Sharing state between sibling components without prop drilling",
      "Creating reactive variables that automatically sync with the DOM",
    ],
    correctAnswer: "Storing mutable values that persist across renders without triggering re-renders",
    explanation: "useRef creates a mutable container (.current) that persists across re-renders without causing re-renders when mutated. Here it stores the interval ID so stop() can clear it later. Unlike state, changing a ref doesn't trigger a re-render. Unlike a local variable, a ref survives re-renders. This makes refs ideal for storing mutable values like timer IDs, previous state, or any instance-like variable."
  },
  {
    id: 'react-6',
    question: "Which statement correctly describes the difference between useMemo and useCallback? ```jsx const memoized = useMemo(() => computeExpensiveValue(a, b), [a, b]); const callback = useCallback(() => handleSubmit(formData), [formData]); ```",
    answers: [
      "useMemo caches the result of calling the function; useCallback caches the function reference itself",
      "useMemo runs the function asynchronously; useCallback runs it synchronously",
      "useMemo is for primitive values only; useCallback handles objects and arrays",
      "useMemo works during the render phase; useCallback works during the commit phase",
    ],
    correctAnswer: "useMemo caches the result of calling the function; useCallback caches the function reference itself",
    explanation: "useMemo calls the function and caches its return value. useCallback caches the function itself without calling it. Essentially, useCallback(fn, deps) is equivalent to useMemo(() => fn, deps). useMemo is for expensive computations; useCallback is for passing stable function references to child components that rely on referential equality (e.g., wrapped in React.memo)."
  },
  {
    id: 'react-7',
    question: "What advantage does useReducer offer over useState in this scenario? ```jsx function TodoApp() { const [state, dispatch] = useReducer(todoReducer, { todos: [], filter: 'all' }); return ( dispatch({ type: 'ADD_TODO', text: 'New' })}>Add dispatch({ type: 'TOGGLE_FILTER' })}>Filter dispatch({ type: 'CLEAR_COMPLETED' })}>Clear ); } ```",
    answers: [
      "useReducer automatically memoizes the state and prevents unnecessary re-renders",
      "useReducer replaces Redux entirely and provides global state management",
      "useReducer is faster than useState because it uses immutable data structures internally",
      "useReducer centralizes complex state logic in a testable reducer with a stable dispatch function",
    ],
    correctAnswer: "useReducer centralizes complex state logic in a testable reducer with a stable dispatch function",
    explanation: "useReducer centralizes complex state transitions in a single reducer function, making it easier to manage interdependent state updates (e.g., clearing completed todos might also reset the filter). The dispatch function is stable across renders (unlike inline callbacks), and the reducer can be tested independently. This is especially valuable when multiple actions modify the same state object in different ways."
  },
  {
    id: 'react-8',
    question: "What problem does this custom hook pattern solve? ```jsx function useDebounce(value, delay) { const [debouncedValue, setDebouncedValue] = useState(value); useEffect(() => { const timer = setTimeout(() => setDebouncedValue(value), delay); return () => clearTimeout(timer); }, [value, delay]); return debouncedValue; } ```",
    answers: [
      "It throttles the value to update at most once per delay period at regular intervals",
      "It delays the value update until the input stops changing for the specified delay period",
      "It batches multiple rapid state updates into a single synchronous update",
      "It caches the previous value and returns it while the new value is being computed",
    ],
    correctAnswer: "It delays the value update until the input stops changing for the specified delay period",
    explanation: "This custom hook delays updating the output value until the input value has stopped changing for the specified delay period. Each time `value` changes, the previous timer is cleared (via the cleanup function) and a new one starts. Only when `value` stabilizes for `delay` milliseconds does debouncedValue update. This is commonly used for search inputs to avoid firing API calls on every keystroke."
  },
  {
    id: 'react-9',
    question: "Which of the following violates the Rules of Hooks?",
    answers: [
      "Calling useState inside a custom hook named useAuth",
      "Calling useEffect twice in the same component with different dependencies",
      "Using useCallback inside an arrow function component",
      "Calling useState inside an if statement within a component",
    ],
    correctAnswer: "Calling useState inside an if statement within a component",
    explanation: "Hooks must be called at the top level of a component or custom hook — never inside conditions, loops, or nested functions. Calling useState inside an if block means React can't guarantee the same hooks run in the same order on every render, which breaks React's internal tracking of hook state. The other options are all valid: hooks can be called in custom hooks (useAuth), used multiple times, and in arrow function components."
  },
  {
    id: 'react-10',
    question: "What will this component render after clicking the button twice? ```jsx function App() { const [count, setCount] = useState(0); const prevCountRef = useRef(0); useEffect(() => { prevCountRef.current = count; }); return ( Now: {count}, Before: {prevCountRef.current} setCount(c => c + 1)}>+1 ); } ```",
    answers: [
      "Now: 2, Before: 2 — because the ref updates synchronously during render",
      "Now: 2, Before: 0 — because refs don't update across re-renders",
      "Now: 2, Before: 1 — because useEffect updates the ref after render with the previous count",
      "Now: 2, Before: undefined — because useRef doesn't persist values between renders",
    ],
    correctAnswer: "Now: 2, Before: 1 — because useEffect updates the ref after render with the previous count",
    explanation: "The useEffect (with no dependency array) runs after every render. During render, prevCountRef.current still holds the value from the previous render's effect. After clicking twice: count becomes 2, but prevCountRef.current was set to 1 after the previous render's effect. So the rendered output shows Now: 2, Before: 1. This is a common pattern for tracking the previous value of a prop or state variable."
  },
];

export default reactQuestions;
