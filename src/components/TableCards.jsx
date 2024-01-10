import { TableCard } from "./TableCard";

export const TableCards = ({
  tableCards,
  turnEnded,
  setTurnEnded,
  selectedTableCards,
  setSelectedTableCards,
}) => {
  return (
    <>

      <div className="tableCards">
        {tableCards.map((card) => {
          return (
            <TableCard
              key={card.card_id}
              card={card}
              tableCards={tableCards}
              turnEnded={turnEnded}
              setTurnEnded={setTurnEnded}
              selectedTableCards={selectedTableCards}
              setSelectedTableCards={setSelectedTableCards}
            />
          );
        })}
      </div>
    </>
  );
};
