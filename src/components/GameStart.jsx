import { socket } from "../socket";
import { useState } from "react";

const GameStart = ({ hasStarted, setHasStarted }) => {
    const [value, setValue] = useState('test')


  return (
    <button
      onClick={() => {
        setHasStarted(true);
        socket.timeout(1000).emit('sending-message', hasStarted, () => {
            console.log(hasStarted)
        })
      }}
    >
      Start!
    </button>
  );
};

export default GameStart;
