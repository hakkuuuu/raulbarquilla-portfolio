'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(cursorX, { stiffness: 1000, damping: 50 });
  const dotY = useSpring(cursorY, { stiffness: 1000, damping: 50 });

  // Ring lags behind for a trailing effect
  const ringX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const ringY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"]');
      if (target) setIsHovering(true);
    };

    const handleMouseLeave = (e) => {
      const target = e.target.closest('a, button, [data-cursor="pointer"]');
      if (target) setIsHovering(false);
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: '50%',
          border: '1.5px solid',
        }}
        animate={{
          width: isHovering ? 44 : isClicking ? 20 : 32,
          height: isHovering ? 44 : isClicking ? 20 : 32,
          opacity: isVisible ? 1 : 0,
          borderColor: isHovering
            ? 'rgb(37 99 235)' // blue-600
            : 'rgb(156 163 175 / 0.6)', // gray-400/60
          backgroundColor: isHovering ? 'rgb(37 99 235 / 0.08)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 6 : isClicking ? 10 : 6,
          height: isHovering ? 6 : isClicking ? 10 : 6,
          opacity: isVisible ? 1 : 0,
          backgroundColor: isHovering ? 'rgb(37 99 235)' : 'rgb(107 114 128)',
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
      />
    </>
  );
};

export default CustomCursor;
