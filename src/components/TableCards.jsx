import { useState } from "react";
import { TableCard } from "./TableCard";
import { socket } from "../socket";

export const TableCards = ({ tableCards, turnEnded, setTurnEnded, setSelectedTableCards }) => {
  const handleTableCardClick = (card) => {
    setSelectedTableCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      } 
      return [...previous].filter((currentCard) => card !== currentCard );
    });
   // socket.emit("addCardToHand", { cards: [{ card_id: card }] });
  };

  return (
    <>
    <h1 className="tableHeader">Table Cards</h1>
      <div className="tableCards">
        {tableCards.map((card) => {
          // {console.log(card)}
          return (
            <button
              className={`tableCard ${card.card_type}`}
              disabled={!turnEnded}
              key={card.card_id}
              onClick={() => {
                handleTableCardClick(card);
              }}
            >
              {card.card_type}
            </button>
          );
          //   <TableCard setHandCards={setHandCards} key={card} />;
        })}
      </div>
    </>
  );
};
