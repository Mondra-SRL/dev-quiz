const BRACE_LANGUAGES = new Set([
  "css",
  "js",
  "javascript",
  "jsx",
  "ts",
  "tsx",
  "typescript",
]);

const getNextNonWhitespace = (source, startIndex) => {
  for (let index = startIndex; index < source.length; index += 1) {
    if (!/\s/.test(source[index])) return source[index];
  }

  return "";
};

const startsSimpleInlineExpression = (source, startIndex) => {
  const closingBraceIndex = source.indexOf("}", startIndex);

  if (closingBraceIndex === -1) return false;

  const expression = source.slice(startIndex, closingBraceIndex).trim();
  return /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*$/.test(expression);
};

function formatBraceCode(source, language) {
  let result = "";
  let indentLevel = 0;
  let parenthesisDepth = 0;
  const braceKinds = [];
  let quote = null;
  let isEscaped = false;
  let isLineStart = true;

  const append = (value) => {
    if (isLineStart) {
      result += "  ".repeat(indentLevel);
      isLineStart = false;
    }

    result += value;
  };

  const addLineBreak = () => {
    result = result.trimEnd();

    if (!result.endsWith("\n")) result += "\n";
    isLineStart = true;
  };

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      append(character);

      if (isEscaped) {
        isEscaped = false;
      } else if (character === "\\") {
        isEscaped = true;
      } else if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === "'" || character === '"' || character === "`") {
      quote = character;
      append(character);
      continue;
    }

    if (character === "(") {
      parenthesisDepth += 1;
      append(character);
      continue;
    }

    if (character === ")") {
      parenthesisDepth = Math.max(parenthesisDepth - 1, 0);
      append(character);
      continue;
    }

    if (character === "{") {
      const startsArrowBlock = result.trimEnd().endsWith("=>");
      const isInlineBrace =
        language !== "css" &&
        ((parenthesisDepth > 0 && !startsArrowBlock) ||
          startsSimpleInlineExpression(source, index + 1));

      braceKinds.push(isInlineBrace ? "inline" : "block");

      if (isInlineBrace) {
        append(character);
        continue;
      }

      result = result.trimEnd();
      append(" {");
      indentLevel += 1;
      addLineBreak();
      continue;
    }

    if (character === "}") {
      const braceKind = braceKinds.pop();

      if (braceKind === "inline") {
        append(character);
        continue;
      }

      if (!isLineStart) addLineBreak();
      indentLevel = Math.max(indentLevel - 1, 0);
      append("}");

      const nextCharacter = getNextNonWhitespace(source, index + 1);
      if (![";", ",", ")", "]"].includes(nextCharacter)) addLineBreak();
      continue;
    }

    if (character === ";") {
      append(character);

      if (parenthesisDepth === 0) {
        addLineBreak();
      }

      continue;
    }

    if (/\s/.test(character)) {
      if (!isLineStart && !result.endsWith(" ")) result += " ";
      continue;
    }

    append(character);
  }

  return result.trim();
}

function formatPythonCode(source) {
  let result = "";
  let nestingDepth = 0;
  let quote = null;
  let isEscaped = false;

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];

    if (quote) {
      result += character;

      if (isEscaped) {
        isEscaped = false;
      } else if (character === "\\") {
        isEscaped = true;
      } else if (character === quote) {
        quote = null;
      }

      continue;
    }

    if (character === "'" || character === '"') {
      quote = character;
      result += character;
      continue;
    }

    if ("([{".includes(character)) nestingDepth += 1;
    if (")]}".includes(character)) {
      nestingDepth = Math.max(nestingDepth - 1, 0);
    }

    if (/\s/.test(character) && nestingDepth === 0) {
      const remainingSource = source.slice(index).trimStart();
      const startsStatement = /^(?:[A-Za-z_]\w*\s*(?:=|\.|\[)|(?:print|return|raise|import|from|if|elif|else|for|while|try|except|with)\b)/.test(
        remainingSource,
      );

      if (startsStatement && result.trim() && !result.endsWith("\n")) {
        result = `${result.trimEnd()}\n`;
        continue;
      }
    }

    if (/\s/.test(character)) {
      if (result && !/[\s\n]$/.test(result)) result += " ";
      continue;
    }

    result += character;
  }

  return result.trim();
}

export function formatCodeBlock(code, language = "") {
  const source = code.trim();

  // Preserve intentional formatting supplied by the question author.
  if (!source || /\r|\n/.test(source)) return source;

  const normalizedLanguage = language.toLowerCase();

  if (normalizedLanguage === "python" || normalizedLanguage === "py") {
    return formatPythonCode(source);
  }

  if (BRACE_LANGUAGES.has(normalizedLanguage)) {
    return formatBraceCode(source, normalizedLanguage);
  }

  return source;
}