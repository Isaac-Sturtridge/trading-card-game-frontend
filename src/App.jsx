import { socket } from "./socket";
import { useState, useEffect } from "react";
import GameStart from "./components/GameStart";
import { HandCards } from "./components/HandCards";
import { TableCards } from "./components/TableCards";
import { CardPile } from "./components/CardPile";
import Header from "./components/Header";
import GameOver from "./components/GameOver";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSetup, setHasSetup] = useState(false);
  const [handCards, setHandCards] = useState([])
  const [score, setScore] = useState({player1:0, player2:0})
  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onConnect = () => {
      setIsConnected(true);
      console.log(socket.id);
    };

    const onGameSetup = () => {
      setHasSetup(true);
    };

    const onCardAdd = (drawnCard)=>{
      setHandCards((previous)=>{
        return [...previous, drawnCard]
      })
    }

    const onCardSell = (cardSoldId)=>{
      setHandCards((previous)=>{
        return [...previous].filter((card)=>card.id !== cardSoldId)
      })
    }

    const onResourceUpdate = (resources)=>{
      setScore(resources)
    }

    const onGameOver = ()=>{
      setGameOver(true)
      setHasStarted(false)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("game-setup", onGameSetup); // to connect with setup-game emitter from the server
    socket.on("cardAdded", onCardAdd);
    socket.on("cardSold", onCardSell) 
    socket.on("resourcesUpdated", onResourceUpdate)
    socket.on("gameOver", onGameOver)

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  console.log(isConnected);
  console.log(socket);
  console.log(hasStarted);

  return (
    <>
      <h1>Card Game</h1>
      <Header score = {score}/>
      <GameStart hasStarted={hasStarted} setHasStarted={setHasStarted} />
      {hasStarted ? <h1>Game Started!</h1> : null}
      {hasSetup ? (
        <>
          <HandCards handCards={handCards}/>
          <TableCards />
          <CardPile />
        </>
      ) : null}
      {gameOver ? <GameOver/> : null}
    </>
  );
}

export default App;
