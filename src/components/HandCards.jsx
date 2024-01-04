import { useState } from "react";
import { HandCard } from "./HandCard";

export const HandCards = ({ handCards, turnEnded, setTurnEnded }) => {
    const handleHandCardClick = (card) => {
        socket.emit()
    }

  return (
    <>
      <div className="userCardArea">
        {handCards.map((card) => {
          return <button className={`handCard ${card.card_type}`} disabled={!turnEnded} key={card.card_id} onClick={() => {
            handleHandCardClick(card.card_id)
          }}>{card.card_type}</button>
        })}
      </div>
    </>
  );
};
