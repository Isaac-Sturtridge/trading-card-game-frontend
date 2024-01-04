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
        <h1>Hand cards</h1>
        {handCards.map((card) => {
          return (
            <button
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
