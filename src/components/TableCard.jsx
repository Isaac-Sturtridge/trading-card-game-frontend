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
  const mountedSpring = useSpring({
    from: {x: -2000, y:0},
    to: {x:0, y:0},
    delay: (tableCards.length - tableCards.indexOf(card) + 1) * 500,
    config: {
      mass: 5,
      tension: 280,
      friction: 100,
    }
  })
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
      <animated.div
      style={{
        ...mountedSpring,
      }}>
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
              to: {scale: 1.07}
            })
          } else {
            api.start({
              from:{scale: 1.07},
              to: {scale: 1.0}
            })
          }

        }}
      >
      </button>
      </animated.div>
    </animated.div>
  );
};
