import { useState } from "react";
import { TableCard } from "./TableCard";
import { socket } from "../socket";

export const TableCards = ({ tableCards, turnEnded, setTurnEnded }) => {
  const handleTableCardClick = (card) => {
    console.log(card, "<--- card Clicked");
    socket.emit("addCardToHand", { cards: [{ card_id: card }] });
  };

  return (
    <>
      <div className="tableCards">
        <h1>Table Cards</h1>
        {tableCards.map((card) => {
          // {console.log(card)}
          return (
            <button
              disabled={!turnEnded}
              key={card.card_id}
              onClick={() => {
                handleTableCardClick(card.card_id);
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
