import { useState, useEffect } from "react";
import { socket } from "../socket";
const rand = Math.random().toString(16).substr(2, 8); // 6de5ccda

const GameStart = ({
  hasStarted,
  setHasStarted,
  connectedUsers,
  setOnStartButton,
  displayName,
  setDisplayName,
  roomName,
  setRoomName,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    setRoomName(rand);
  }, []);

  const handleStartGame = () => {
    setOnStartButton(true);
    setIsModalOpen(false);
  };

  return (
    <div className="startGameButtonContainer">
      {isModalOpen && (
        <div className="modalStart">
          <div className="createRoom">
            <h2 className="startGameHeader">Create Room</h2>
            <label className="displayName">Display Name</label>
            <input
              className="modalStartInputs"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label className="roomName">Room Name</label>
            <input
              className="modalStartInputs"
              type="text"
              disabled
              value={rand}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="startGameButton" onClick={handleStartGame}>
              Create Game
            </button>
          </div>
          <div className="pip-line"></div>
          <div className="joinRoom">
            <h2 className="startGameHeader">Join Room</h2>
            <label className="displayName">Display Name</label>
            <input
              className="modalStartInputs"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
            <label className="roomName">Room Name</label>
            <input
              className="modalStartInputs"
              type="text"
              onChange={(e) => setRoomName(e.target.value)}
            />
            <button className="startGameButton" onClick={handleStartGame}>
              Join Game
            </button>
          </div>
        </div>
      )}
      {!isModalOpen && (
        <div>
          <button
            className="startGameButton"
            disabled={hasStarted || connectedUsers < 2}
            onClick={() => {
              setHasStarted(true);
              socket.timeout(1000).emit("gameStart", hasStarted, () => {});
            }}
          >
            Start Game!
          </button>
        </div>
      )}
    </div>
  );
};

export default GameStart;
