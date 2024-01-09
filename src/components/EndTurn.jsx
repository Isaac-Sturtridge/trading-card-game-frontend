import { useEffect, useState } from 'react';
import { socket } from '../socket';

const EndTurn = ({
	turnEnded,
	setTurnEnded,
	selectedTableCards,
	selectedHandCards,
	handCards,
	tableCards,
}) => {
	const [action, setAction] = useState('Your turn');
	const [payload, setPayload] = useState([]);
	const [actionLookup, setActionLookup] = useState({
		addCardToHand: 'Take card',
		sellCardFromHand: 'Sell card',
		cardSwap: 'Swap cards',
		'Invalid Move': 'Invalid Move',
		'Your turn': 'Your turn',
		maxCards: 'Max card reached',
	});

	// console.log(handCards.length);

	const handCardLength = () => {
		return handCards.filter((card) => card.card_type !== 'Camel').length;
	};

	const countCardType = (cards) => {
		const result = {};
		for (let card of cards) {
			if (result[card.card_type] !== undefined)
				result[card.card_type] += 1;
			else result[card.card_type] = 1;
		}
		return result;
	};

	const validTableSelection = () => {
		// if there are camel cards selected on the table
		const tCardsCount = countCardType(tableCards);
		const selTableCardsCount = countCardType(selectedTableCards);

		// more than one card selected check that all the camels have been selected
		if (
			tCardsCount.hasOwnProperty('Camel') &&
			selTableCardsCount.hasOwnProperty('Camel')
		) {
			if (tCardsCount['Camel'] === selTableCardsCount['Camel'])
				return true;
			else {
				console.log(
					'If you want to take camels from the table you must take all of them.'
				);
				return false;
			}
		}
		// otherwise only one card should can be selected
		else if (selectedTableCards.length > 1) {
			console.log('Take only one card from the table.');
			return true;
		} else return false;
	};

	const validHandSelection = () => {
		// if the player has selected any camels to sell return false
		if (selectedHandCards.some((card) => card.card_type === 'Camel')) {
			console.log(`Camels can not be sold!`);
			return false;
		}
		// check that every good selected is of the same type
		else if (
			!selectedHandCards.every(
				(card) => card.card_type === selectedHandCards[0].card_type
			)
		) {
			console.log('Only goods of the same kind can be sold!');
			return false;
		} else return true;
	};

	const validSwapSelection = () => {
		// check if the player is trying to swap one good only
		// if so return false
		if (selectedHandCards.length === 1) {
			console.log(
				`Two or more cards must be swaped and of different kinds.`
			);
			return false;
		}
		// otherwise create a set of the unique goods up for swap
		const extractedTableCards = selectedTableCards.map(
			(card) => card.card_type
		);
		const extractedHandCards = selectedHandCards.map(
			(card) => card.card_type
		);
		const arr1Set = [...new Set(extractedTableCards).values()];
		const arr2Set = [...new Set(extractedHandCards).values()];
		// console.log(arr1Set, arr2Set);
		// check if goods in one set are present in the other,
		// if so return false because the player the player can only swap goods of a different kind.
		if (
			arr2Set.some((x) => {
				return arr1Set.includes(x);
			})
		) {
			console.log(`You can only swap goods of a different kind.`);
			return false;
		}

		// calculate how many goods this swap will leave in the player's hand
		const outcomeSwap =
			handCards.length -
			selectedHandCards.filter((card) => {
				card.card_type;
			}).length +
			selectedTableCards.filter((card) => {
				card.card_type;
			}).length;
		// if the swap will result in more than 7 goods in the players hand
		// return false
		if (outcomeSwap > 7) {
			console.log(
				`Swap cards so you have up to a max of 7 goods in you hand!`
			);
			return false;
		}
		// this swap is valid
		else return true;
	};

	useEffect(() => {
		// no cards have been selected
		if (selectedHandCards.length === 0 && selectedTableCards.length === 0) {
			setAction('Your turn');
		}
		// when only tableCards have been selected
		else if (
			selectedHandCards.length === 0 &&
			handCardLength() < 7 &&
			validTableSelection()
		) {
			setAction('addCardToHand');
			setPayload({ cards: selectedTableCards });
		}
		// when only hand cards have been selected
		else if (
			selectedHandCards.length > 0 &&
			selectedTableCards.length === 0 &&
			validHandSelection()
		) {
			setAction('sellCardFromHand');
			setPayload({ cards: selectedHandCards });
			// swap cards
		} else if (
			// selectedHandCards.length > 1 &&
			selectedHandCards.length === selectedTableCards.length &&
			validSwapSelection()
		) {
			setAction('cardSwap');
			setPayload({
				handCards: selectedHandCards,
				tableCards: selectedTableCards,
			});
		} else if (handCardLength() > 7) {
			setAction('maxCards');
		} else {
			setAction('Invalid Move');
		}
	}, [selectedHandCards, selectedTableCards]);

	const handleClick = () => {
		socket.emit(action, payload);
		socket.emit('endTurn', turnEnded, () => {});
	};

	return (
		<button
			className={`endTurnButton ${action}`}
			disabled={
				!turnEnded ||
				action === 'Invalid Move' ||
				action === 'Your turn' ||
				action === 'maxCards'
			}
			onClick={handleClick}>
			{turnEnded ? `${actionLookup[action]}` : 'Opponents Turn!'}
		</button>
	);
};

export default EndTurn;
