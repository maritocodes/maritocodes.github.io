import { useEffect, useRef, useState } from "react";

interface Props {
  visible: boolean;
}

const PortalSpinner = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const cx = 40, cy = 55, rx = 28, ry = 44;
    const span = Math.PI * 0.72;
    const gap = Math.PI - span;
    const steps = 20;
    let angle = 0;
    let last: number | null = null;
    let frameId: number;

    const drawArc = (startAngle: number, endAngle: number, color: string) => {
      const range = endAngle - startAngle;
      for (let i = 0; i < steps; i++) {
        const t = i / steps;
        const a1 = startAngle + range * (i / steps);
        const a2 = startAngle + range * ((i + 1) / steps);
        ctx.beginPath();
        ctx.moveTo(cx + rx * Math.cos(a1), cy + ry * Math.sin(a1));
        ctx.lineTo(cx + rx * Math.cos(a2), cy + ry * Math.sin(a2));
        ctx.lineWidth = 1 + t * 7;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };

    const draw = (ts: number) => {
      if (last !== null) angle += ((ts - last) / 1000) * 3;
      last = ts;
      ctx.clearRect(0, 0, 80, 110);
      ctx.lineCap = "round";
      drawArc(angle + gap / 2, angle + gap / 2 + span, "#FF9000");
      drawArc(angle + Math.PI + gap / 2, angle + Math.PI + gap / 2 + span, "#84b4ff");
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frameId);
  }, []);

  return <canvas ref={canvasRef} width={80} height={110} />;
};

const LoadingScreen = ({ visible }: Props) => {
  const [shouldRender, setShouldRender] = useState(visible);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [visible]);

  useEffect(() => {
    let delayBeforeAnim: ReturnType<typeof setTimeout>;
    let delayBeforeUnmount: ReturnType<typeof setTimeout>;

    if (!visible) {
      const INITIAL_DELAY = 1000;
      
      delayBeforeAnim = setTimeout(() => {
        setIsFadingOut(true); 

        const TRANSITION_DURATION = 1000; 
        const EXTRA_BUFFER = 500; 

        delayBeforeUnmount = setTimeout(() => {
          setShouldRender(false);
        }, TRANSITION_DURATION + EXTRA_BUFFER);

      }, INITIAL_DELAY);

    } else {
      setShouldRender(true);
      setIsFadingOut(false);
    }

    return () => {
      clearTimeout(delayBeforeAnim);
      clearTimeout(delayBeforeUnmount);
    };
  }, [visible]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#00122e] flex flex-col gap-4 items-center justify-center transition-opacity duration-1000 ease-in-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <PortalSpinner />
      <p className="text-white">Loading...</p>
    </div>
  );
};

export default LoadingScreen;