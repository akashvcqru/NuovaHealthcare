import React from "react";
import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number; // e.g. 4.7
  max?: number;
  size?: number; // width/height in px
  className?: string;
}

export default function Rating({ value, max = 5, size = 16, className = "" }: RatingProps) {
  const stars = [];
  const roundedValue = Math.round(value * 2) / 2; // round to nearest 0.5

  for (let i = 1; i <= max; i++) {
    if (i <= roundedValue) {
      // Full Star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          className="fill-yellow-400 text-yellow-400" 
        />
      );
    } else if (i - 0.5 === roundedValue) {
      // Half Star
      stars.push(
        <StarHalf 
          key={i} 
          size={size} 
          className="fill-yellow-400 text-yellow-400" 
        />
      );
    } else {
      // Empty Star
      stars.push(
        <Star 
          key={i} 
          size={size} 
          className="text-gray-300 fill-none" 
        />
      );
    }
  }

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {stars}
    </div>
  );
}
