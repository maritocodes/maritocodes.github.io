import { useEffect, useRef, useState } from "react";

const GAP = 64;

const SkillsCarousel = ({ children }: { children: React.ReactNode[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [swinging, setSwinging] = useState(false);
  const items = [...children, ...children];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let isAnimating = false;

    const move = () => {
      if (isAnimating) return;
      isAnimating = true;

      const first = container.children[0] as HTMLElement;
      const width = first.offsetWidth + GAP;

      container.style.transition = "transform 2s ease-in";
      container.style.transform = `translateX(-${width}px)`;

      setTimeout(() => {
        container.style.transition = "none";
        container.style.transform = "translateX(0)";
        container.appendChild(first);

        // Trigger swing on ALL items
        setSwinging(true);
        setTimeout(() => setSwinging(false), 700);

        isAnimating = false;
      }, 2000);
    };

    const interval = setInterval(move, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-hidden w-full flex flex-col items-center">
      <img draggable={false}  src="/wire.svg" className="w-screen h-8 pt-4 object-fill" />
      <div
        ref={containerRef}
        className="flex items-start mt-[-24px]"
        style={{ gap: `${GAP}px` }}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={`flex items-center justify-center shrink-0 origin-top ${
              swinging ? "animate-swing" : ""
            }`}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsCarousel;
