import React from 'react';

const Marquee = () => {
  const items = [
    "★ solving puzzles",
    "★ breaking things",
    "★ fixing them later",
    "★ staying caffeinated"
  ];

  // Tripled for seamless infinite scroll
  const marqueeContent = [...items, ...items, ...items, ...items];

  return (
    <div className="relative flex overflow-x-hidden bg-lemon border-y-4 border-[var(--color-ink)] py-4 my-10 -rotate-1">
      <div className="flex w-max animate-marquee">
        {marqueeContent.map((item, index) => (
          <span 
            key={index} 
            className="font-display font-semibold text-2xl px-8 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
