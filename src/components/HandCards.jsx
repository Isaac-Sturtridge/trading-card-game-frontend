import { useState } from "react";
import { HandCard } from "./HandCard";
import { socket } from "../socket";
import {useSpring, animated} from "@react-spring/web";


export const HandCards = ({
  handCards,
  turnEnded,
  setTurnEnded,
  selectedHandCards,
  setSelectedHandCards,
}) => {
  const [springs, api] = useSpring(() => ({
    from: {x: 0, y: 0},
    to: {x: 100, y:100}
  }))


  const handleHandCardClick = (card) => {
    setSelectedHandCards((previous) => {
      if (!previous.includes(card)) {
        return [...previous, card];
      } 
      return [...previous].filter((currentCard) => card !== currentCard );
    });
    // socket.emit("sellCardFromHand", { cards: [{ card_id: card }] });
  };
  const handleCardSwapClick = () => {
    //   socket.emit("cardSwap", {});
  };

  return (
    <>
      <div className="userCardArea">
        {handCards.map((card) => {
          return (
            <button
              className={`handCard ${card.card_type} ${selectedHandCards.includes(card) ? 'selected' : ''}`}
              disabled={!turnEnded}
              key={card.card_id}
              onClick={() => {
                handleHandCardClick(card);
                api.start({
                  from: {x: 0},
                  to: {x: 500}
                })
              }}
            >
              {card.card_type}
            </button>
          );
        })}
        <animated.div style={{
        width: 80,
        height: 80,
        background: '#ff6d6d',
        borderRadius: 8,
        ...springs
      }}>
        </animated.div>
      </div>
    </>
  );
};
