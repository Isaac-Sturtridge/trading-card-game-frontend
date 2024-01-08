import { socket } from "../socket";
import { useState } from "react";

const GameStart = ({ gameOver, hasStarted, setHasStarted, connectedUsers }) => {
  const [value, setValue] = useState("test");

  let buttonMessage = gameOver ? 'Rematch!' : 'Start!'

  return (
    <div className="startGameButtonContainer">
    <button
    className="startGameButton"
    disabled={hasStarted || connectedUsers < 2}  
    onClick={() => {
        setHasStarted(true);
        socket.timeout(1000).emit("gameStart", hasStarted, () => {
        });
      }}
    >
      {buttonMessage}
    </button>
    </div>
  );
};

export default GameStart;
