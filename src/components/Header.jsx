import { useState } from 'react';
import Instructions from './Instructions';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { socket } from '../socket';

const Header = ({ score, usernames }) => {
	const [instructions, setInstructions] = useState(false);

	const handleInstructionsClick = (event) => {
		setInstructions((instructions) => {
			console.log(instructions);
			return !instructions;
		});
	};

	let player, opponent;
	for (const user in usernames) {
		if (usernames[user].userID === socket.userID) {
			player = `${usernames[user].username} (you)`;
		} else {
			opponent = usernames[user].username;
		}
	}

	let playerScore, opponentScore;
	for (const s in score) {
		if (s === socket.userID) {
			playerScore = score[s];
		} else {
			opponentScore = score[s];
		}
	}

	return (
		<header className="headerArea">
			<div className="scores">
				<h2>
					{player ? player : 'Player 1'}: {playerScore || 0}
				</h2>
				<h2>
					{opponent ? opponent : 'Player 2'}: {opponentScore || 0}
				</h2>
			</div>
			<div className="titleContainer">
				<h1 className="title">Card Game</h1>
			</div>
			<div>
				<Popup
					trigger={
						<button className="instructionsButton">
							Instructions
						</button>
					}
					modal
					nested>
					{(close) => (
						<div className="modal">
							<button className="close" onClick={close}>
								&times;
							</button>
							<div className="header">Instructions</div>
							<div className="content">
								<Instructions />
							</div>
						</div>
					)}
				</Popup>
			</div>
		</header>
	);
};

export default Header;
