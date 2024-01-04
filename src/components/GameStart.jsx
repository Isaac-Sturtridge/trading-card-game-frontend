import { socket } from "../socket";
import { useState } from "react";

const GameStart = ({ hasStarted, setHasStarted, connectedUsers }) => {
  const [value, setValue] = useState("test");

  return (
    <button
    disabled={hasStarted || connectedUsers < 2}  
    onClick={() => {
        setHasStarted(true);
        socket.timeout(1000).emit("gameStart", hasStarted, () => {
          console.log(hasStarted);
        });
      }}
    >
      Start!
    </button>
  );
};

export default GameStart;
