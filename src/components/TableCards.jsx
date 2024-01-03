import { useState } from "react";
import { TableCard } from "./TableCard";
import { socket } from "../socket";

export const TableCards = ({ tableCards }) => {
  const handleTableCardClick = (card) => {
    console.log(card, "<--- card Clicked");
    socket.emit("addCardToHand", { cards: [{ card_type: card }] });
  };

  return (
    <>
      <div className="tableCards">
        <h1>Table Cards</h1>
        {tableCards.map((card) => {
          // {console.log(card)}
          return (
            <button
              key={card.card_id}
              onClick={() => {
                handleTableCardClick(card.card_type);
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
