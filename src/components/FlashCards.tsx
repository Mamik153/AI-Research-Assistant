import React, { useState } from 'react';
import { FlashCard } from '../types';

interface FlashCardsProps {
  cards: FlashCard[] | null;
}

const FlashCards: React.FC<FlashCardsProps> = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  if (!cards || cards.length === 0) {
    return <div className="text-center text-gray-400 italic py-10">Generate research to see flash cards.</div>;
  }

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  const currentCard = cards[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div 
        className="relative w-full max-w-md h-80 perspective-1000 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full duration-500 transform-style-3d transition-all ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* Front */}
          <div className="absolute w-full h-full bg-gradient-to-br from-pastel-teal to-pastel-blue rounded-3xl shadow-xl flex items-center justify-center p-8 backface-hidden border-4 border-white">
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-widest text-teal-700 font-bold mb-4">Question</h3>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">{currentCard.front}</p>
            </div>
          </div>

          {/* Back */}
          <div className="absolute w-full h-full bg-gradient-to-br from-pastel-rose to-pastel-pink rounded-3xl shadow-xl flex items-center justify-center p-8 backface-hidden rotate-y-180 border-4 border-white">
            <div className="text-center">
              <h3 className="text-sm uppercase tracking-widest text-rose-700 font-bold mb-4">Answer</h3>
              <p className="text-xl text-slate-800 font-medium leading-relaxed">{currentCard.back}</p>
            </div>
          </div>

        </div>
      </div>

      <div className="flex gap-6 mt-8">
        <button 
          onClick={handlePrev}
          className="px-6 py-2 rounded-full bg-white text-slate-600 shadow-md hover:bg-slate-50 transition font-medium"
        >
          Previous
        </button>
        <span className="flex items-center text-slate-400 font-mono">
          {currentIndex + 1} / {cards.length}
        </span>
        <button 
          onClick={handleNext}
          className="px-6 py-2 rounded-full bg-white text-slate-600 shadow-md hover:bg-slate-50 transition font-medium"
        >
          Next
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-400">Click card to flip</p>

      {/* Tailwind Utility for 3D flip since not default in all configs */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashCards;
