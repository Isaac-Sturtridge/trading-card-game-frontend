import { socket } from "../socket";

const EndTurn = ({ turnEnded, setTurnEnded }) => {
  return (
    <button
      className="endTurnButton"
      disabled={!turnEnded}
      onClick={() => {
        socket.emit("endTurn", turnEnded, () => {});
      }}
    >{turnEnded ? "End Turn!" : "Opponents Turn!"}
    </button>
  );
};

export default EndTurn;
