
import { useEffect, useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
}

const AnimatedText = ({ text, className = '', element = 'h1', delay = 0 }: AnimatedTextProps) => {
  // We need a more specific approach for the ref
  const textRef = useRef<HTMLElement>(null);
  
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
  
  // Use a type assertion for the element
  const Component = element as keyof JSX.IntrinsicElements;
  
  // Render the component with the correct ref handling
  return (
    <Component 
      ref={textRef} 
      className={`opacity-0 ${className}`}
    >
      {text}
    </Component>
  );
};

export default AnimatedText;
