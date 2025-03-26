
import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

const AnimatedText = ({ text, className = '', element = 'h1', delay = 0 }: AnimatedTextProps) => {
  const textRef = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (!textRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('reveal-text');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(textRef.current);
    
    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [delay]);
  
  const Element = element;
  
  return (
    <Element ref={textRef} className={`opacity-0 ${className}`}>
      {text}
    </Element>
  );
};

export default AnimatedText;
