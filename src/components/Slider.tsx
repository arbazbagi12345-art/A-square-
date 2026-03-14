import React, { useState } from 'react';
import { cn } from '../lib/utils';

interface SliderProps {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  orientation?: 'vertical' | 'horizontal';
  color?: 'orange' | 'blue' | 'green';
}

export const Slider: React.FC<SliderProps> = ({
  label,
  min = 0,
  max = 100,
  defaultValue = 50,
  onChange,
  orientation = 'vertical',
  color = 'orange'
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    onChange?.(newValue);
  };

  const colorClasses = {
    orange: 'accent-accent-orange',
    blue: 'accent-accent-blue',
    green: 'accent-accent-green'
  };

  return (
    <div className={cn(
      "flex gap-2 select-none",
      orientation === 'vertical' ? "flex-col items-center h-48" : "flex-row items-center w-full"
    )}>
      <div className={cn(
        "relative flex items-center justify-center bg-[#0a0a0b] rounded-full border border-white/5 shadow-inner",
        orientation === 'vertical' ? "w-4 h-32" : "h-4 w-full"
      )}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={handleChange}
          className={cn(
            "appearance-none bg-transparent cursor-pointer",
            orientation === 'vertical' ? "-rotate-90 w-28" : "w-full",
            colorClasses[color]
          )}
          style={{
            WebkitAppearance: 'none',
          }}
        />
      </div>
      <div className="flex flex-col items-center">
        <span className="lcd-display mb-1 min-w-[30px] text-center">
          {value}
        </span>
        <span className="text-[9px] uppercase tracking-widest font-mono text-text-dim font-bold">
          {label}
        </span>
      </div>
    </div>
  );
};
