// Sourced from quizapi.io (quiz_id in src/data/quizTopics.js).
// Used when the live API call fails.
const pythonQuestions = [
  {
    id: 'python-1',
    question: "What is the output of the following code? ```python s = 'hello world' print(s.title().swapcase()) ```",
    answers: [
      "Hello World",
      "HELLO WORLD",
      "hELLO wORLD",
      "hello world",
    ],
    correctAnswer: "hELLO wORLD",
    explanation: "`s.title()` converts to 'Hello World' (capitalizes first letter of each word). Then `.swapcase()` swaps the case of every character, resulting in 'hELLO wORLD'."
  },
  {
    id: 'python-2',
    question: "What does this slice expression return? ```python word = 'Python' print(word[1:4] + word[-2:]) ```",
    answers: [
      "'ython'",
      "'Pytho'",
      "'ythn'",
      "'thon'",
    ],
    correctAnswer: "'ython'",
    explanation: "`word[1:4]` slices from index 1 to 3, giving 'yth'. `word[-2:]` takes the last 2 characters, giving 'on'. Concatenated: 'yth' + 'on' = 'ython'."
  },
  {
    id: 'python-3',
    question: "What is the output of this f-string expression? ```python pi = 3.14159 print(f'{pi:.2f} is approximately {22/7:.4f}') ```",
    answers: [
      "3.14 is approximately 3.1429",
      "3.14159 is approximately 3.142857",
      "3.14 is approximately 3.1428",
      "Raises a ValueError",
    ],
    correctAnswer: "3.14 is approximately 3.1429",
    explanation: "The format spec `:.2f` rounds `pi` to 2 decimal places (3.14). The expression `22/7` evaluates to ~3.142857, and `:.4f` rounds it to 4 decimal places (3.1429)."
  },
  {
    id: 'python-4',
    question: "What does the following code produce? ```python path = r'C:\\new\\test' print(len(path)) ```",
    answers: [
      "11",
      "9",
      "15",
      "13",
    ],
    correctAnswer: "11",
    explanation: "The `r` prefix creates a raw string where backslashes are treated as literal characters. So `r'C:\\new\\test'` contains 11 characters: C, :, \\, n, e, w, \\, t, e, s, t. Without the raw prefix, `\\n` and `\\t` would be escape sequences."
  },
  {
    id: 'python-5',
    question: "Which expression produces the string `'aaa-bbb-ccc'` from the list `['aaa', 'bbb', 'ccc']`?",
    answers: [
      "'-'.join(['aaa', 'bbb', 'ccc'])",
      "['aaa', 'bbb', 'ccc'].join('-')",
      "str.concat(['aaa', 'bbb', 'ccc'], '-')",
      "merge('-', 'aaa', 'bbb', 'ccc')",
    ],
    correctAnswer: "'-'.join(['aaa', 'bbb', 'ccc'])",
    explanation: "The `str.join()` method concatenates an iterable of strings with the specified separator. `'-'.join(['aaa', 'bbb', 'ccc'])` produces `'aaa-bbb-ccc'`."
  },
  {
    id: 'python-6',
    question: "What is the output of this code? ```python nums = [1, 2, 3, 4, 5] nums[1:3] = [20, 30, 40] print(nums) ```",
    answers: [
      "[1, 20, 30, 4, 5]",
      "[1, [20, 30, 40], 4, 5]",
      "[1, 20, 30, 40, 4, 5]",
      "Raises a ValueError",
    ],
    correctAnswer: "[1, 20, 30, 40, 4, 5]",
    explanation: "Slice assignment replaces elements at indices 1 and 2 (values 2, 3) with three new elements (20, 30, 40). The list grows because more elements are inserted than removed, resulting in [1, 20, 30, 40, 4, 5]."
  },
  {
    id: 'python-7',
    question: "What does this list comprehension produce? ```python result = [x**2 for x in range(6) if x % 2 != 0] print(result) ```",
    answers: [
      "[0, 4, 16]",
      "[1, 4, 9, 16, 25]",
      "[0, 1, 4, 9, 16, 25]",
      "[1, 9, 25]",
    ],
    correctAnswer: "[1, 9, 25]",
    explanation: "`range(6)` gives 0-5. The filter `x % 2 != 0` keeps only odd numbers: 1, 3, 5. Squaring each gives [1, 9, 25]."
  },
  {
    id: 'python-8',
    question: "What is printed by this code? ```python a = [1, 2, 3] b = a[:] b.append(4) print(a, b) ```",
    answers: [
      "[1, 2, 3, 4] [1, 2, 3, 4]",
      "[1, 2, 3] [1, 2, 3, 4]",
      "[1, 2, 3] [1, 2, 3]",
      "Raises an AttributeError",
    ],
    correctAnswer: "[1, 2, 3] [1, 2, 3, 4]",
    explanation: "The slice `a[:]` creates a shallow copy of the list. Modifying `b` does not affect `a`. So `a` remains [1, 2, 3] and `b` becomes [1, 2, 3, 4]."
  },
  {
    id: 'python-9',
    question: "What is the output of this code? ```python matrix = [[i * j for j in range(1, 4)] for i in range(1, 4)] print(matrix[2][1]) ```",
    answers: [
      "4",
      "9",
      "3",
      "6",
    ],
    correctAnswer: "6",
    explanation: "The nested comprehension creates [[1,2,3],[2,4,6],[3,6,9]]. `matrix[2]` is [3,6,9] (third row, i=3). `matrix[2][1]` is 6 (second element)."
  },
  {
    id: 'python-10',
    question: "What does `sorted([3, 1, 2], reverse=True) == [3, 1, 2][::-1]` evaluate to?",
    answers: [
      "True",
      "False",
      "Raises a TypeError",
      "Depends on Python version",
    ],
    correctAnswer: "False",
    explanation: "`sorted([3,1,2], reverse=True)` sorts descending: [3,2,1]. `[3,1,2][::-1]` reverses the list: [2,1,3]. These are not equal, so the expression evaluates to False."
  },
];

export default pythonQuestions;
