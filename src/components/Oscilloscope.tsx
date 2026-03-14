import React, { useEffect, useRef } from 'react';

interface OscilloscopeProps {
  isActive: boolean;
  color?: string;
  className?: string;
}

export const Oscilloscope: React.FC<OscilloscopeProps> = ({ 
  isActive, 
  color = '#00D1FF',
  className 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (!isActive) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();
        animationRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 4;
      ctx.shadowColor = color;

      for (let x = 0; x < canvas.width; x++) {
        const y = (canvas.height / 2) + 
          Math.sin(x * 0.05 + offset) * 15 + 
          Math.sin(x * 0.12 + offset * 0.5) * 5;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      offset += 0.15;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive, color]);

  return (
    <div className={className}>
      <canvas 
        ref={canvasRef} 
        width={200} 
        height={60} 
        className="w-full h-full bg-black/40 rounded border border-white/5"
      />
    </div>
  );
};
