function Result({ originalText, typedText, duration }) {
  const words = typedText.trim().split(/\s+/).length;
  const correctChars = typedText.split('').filter((ch, idx) => ch === originalText[idx]).length;
  const accuracy = ((correctChars / typedText.length) * 100).toFixed(2) || 0;

  const timeMinutes = duration / 60;
  const wpm = Math.round((correctChars/5) / timeMinutes);

  return (
    <div className="mt-4 text-center">
      <p className="text-green-400">Words Typed: {words}</p>
      <p className="text-yellow-400">WPM: {wpm}</p>
      <p className="text-blue-400">Accuracy: {accuracy}%</p>
    </div>
  );
}

export default Result;
