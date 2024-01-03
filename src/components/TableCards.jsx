import { useState } from "react";
import { TableCard } from "./TableCard";

export const TableCards = ({ tableCards }) => {
  return (
    <>
      <div className="tableCards">
        <h1>Table Cards</h1>
        {tableCards.map((card) => {
            {console.log(card)}
            return <h2 key={card.card_id}>{card.card_type}</h2>
        //   <TableCard setHandCards={setHandCards} key={card} />;
        })}
      </div>
    </>
  );
};
