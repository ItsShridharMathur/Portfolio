import { useState, useEffect } from "react";

interface TypedTextProps {
  words: string[];
  speed?: number;
  backSpeed?: number;
  delay?: number;
}

export default function TypedText({
  words,
  speed = 75,
  backSpeed = 35,
  delay = 1800
}: TypedTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[wordIdx];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      // Deleting character flow
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
      }, backSpeed);
    } else {
      // Typing character flow
      timer = setTimeout(() => {
        setDisplayText(currentWord.substring(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
      }, speed);
    }

    // Checking word boundaries
    if (!isDeleting && charIdx === currentWord.length) {
      // Finished typing current word. Wait, then start deleting.
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && charIdx === 0) {
      // Finished deleting current word. Switch to the next word.
      setIsDeleting(false);
      setWordIdx((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, wordIdx, words, speed, backSpeed, delay]);

  return (
    <span className="inline-flex items-center">
      <span className="text-ai-cyan font-mono tracking-wide">{displayText}</span>
      <span className="w-[3px] h-5 bg-ai-cyan/80 ml-1 animate-pulse"></span>
    </span>
  );
}
