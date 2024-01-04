import { socket } from "../socket";

const EndTurn = ({ turnEnded, setTurnEnded }) => {
  return (
    <button
      onClick={() => {
        setTurnEnded(true);
        socket.emit("endTurn", turnEnded, () => {});
      }}
    >
      End Turn!
    </button>
  );
};

export default EndTurn;
