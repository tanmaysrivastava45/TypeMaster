import { useState, useEffect } from 'react';
import TypingBox from './components/TypingBox';
import Result from './components/Result';
import { paragraphs } from './data/sampleParagraphs';

function App() {
  const [text, setText] = useState('');
  const [typedText, setTypedText] = useState('');
  const [timeLimit, setTimeLimit] = useState(30);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const getLongParagraph = () => {
    let longText = '';
    while (longText.length < 500) {
      longText += paragraphs[Math.floor(Math.random() * paragraphs.length)] + ' ';
    }
    return longText.trim();
  };

  useEffect(() => {
    setText(getLongParagraph());
  }, []);

  useEffect(() => {
    let timer;
    if (isStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isStarted) {
      setIsFinished(true);
      setIsStarted(false);
      setEndTime(Date.now());
    }
    return () => clearInterval(timer);
  }, [isStarted, timeLeft]);

  const handleRestart = () => {
    setText(getLongParagraph());
    setTypedText('');
    setTimeLeft(timeLimit);
    setIsStarted(false);
    setIsFinished(false);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-gray-900 text-white font-mono">
      <h1 className="text-3xl font-bold mb-6">Typing Speed Test</h1>

      <div className="mb-4">
        <label className="mr-2">Time:</label>
        <select
          className="bg-gray-800 border border-gray-600 px-3 py-1 rounded"
          value={timeLimit}
          onChange={(e) => {
            setTimeLimit(Number(e.target.value));
            setTimeLeft(Number(e.target.value));
          }}
          disabled={isStarted}
        >
          <option value={15}>15s</option>
          <option value={30}>30s</option>
          <option value={60}>60s</option>
        </select>
      </div>

      <TypingBox
        originalText={text}
        typedText={typedText}
        setTypedText={setTypedText}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
        isFinished={isFinished}
        setStartTime={setStartTime}
      />

      <p className="mt-2 text-gray-400">Time Left: {timeLeft}s</p>

      {isFinished && (
        <Result
          originalText={text}
          typedText={typedText}
          duration={(endTime - startTime) / 1000}
        />
      )}

      <button
        onClick={handleRestart}
        className="mt-6 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded"
      >
        Restart Test
      </button>
    </div>
  );
}

export default App;
