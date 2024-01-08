import { HandCard } from "./HandCard";

export const HandCards = ({
  handCards,
  turnEnded,
  setTurnEnded,
  selectedHandCards,
  setSelectedHandCards,
}) => {
  return (
    <>
      <div className="userCardArea">
        {handCards.map((card) => {
          return (
            <HandCard
              key={card.card_id}
              card={card}
              handCards={handCards}
              turnEnded={turnEnded}
              setTurnEnded={setTurnEnded}
              selectedHandCards={selectedHandCards}
              setSelectedHandCards={setSelectedHandCards}
            />
          );
        })}
      </div>
    </>
  );
};
