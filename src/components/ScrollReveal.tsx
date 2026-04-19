// ScrollReveal.tsx
import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
}

const ScrollReveal = ({ children }: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Cuando el elemento entra en la pantalla
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Opcional: Desconectar el observer si solo quieres que se anime una vez
          observer.disconnect(); 
        }
      },
      { 
        // 0.2 significa que la animación empezará cuando el 20% del componente sea visible
        threshold: 0.2 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out w-full flex justify-center ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
      }`}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;