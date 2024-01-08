import { useEffect } from "react";
import { socket } from "../socket";
import { useSpring, animated, useTransition } from "@react-spring/web";

export const HandCard = ({
  card,
  handCards,
  selectedHandCards,
  turnEnded,
  setSelectedHandCards,
}) => {
  const mountedSpring = useSpring({
    from: {x: -2000, y:0},
    to: {x:0, y:0},
    delay: (handCards.length - handCards.indexOf(card) + 1) * 500,
    config: {
      mass: 5,
      tension: 280,
      friction: 100,
    }
  })
  const [springs, api] = useSpring(() => ({
    from: { x: 0, y: 0 }
  // }));
  // const [transition, transApi] = useTransition(() => ({
  //   from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
  // //   enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
  //   leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
  }))

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
        ...springs
      }}
    >
      <animated.div
      style={{
        ...mountedSpring
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
    </animated.div>
  )
};
