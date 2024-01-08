import { socket } from "../socket";
import { useSpring, animated } from "@react-spring/web";

export const HandCard = ({
  card,
  handCards,
  selectedHandCards,
  turnEnded,
  setSelectedHandCards,
}) => {
  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 },
  }));

  const handleHandCardClick = (card) => {
    setSelectedHandCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      }
      return [...previous].filter((currentCard) => card !== currentCard);
    });
    // socket.emit("sellCardFromHand", { cards: [{ card_id: card }] });
  };

  return (
    <animated.div
      key={card.card_id}
      style={{
        ...springs,
      }}
    >
      <button
        className={`handCard ${card.card_type} ${
          selectedHandCards.includes(card) ? "selected" : ""
        }`}

        disabled={!turnEnded}
        onClick={() => {
          handleHandCardClick(card);
          if (!selectedHandCards.includes(card)) {
            api.start({
              from: { y: 0 },
              to: { y: -50, scale: 1.05 },
            });
          } else {
            api.start({
              from: { y: -50 },
              to: { y: 0, scale: 1.0 },
            });
          }
        }}
      >
        {card.card_type}
      </button>
    </animated.div>
  );
};
