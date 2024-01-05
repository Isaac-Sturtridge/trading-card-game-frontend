import { useState } from "react";
import { HandCard } from "./HandCard";
import { socket } from "../socket";

export const HandCards = ({
  handCards,
  turnEnded,
  setTurnEnded,
  selectedHandCards,
  setSelectedHandCards,
}) => {
  const handleHandCardClick = (card) => {
    setSelectedHandCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      } 
      return [...previous].filter((currentCard) => card !== currentCard );
    });
    // socket.emit("sellCardFromHand", { cards: [{ card_id: card }] });
  };
  const handleCardSwapClick = () => {
    //   socket.emit("cardSwap", {});
  };

  return (
    <>
      <div className="userCardArea">
        {handCards.map((card) => {
          return (
            <button
              className={`handCard ${card.card_type} ${selectedHandCards.includes(card) ? 'selected' : ''}`}
              disabled={!turnEnded}
              key={card.card_id}
              onClick={() => {
                handleHandCardClick(card);
              }}
            >
              {card.card_type}
            </button>
          );
        })}
        <button
          className="swapCardsbutton"
          disabled={!turnEnded || selectedHandCards.length === 0} // || selectedCards.length === 0
          onClick={() => {
            handleCardSwapClick(); // [selectedHandCards], [selectedTableCards] to swap when selected cards functionality added
          }}
        >
          Swap Cards!
        </button>
      </div>
    </>
  );
};
