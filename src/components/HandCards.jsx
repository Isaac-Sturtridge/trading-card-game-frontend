import { useState } from "react";
import { HandCard } from "./HandCard";
import { socket } from "../socket";

export const HandCards = ({
  handCards,
  turnEnded,
  setTurnEnded,
  setSelectedHandCards,
}) => {
  const handleHandCardClick = (card) => {
    setSelectedHandCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      } else {
        return [...previous];
      }
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
              className={`handCard ${card.card_type}`}
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
          disabled={!turnEnded} // || selectedCards.length === 0
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
