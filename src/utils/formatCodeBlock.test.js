import test from "node:test";
import assert from "node:assert/strict";
import { formatCodeBlock } from "./formatCodeBlock.js";

test("formats compact brace-based code into indented lines", () => {
  assert.equal(
    formatCodeBlock(
      "function greet() { const message = 'hello'; return message; }",
      "js",
    ),
    [
      "function greet() {",
      "  const message = 'hello';",
      "  return message;",
      "}",
    ].join("\n"),
  );
});

test("does not split delimiters inside strings", () => {
  assert.equal(
    formatCodeBlock("const value = '{ one; two; }';", "ts"),
    "const value = '{ one; two; }';",
  );
});

test("keeps destructuring and object arguments inline", () => {
  assert.equal(
    formatCodeBlock(
      "function Room({ roomId }) { connect({ roomId, retry: true }); }",
      "jsx",
    ),
    [
      "function Room({ roomId }) {",
      "  connect({ roomId, retry: true });",
      "}",
    ].join("\n"),
  );
});

test("keeps simple JSX expressions inline", () => {
  assert.equal(
    formatCodeBlock("function Count() { return Count: {count}; }", "jsx"),
    ["function Count() {", "  return Count: {count};", "}"].join("\n"),
  );
});

test("formats compact Python statements without splitting comprehensions", () => {
  assert.equal(
    formatCodeBlock(
      "result = [x**2 for x in range(6) if x % 2] print(result)",
      "python",
    ),
    "result = [x**2 for x in range(6) if x % 2]\nprint(result)",
  );
});

test("preserves code that already contains line breaks", () => {
  const code = "const first = 1;\nconst second = 2;";

  assert.equal(formatCodeBlock(code, "js"), code);
});