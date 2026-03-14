import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface KnobProps {
  label: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  unit?: string;
  color?: 'orange' | 'blue' | 'green';
}

export const Knob: React.FC<KnobProps> = ({
  label,
  min = 0,
  max = 100,
  step = 1,
  defaultValue = 50,
  onChange,
  size = 'md',
  unit = '',
  color = 'orange'
}) => {
  const [value, setValue] = useState(defaultValue);
  const knobRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  };

  const colorClasses = {
    orange: 'bg-accent-orange',
    blue: 'bg-accent-blue',
    green: 'bg-accent-green'
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startValue.current = value;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const deltaY = startY.current - e.clientY;
    const sensitivity = 0.5;
    let newValue = startValue.current + deltaY * sensitivity * step;
    newValue = Math.max(min, Math.min(max, newValue));
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  // Calculate rotation (from -135 to 135 degrees)
  const rotation = ((value - min) / (max - min)) * 270 - 135;

  return (
    <div className="flex flex-col items-center gap-2 select-none">
      <div className="relative group">
        {/* Outer Track */}
        <div className={cn(
          "knob-track flex items-center justify-center",
          sizeClasses[size]
        )}>
          {/* Inner Knob */}
          <motion.div
            ref={knobRef}
            onMouseDown={handleMouseDown}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={cn(
              "rounded-full bg-gradient-to-b from-[#2a2c31] to-[#1a1b1e] shadow-lg cursor-ns-resize relative border border-white/5",
              size === 'sm' ? 'w-8 h-8' : size === 'md' ? 'w-11 h-11' : 'w-16 h-16'
            )}
            style={{ rotate: `${rotation}deg` }}
          >
            {/* Indicator Line */}
            <div className={cn(
              "absolute top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 rounded-full",
              colorClasses[color]
            )} />
          </motion.div>
        </div>
        
        {/* Value Tooltip (visible on hover or drag) */}
        <div className={cn(
          "absolute -top-8 left-1/2 -translate-x-1/2 lcd-display opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none",
          isDragging && "opacity-100"
        )}>
          {Math.round(value)}{unit}
        </div>
      </div>
      
      <span className="text-[9px] uppercase tracking-widest font-mono text-text-dim font-bold">
        {label}
      </span>
    </div>
  );
};
