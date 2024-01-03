import { socket } from "../socket";

export const HandCard = () => {
  return (
    <div className="singleCard">
      <button
        onClick={() => {
          socket.emit("sellCardFromHand");
        }}
      >single card</button>
    </div>
  );
};
