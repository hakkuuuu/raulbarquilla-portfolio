import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(1); // Tracks which text is being displayed

  const text1 = 'Hello, World! 🌎';
  const text2 = `I'm Raul, Welcome to my digital space! 🚀`;

  useEffect(() => {
    let index = 0;
    let interval;

    const startTyping = (fullText, nextPhase) => {
      interval = setInterval(() => {
        setText(fullText.substring(0, index));
        index++;

        if (index > fullText.length) {
          clearInterval(interval);

          if (nextPhase) {
            setTimeout(() => {
              setPhase(nextPhase); // Switch to the next phase
            }, 1000);
          } else {
            setTimeout(onComplete, 1000);
          }
        }
      }, 100);
    };

    if (phase === 1) {
      startTyping(text1, 2);
    } else if (phase === 2) {
      setTimeout(() => {
        setText(''); // Clear the text before starting the second part
        startTyping(text2, null);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#070707] text-gray-100 flex flex-col items-center justify-center">
      <div className="mb-4 text-4xl font-mono font-bold">
        {text} <span className="animate-blink ml-1">|</span>
      </div>

      <div className="w-[300px] h-[2px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-full h-full bg-blue-700 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>
    </div>
  );
};