import { useState } from "react";
import { HandCard } from "./HandCard";

export const HandCards = ({ handCards, turnEnded, setTurnEnded }) => {
    const handleHandCardClick = (card) => {
        socket.emit()
    }

  return (
    <>
      <div className="userCardArea">
        <h1>Hand cards</h1>
        {handCards.map((card) => {
          return <button disabled={!turnEnded} key={card.card_id} onClick={() => {
            handleHandCardClick(card.card_type)
          }}>{card.card_type}</button>
        })}
      </div>
    </>
  );
};
