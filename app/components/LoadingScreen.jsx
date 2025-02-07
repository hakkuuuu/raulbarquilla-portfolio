import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState('');
  const [phase, setPhase] = useState(1);
  const [fadeOut, setFadeOut] = useState(false); // Controls fade effect

  const texts = [
    '<Hello, world/>',
    "Welcome to Dev.Haku's Space 🌌",
  ];

  useEffect(() => {
    let index = 0;
    let interval;

    const startTyping = (fullText, nextPhase) => {
      setFadeOut(false); // Reset fade-out effect
      index = 0;

      interval = setInterval(() => {
        setText(fullText.substring(0, index));
        index++;

        if (index > fullText.length) {
          clearInterval(interval);
          setTimeout(() => {
            setFadeOut(true); // Fade out before switching
            setTimeout(() => setPhase(nextPhase), 500);
          }, 500);
        }
      }, 80);
    };

    if (phase <= texts.length) {
      startTyping(texts[phase - 1], phase + 1);
    } else {
      setTimeout(onComplete, 500); // Call onComplete after the last phase
    }

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <div className="fixed inset-0 z-50 text-gray-100 flex flex-col items-center justify-center p-4 transition-all duration-1000">
      {/* Typing Text */}
      <div
        className={`mb-4 text-3xl md:text-4xl font-mono font-bold text-center transition-all duration-700 ${
          fadeOut ? 'opacity-0 blur-md' : 'opacity-100 blur-0'
        }`}
      >
        {text} <span className="animate-blink ml-1">|</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-[200px] sm:max-w-[300px] md:max-w-[400px] h-[3px] bg-gray-800 rounded relative overflow-hidden">
        <div className="w-full h-full bg-blue-700 shadow-[0_0_15px_#3b82f6] animate-loading-bar"></div>
      </div>

      {/* Background Glow Effect */}
      <div className="absolute inset-0 transition-all duration-1000 ease-in-out blur-lg opacity-20"></div>
    </div>
  );
};
