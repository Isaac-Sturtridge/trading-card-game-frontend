import { useState } from "react";
import { HandCard } from "./HandCard";

export const HandCards = ({ handCards }) => {
  return (
    <>
      <div className="userCardArea">
        <h1>Hand cards</h1>
        {handCards.map((card) => {
          return <h2 key={card.card_id}>{card.card_type}</h2>
        })}
      </div>
    </>
  );
};
