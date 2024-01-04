import { socket } from "./socket";
import { useState, useEffect } from "react";
import GameStart from "./components/GameStart";
import { HandCards } from "./components/HandCards";
import { TableCards } from "./components/TableCards";
import { CardPile } from "./components/CardPile";
import Header from "./components/Header";
import GameOver from "./components/GameOver";
import EndTurn from "./components/EndTurn";
import Instructions from "./components/Instructions";

socket.auth = {username: "player1"}
const sessionID = sessionStorage.getItem("sessionID");
if (sessionID) {
  socket.auth = { sessionID };
}

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSetup, setHasSetup] = useState(false);
  const [handCards, setHandCards] = useState([]);
  const [tableCards, setTableCards] = useState([])
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [turnEnded, setTurnEnded] = useState(true);
  const [whoIsPlaying, setWhoIsPlaying] = useState("player1");
  const [instructions, setInstructions] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState(0);

  useEffect(() => {
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onConnect = () => {
      setIsConnected(true);
      console.log(socket.id);
    };

    const onGameSetup = (res) => {
      console.log(res)
      setTurnEnded(res.playerTurn)
      setHasSetup(true);
      setHasStarted(true)
      setHandCards(res.playerHand)
      setTableCards(res.cardsOnTable)
    };

    const playerHandUpdate = ({playerHand}) => {
      console.log(playerHand, "<---- player hand obj")
      setHandCards(playerHand)
    };

    const onCardSell = (cardSoldId) => {
      setHandCards((previous) => {
        return [...previous].filter((card) => card.id !== cardSoldId);
      });
    };

    const onResourceUpdate = (resources) => {
      setScore(resources);
    };

    const onGameOver = () => {
      setGameOver(true);
      setHasStarted(false);
    };

    const onTurnChange = (playersTurn) => {
      setWhoIsPlaying(playersTurn);
      setTurnEnded(playersTurn)
      // console.log(player, "<<< Player console")
    };

    const activeUsers = (data) => {
      console.log(data)
      setConnectedUsers(data.length)
    }

    const tableUpdate = ({cardsOnTable}) => {
      console.log(cardsOnTable, "<----- cards on table")
      setTableCards(cardsOnTable)
    }

    const sessionManagement = ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      sessionStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("gameSetup", onGameSetup); // to connect with setup-game emitter from the server
    socket.on("playerHandUpdate", playerHandUpdate);
    socket.on("cardSold", onCardSell);
    socket.on("resourcesUpdated", onResourceUpdate);
    socket.on("gameOver", onGameOver);
    socket.on("playerTurn", onTurnChange);
    // socket.on("user connected", connectedUsers);
    socket.on("users", activeUsers)
    socket.on("tableUpdate", tableUpdate)
    socket.on("session", sessionManagement);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  // console.log(isConnected);
  // console.log(socket);
  // console.log(hasStarted);
  // console.log(turnEnded, "turnEnd Console.log");

  return (
    <>
      <h1>Card Game</h1>
      <Header score={score} setInstructions={setInstructions} />
      {instructions ? <Instructions /> : null}
      <GameStart hasStarted={hasStarted} setHasStarted={setHasStarted} connectedUsers={connectedUsers} />
      <h2>It is {turnEnded ? "your" : "opponents"} turn!</h2>
      {hasStarted ? <h1>Game Started!</h1> : null}
      {hasSetup ? (
        <>
          <div className="gameTable">
            <HandCards handCards={handCards} turnEnded={turnEnded} setTurnEnded={setTurnEnded}/>
            <TableCards tableCards={tableCards} turnEnded={turnEnded} setTurnEnded={setTurnEnded}/>
            <CardPile />
            {turnEnded && <EndTurn turnEnded={turnEnded} setTurnEnded={setTurnEnded} />}
          </div>
        </>
      ) : null}
      {gameOver ? <GameOver /> : null}
    </>
  );
}

export default App;
