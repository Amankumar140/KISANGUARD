import React from 'react';

export const KisanGuardLogo = ({ className = "w-8 h-8", withBadge = false }) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        {/* Outer Shield Geometry with Bauhaus Border */}
        <path
          d="M32 3L8 11.5V29C8 44.5 18.5 56 32 61C45.5 56 56 44.5 56 29V11.5L32 3Z"
          fill="#14532D"
          stroke="#172016"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        
        {/* Subtle Inner Shield Layer for Depth */}
        <path
          d="M32 8L13 14.8V28.5C13 41.5 21.5 51.5 32 55.8C42.5 51.5 51 41.5 51 28.5V14.8L32 8Z"
          fill="#196335"
          opacity="0.8"
        />
        
        {/* Central Crop Sprout Stem in Harvest Gold */}
        <path
          d="M32 49V25"
          stroke="#EAB308"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        
        {/* Left Sprout Leaf */}
        <path
          d="M32 37C24.5 37 19.5 31.5 20.5 22.5C27 22.5 31.5 27 32 37Z"
          fill="#EAB308"
          stroke="#172016"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        {/* Right Sprout Leaf */}
        <path
          d="M32 30C39 30 44 24.5 43 16C36.5 16 32.5 20.5 32 30Z"
          fill="#FDE047"
          stroke="#172016"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        
        {/* Top Protective Emblem / Seed Core */}
        <circle
          cx="32"
          cy="18"
          r="2.75"
          fill="#FFFFFF"
          stroke="#172016"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

export default KisanGuardLogo;
