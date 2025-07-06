import { useEffect, useRef } from 'react';

function TypingBox({ originalText, typedText, setTypedText, isStarted, setIsStarted, isFinished, setStartTime }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [isStarted]);

  const renderText = () => {
    return originalText.split('').map((char, index) => {
      let color = '';
      if (index < typedText.length) {
        color = typedText[index] === char ? 'text-green-400' : 'text-red-500';
      } else if (index === typedText.length && !isFinished) {
        color = 'underline text-blue-300';
      }

      return (
        <span key={index} className={`${color}`}>{char}</span>
      );
    });
  };

  return (
    <div className="w-full max-w-2xl">
      <div
        className="p-4 mb-4 bg-gray-800 rounded text-lg leading-relaxed break-words min-h-[120px] max-h-[200px] overflow-y-auto"
        onClick={() => inputRef.current.focus()}
      >
        {renderText()}
      </div>

      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute"
        value={typedText}
        disabled={isFinished}
        onChange={(e) => {
          if (!isStarted) {
            setIsStarted(true);
            setStartTime(Date.now());
          }
          setTypedText(e.target.value);
        }}
      />
    </div>
  );
}

export default TypingBox;

