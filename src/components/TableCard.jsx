import { socket } from "../socket";

export const TableCard = () => {
  return (
    <div className="singleTableCard">
      <button
        onClick={() => {
          socket.emit("addCardToHand");
        }}
      >
        Single Table Card
      </button>
    </div>
  );
};
