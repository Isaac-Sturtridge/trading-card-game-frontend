import { socket } from "../socket";
import { useSpring, animated } from "@react-spring/web";

export const TableCard = ({
  card,
  tableCards,
  turnEnded,
  setTurnEnded,
  selectedTableCards,
  setSelectedTableCards,
}) => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 },
  }));
  const handleTableCardClick = (card) => {
    setSelectedTableCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      }
      return [...previous].filter((currentCard) => card !== currentCard);
    });
    // socket.emit("addCardToHand", { cards: [{ card_id: card }] });
  };

  return (
    <animated.div
      className="singleTableCard"
      key={card.card_id}
      style={{
        ...springs,
      }}
    >
      <button
        className={`tableCard ${card.card_type} ${
          selectedTableCards.includes(card) ? "selected" : ""
        }`}
        disabled={!turnEnded}
        key={card.card_id}
        onClick={() => {
          handleTableCardClick(card);
          if (!selectedTableCards.includes(card)) {
            api.start({
              from: {scale: 1.0},
              to: {scale: 1.1}
            })
          } else {
            api.start({
              from:{scale: 1.1},
              to: {scale: 1.0}
            })
          }

        }}
      >
        {card.card_type}
      </button>
    </animated.div>
  );
};
