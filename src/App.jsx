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
import OpponentConnectionMessage from "./components/OpponentConnectionMessage";
import ConnectionMessage from "./components/ConnectionMessage";
import DisconnectMessage from "./components/disconnectMessage";
import { generateUsername } from "unique-username-generator";
import MessagingArea from "./components/MessagingArea";
import { useSpring, animated } from "@react-spring/web";
import { TokensContainer } from "./components/TokensContainer";

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasSetup, setHasSetup] = useState(false);
  const [handCards, setHandCards] = useState([]);
  const [tableCards, setTableCards] = useState([]);
  const [score, setScore] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [turnEnded, setTurnEnded] = useState(true);
  const [whoIsPlaying, setWhoIsPlaying] = useState("player1");
  const [connectedUsers, setConnectedUsers] = useState(0);
  const [opponentConnection, setOpponentConnection] = useState(false);
  const [onConnectionMsg, setOnConnectionMsg] = useState(false);
  const [userDisconnected, setUserDisconnected] = useState(false);
  const [usernames, setUsernames] = useState({});
  const [selectedHandCards, setSelectedHandCards] = useState([]);
  const [selectedTableCards, setSelectedTableCards] = useState([]);
  const [startMessage, setStartMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [tokens, setTokens] = useState({});
  const [onStartButton, setOnStartButton] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    if (onStartButton) {
      socket.connect();
      console.log(roomName, displayName, "details");
      socket.auth = {
        username: displayName,
        room: roomName,
      };
      const sessionID = sessionStorage.getItem("sessionID");
      if (sessionID) {
        socket.auth = { sessionID };
      }
      setOnStartButton(false);
    }
  }, [onStartButton]);

  useEffect(() => {
    const onDisconnect = () => {
      setIsConnected(false);
    };

    const onConnect = (data) => {
      setIsConnected(true);
      setOnConnectionMsg(true);
      setTimeout(() => {
        setOnConnectionMsg(false);
      }, 2000);
      console.log("user Connected");
    };

    const onGameSetup = (res) => {
      setTurnEnded(res.playerTurn);
      setHasSetup(true);
      setHasStarted(true);
      setStartMessage(true);
      setTokens(res.tokenValues);
      setTimeout(() => {
        setStartMessage(false);
      }, 3000);
      setHandCards(res.playerHand);
      setTableCards(res.cardsOnTable);
    };

    const playerHandUpdate = ({ playerHand }) => {
      setHandCards(playerHand);
    };

    const onCardSell = (cardSoldId) => {
      setHandCards((previous) => {
        return [...previous].filter((card) => card.id !== cardSoldId);
      });
    };

    const onResourceUpdate = ({ playerScores }) => {
      // console.log(playerScores);
      // const results = Object.values(playerScores);
      setScore(playerScores);
    };

    const onGameOver = ({ playerScores, msg }) => {
      setGameOver(true);
      setHasStarted(false);
      console.log(msg);
    };

    const onTurnChange = (playersTurn) => {
      setSelectedHandCards([]);
      setSelectedTableCards([]);
      setWhoIsPlaying(playersTurn);
      setTurnEnded(playersTurn);
      // console.log(player, "<<< Player console")
    };

    const activeUsers = (data) => {
      setUsernames(data);
      setConnectedUsers(data.length);
    };

    const tableUpdate = ({ cardsOnTable }) => {
      setTableCards(cardsOnTable);
    };

    const connectionMessage = (data) => {
      setOpponentConnection(true);
      setTimeout(() => {
        setOpponentConnection(false);
      }, 2000);
    };

    const onUserDisconnected = () => {
      setUserDisconnected(true);
      setTimeout(() => {
        setUserDisconnected(false);
      }, 3000);
    };

    const onMessageUpdate = ({ msg }) => {
      setMessages((previous) => {
        return [...previous, msg];
      });
    };

    const sessionManagement = ({ sessionID, userID }) => {
      // attach the session ID to the next reconnection attempts
      socket.auth = { sessionID };
      // store it in the localStorage
      sessionStorage.setItem("sessionID", sessionID);
      // save the ID of the user
      socket.userID = userID;
    };

    const tokenValues = ({ tokenValues }) => {
      console.log(tokenValues);
      setTokens(tokenValues);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("gameSetup", onGameSetup); // to connect with setup-game emitter from the server
    socket.on("playerHandUpdate", playerHandUpdate);
    socket.on("cardSold", onCardSell);
    socket.on("scoreUpdate", onResourceUpdate);
    socket.on("gameOver", onGameOver);
    socket.on("playerTurn", onTurnChange);
    // socket.on("user connected", connectedUsers);
    socket.on("users", activeUsers);
    socket.on("tableUpdate", tableUpdate);
    socket.on("session", sessionManagement);
    socket.on("user disconnected", onUserDisconnected);
    socket.on("user connected", connectionMessage);
    socket.on("tokenValuesUpdate", tokenValues);
    socket.on("gamePlayUpdates", onMessageUpdate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const springs = useSpring({
    from: { x: 0, y: 0 },
    to: { x: 100, y: 100 },
  });

  // console.log(isConnected);
  // console.log(socket);
  // console.log(hasStarted);
  // console.log(turnEnded, "turnEnd Console.log");
  // console.log(selectedHandCards);

  return (
    <>
      <Header isConnected={isConnected} roomName={roomName} score={score} usernames={usernames} />
      {userDisconnected && <DisconnectMessage />}
      {opponentConnection && <OpponentConnectionMessage />}
      {onConnectionMsg && <ConnectionMessage />}
      {!hasStarted ? (
        <GameStart
          setDisplayName={setDisplayName}
          setRoomName={setRoomName}
          displayName={displayName}
          roomName={roomName}
          setOnStartButton={setOnStartButton}
          hasStarted={hasStarted}
          setHasStarted={setHasStarted}
          connectedUsers={connectedUsers}
        />
      ) : null}
      {startMessage ? (
        <h1 className="gameStartedHeader">Game Started!</h1>
      ) : null}
      {hasSetup ? (
        <>
          <div className="gameTable">
            <MessagingArea messages={messages} />
            <div className="cardsContainers">
              <TableCards
                className="tableCardContainer"
                tableCards={tableCards}
                turnEnded={turnEnded}
                setTurnEnded={setTurnEnded}
                selectedTableCards={selectedTableCards}
                setSelectedTableCards={setSelectedTableCards}
              />
              <HandCards
                className="handCardContainer"
                handCards={handCards}
                turnEnded={turnEnded}
                setTurnEnded={setTurnEnded}
                selectedHandCards={selectedHandCards}
                setSelectedHandCards={setSelectedHandCards}
              />
            </div>
            <div className="endTurnButtonContainer">
              <EndTurn
                turnEnded={turnEnded}
                setTurnEnded={setTurnEnded}
                selectedHandCards={selectedHandCards}
                selectedTableCards={selectedTableCards}
                handCards={handCards}
                tableCards={tableCards}
              />
            </div>
            <div className="tokensContainer">
              <TokensContainer tokens={tokens} />
              {console.log(tokens)}
            </div>
          </div>
          {/* <CardPile /> */}
        </>
      ) : null}
      {gameOver ? <GameOver /> : null}
    </>
  );
}

export default App;
