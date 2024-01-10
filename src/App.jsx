import { socket } from './socket';
import { useState, useEffect } from 'react';
import GameStart from './components/GameStart';
import { HandCards } from './components/HandCards';
import { TableCards } from './components/TableCards';
import { CardPile } from './components/CardPile';
import Header from './components/Header';
import GameOver from './components/GameOver';
import EndTurn from './components/EndTurn';
import Instructions from './components/Instructions';
import OpponentConnectionMessage from './components/OpponentConnectionMessage';
import ConnectionMessage from './components/ConnectionMessage';
import DisconnectMessage from './components/disconnectMessage';
import { generateUsername } from 'unique-username-generator';
import MessagingArea from './components/MessagingArea';
import { useSpring, animated } from '@react-spring/web';
import { TokensContainer } from './components/TokensContainer';
import CardsInDeck from './components/CardsInDeck';
import OpponentCards from './components/OpponentCards';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [hasStarted, setHasStarted] = useState(false);
	const [hasSetup, setHasSetup] = useState(false);
	const [handCards, setHandCards] = useState([]);
	const [tableCards, setTableCards] = useState([]);
	const [score, setScore] = useState({});
	const [gameOver, setGameOver] = useState(false);
	const [turnEnded, setTurnEnded] = useState(true);
	const [whoIsPlaying, setWhoIsPlaying] = useState('player1');
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
	const [cardsInDeckDisplay, setCardsInDeckDisplay] = useState(29);
	const [opponentHand, setOpponentHand] = useState(5);
	const [onStartButton, setOnStartButton] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const [roomName, setRoomName] = useState('');

	useEffect(() => {
		const sessionID = sessionStorage.getItem('sessionID');
		if (sessionID) {
			socket.auth = { sessionID };
			socket.connect();
		}
	}, []);

	useEffect(() => {
		if (onStartButton) {
			console.log(roomName, displayName, 'details');
			socket.auth = {
				username: displayName,
				room: roomName,
			};

			socket.connect();
			setOnStartButton(false);
		}
	}, [onStartButton]);

	useEffect(() => {
		const onDisconnect = () => {
			setIsConnected(false);
		};

		const onConnect = (data) => {
			setIsConnected(true);
			toast('You have connected... waiting for opponent!');
			console.log('user Connected');
		};

		const onGameSetup = (res) => {
			setTurnEnded(res.playerTurn);
			setHasSetup(true);
			setHasStarted(true);
			setTokens(res.tokenValues);
			setHandCards(res.playerHand);
			setTableCards(res.cardsOnTable);
			toast('Game Started! Goodluck!!');
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
			if (data.length === 2) {
				toast('Opponent has connected!');
			}
		};

		const tableUpdate = ({ cardsOnTable }) => {
			setTableCards(cardsOnTable);
		};

		const connectionMessage = (data) => {};

		const onUserDisconnected = () => {
			toast.warning('Opponent has disconnected!');
		};

		const onMessageUpdate = ({ msg }) => {
			toast(msg);
			setMessages((previous) => {
				return [...previous, msg];
			});
		};

		const OnCardsInDeck = ({ cardsInDeck }) => {
			setCardsInDeckDisplay(cardsInDeck);
		};

		const onOpponentHand = ({ opponentHandUpdate }) => {
			setOpponentHand(opponentHandUpdate);
		};

		const sessionManagement = ({ sessionID, userID }) => {
			// attach the session ID to the next reconnection attempts
			socket.auth = { sessionID };
			// store it in the localStorage
			sessionStorage.setItem('sessionID', sessionID);
			// save the ID of the user
			socket.userID = userID;
		};

		const tokenValues = ({ tokenValues }) => {
			console.log(tokenValues);
			setTokens(tokenValues);
		};

		const gameResume = ({
			playerTurn,
			tokenValues,
			playerHand,
			cardsOnTable,
			playerScores,
			cardsInDeck,
			room,
			users,
		}) => {
			setTurnEnded(playerTurn);
			setHasSetup(true);
			setHasStarted(true);
			setTokens(tokenValues);
			setHandCards(playerHand);
			setTableCards(cardsOnTable);
			setScore(playerScores);
			setCardsInDeckDisplay(cardsInDeck);
			setRoomName(room);
			setUsernames(users);
			toast('Game resumed.');
		};

		socket.on('connect', onConnect);
		socket.on('disconnect', onDisconnect);
		socket.on('gameSetup', onGameSetup); // to connect with setup-game emitter from the server
		socket.on('playerHandUpdate', playerHandUpdate);
		socket.on('cardSold', onCardSell);
		socket.on('scoreUpdate', onResourceUpdate);
		socket.on('gameOver', onGameOver);
		socket.on('playerTurn', onTurnChange);
		// socket.on("user connected", connectedUsers);
		socket.on('users', activeUsers);
		socket.on('tableUpdate', tableUpdate);
		socket.on('session', sessionManagement);
		socket.on('user disconnected', onUserDisconnected);
		socket.on('user connected', connectionMessage);
		socket.on('tokenValuesUpdate', tokenValues);
		socket.on('gamePlayUpdates', onMessageUpdate);
		socket.on('cardsInDeckUpdate', OnCardsInDeck);
		socket.on('opponentHandUpdate', onOpponentHand);
		socket.on('resume', gameResume);

		return () => {
			socket.off('connect', onConnect);
			socket.off('disconnect', onDisconnect);
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
		<div className="app">
			<Header
				isConnected={isConnected}
				roomName={roomName}
				score={score}
				usernames={usernames}
			/>
			{/* {userDisconnected && <DisconnectMessage />} */}
			{/* {opponentConnection && <OpponentConnectionMessage />} */}
			{/* {onConnectionMsg && <ConnectionMessage />} */}
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
				<div className="gameplayArea">
					{/* <MessagingArea messages={messages} /> */}
					<div className="gameTable">
						<div className="side-bar">
							<CardsInDeck
								cardsInDeckDisplay={cardsInDeckDisplay}
							/>
						</div>
						<div className="cardsContainers">
							<OpponentCards opponentHand={opponentHand} />
							<TableCards
								className="tableCardContainer"
								tableCards={tableCards}
								turnEnded={turnEnded}
								setTurnEnded={setTurnEnded}
								selectedTableCards={selectedTableCards}
								setSelectedTableCards={setSelectedTableCards}
							/>
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
							<HandCards
								className="handCardContainer"
								handCards={handCards}
								turnEnded={turnEnded}
								setTurnEnded={setTurnEnded}
								selectedHandCards={selectedHandCards}
								setSelectedHandCards={setSelectedHandCards}
							/>
						</div>
					</div>
					<div className="tokensContainer">
						<TokensContainer tokens={tokens} />
						{console.log(tokens)}
					</div>
					{/* <CardPile /> */}
				</div>
			) : null}
			{gameOver ? <GameOver /> : null}
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable={false}
				pauseOnHover
				theme="light"
			/>
		</div>
	);
}

export default App;
