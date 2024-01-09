import { useEffect, useState } from "react";
import { socket } from "../socket";

const EndTurn = ({
  turnEnded,
  setTurnEnded,
  selectedTableCards,
  selectedHandCards,
  handCards,
}) => {
  const [action, setAction] = useState("Your turn");
  const [payload, setPayload] = useState([]);
  const [actionLookup, setActionLookup] = useState({
    addCardToHand: "Take card",
    sellCardFromHand: "Sell card",
    cardSwap: "Swap cards",
    "Invalid Move": "Invalid Move",
    "Your turn": "Your turn",
    maxCards: "Max card reached",
  });

  console.log(handCards.length);

  useEffect(() => {
    if (selectedHandCards.length === 0 && selectedTableCards.length === 0) {
      setAction("Your turn");
    } else if (
      selectedTableCards.length === 1 &&
      selectedHandCards.length === 0 &&
      handCards.length < 7
    ) {
      setAction("addCardToHand");
      setPayload({ cards: selectedTableCards });
    } else if (
      selectedHandCards.length > 0 &&
      selectedTableCards.length === 0 &&
      selectedHandCards.every(
        (card) => card.card_type === selectedHandCards[0].card_type
      )
    ) {
      setAction("sellCardFromHand");
      setPayload({ cards: selectedHandCards });
    } else if (selectedHandCards.length === selectedTableCards.length) {
      setAction("cardSwap");
      setPayload({
        handCards: selectedHandCards,
        tableCards: selectedTableCards,
      });
    } else if (handCards.length >= 7) {
      setAction("maxCards");
    } else {
      setAction("Invalid Move");
    }
  }, [selectedHandCards, selectedTableCards]);

  const handleClick = () => {
    socket.emit(action, payload);
    socket.emit("endTurn", turnEnded, () => {});
  };

  return (
    <button
      className={`endTurnButton ${action}`}
      disabled={
        !turnEnded ||
        action === "Invalid Move" ||
        action === "Your turn" ||
        action === "maxCards"
      }
      onClick={handleClick}
    >
      {turnEnded ? `${actionLookup[action]}` : "Opponents Turn!"}
    </button>
  );
};

export default EndTurn;
