import { useState } from "react";
import { HandCard } from "./HandCard";
import { socket } from "../socket";

export const HandCards = ({ handCards, turnEnded, setTurnEnded }) => {
  const handleHandCardClick = (card) => {
    console.log(card);
    socket.emit("sellCardFromHand", { cards: [{ card_id: card }] });
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
                handleHandCardClick(card.card_id);
              }}
            >
              {card.card_type}
            </button>
          );
        })}
      </div>
    </>
  );
};
