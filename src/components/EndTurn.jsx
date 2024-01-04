import { socket } from "../socket";

const EndTurn = ({ turnEnded, setTurnEnded }) => {
  return (
    <button
      disabled ={!turnEnded}
      onClick={() => {
        socket.emit("endTurn", turnEnded, () => {});
      }}
    >
      End Turn!
    </button>
  );
};

export default EndTurn;
