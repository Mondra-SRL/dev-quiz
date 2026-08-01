import styles from './FormattedText.module.css';

export function InlineCodeText({ text }) {
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    const isInlineCode = part.startsWith('`') && part.endsWith('`');

    if (!isInlineCode) return part;

    return (
      <code className={styles.inlineCode} key={`${part}-${index}`}>
        {part.slice(1, -1)}
      </code>
    );
  });
}

export function FormattedQuestion({ text, id, className }) {
  const fencedCode = /```([\w-]+)?\s*([\s\S]*?)```/.exec(text);

  if (!fencedCode) {
    return (
      <h1 id={id} className={className}>
        <InlineCodeText text={text} />
      </h1>
    );
  }

  const prompt = text.slice(0, fencedCode.index).trim();
  const trailingText = text.slice(fencedCode.index + fencedCode[0].length).trim();
  const language = fencedCode[1];
  const code = fencedCode[2].trim();

  return (
    <>
      <h1 id={id} className={className}>
        <InlineCodeText text={prompt} />
      </h1>
      <pre className={styles.codeBlock} aria-label={`${language ?? 'Code'} example`}>
        <code>{code}</code>
      </pre>
      {trailingText && (
        <p className={styles.trailingText}>
          <InlineCodeText text={trailingText} />
        </p>
      )}
    </>
  );
}
