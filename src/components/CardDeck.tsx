import { useState } from "react";
import SwipeableCard from "./SwipeableCard";

const INITIAL_CARDS = [
  "Stay focused and trust your swing.",
  "Take a deep breath before each shot.",
  "Visualize your perfect shot.",
  "Keep your head still through impact.",
  "Play one shot at a time.",
];

const CardDeck = () => {
  const [cards, setCards] = useState(INITIAL_CARDS);

  const handleSwipe = () => {
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className="relative w-full max-w-md mx-auto h-[250px] md:h-[300px] touch-manipulation">
      {cards.map((content, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 right-0 
                     ${index === 0 ? "z-20" : "z-10 -rotate-3"}`}
          style={{
            opacity: index === 0 ? 1 : index === 1 ? 0.7 : 0.4,
          }}
        >
          <SwipeableCard content={content} onSwipe={handleSwipe} />
        </div>
      ))}
    </div>
  );
};

export default CardDeck;