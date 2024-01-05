import { useState } from "react";
import { socket } from "../socket";

const EndTurn = ({ turnEnded, setTurnEnded, selectedTableCards, selectedHandCards }) => {
  const [action, setAction] = useState('')

  if(selectedTableCards.length === 1 && selectedHandCards.length === 0) {
    setAction('addCardToHand')
  } else if(selectedHandCards.length > 0 && selectedTableCards.length === 0) {
    setAction('sellCardFromHand')
  } else if(selectedHandCards.length === selectedTableCards.length && selectedHandCards.length > 0 && selectedTableCards.length > 0) {
    setAction('cardSwap')
  } else {
    setAction('')
  }

  const handleClick = () => {
    socket.emit(action, )
    socket.emit("endTurn", turnEnded, () => {});

  }

  return (
    <button
      className="endTurnButton"
      disabled={!turnEnded}
      onClick={handleClick}
    >{turnEnded ? "End Turn!" : "Opponents Turn!"}
    </button>
  );
};

export default EndTurn;
