import { useEffect, useState } from "react";
import { socket } from "../socket";

const EndTurn = ({ turnEnded, setTurnEnded, selectedTableCards, selectedHandCards }) => {
  const [action, setAction] = useState('Your turn')
  const [payload, setPayload] = useState([])
  const [actionLookup, setActionLookup] = useState({
    'addCardToHand': 'Add card to hand',
    'sellCardFromHand': 'Sell card',
    'cardSwap': 'Swap cards',
    'Invalid Move': 'Invalid Move',
    'Your turn': 'Your turn'
  })

  useEffect(() => {
    if(selectedHandCards.length === 0 && selectedTableCards.length === 0) {
      setAction('Your turn')
    } else if(selectedTableCards.length === 1 && selectedHandCards.length === 0) {
      setAction('addCardToHand')
      setPayload({cards: selectedTableCards})
    } else if(selectedHandCards.length > 0 && selectedTableCards.length === 0 && selectedHandCards.every((card) => card.card_type === selectedHandCards[0].card_type)) {
      setAction('sellCardFromHand')
      setPayload({cards: selectedHandCards})
    } else if(selectedHandCards.length === selectedTableCards.length) {
      setAction('cardSwap')
      setPayload({handCards: selectedHandCards, tableCards: selectedTableCards})
    } else {
      setAction('Invalid Move')
    }
  }, [selectedHandCards, selectedTableCards])

  const handleClick = () => {
    socket.emit(action, payload)
    socket.emit("endTurn", turnEnded, () => {});

  }

  return (
    <button
      className="endTurnButton"
      disabled={!turnEnded}
      onClick={handleClick}
    >{turnEnded ? `${actionLookup[action]}`: "Opponents Turn!"}
    </button>
  );
};

export default EndTurn;
