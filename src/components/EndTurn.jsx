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

	console.log(handCards.length);

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

		console.log(tCardsCount, selTableCardsCount);
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
		else if (selectedTableCards.length === 1) return true;
		else false;
	};

	const validHandSelection = () => {
		return (
			selectedHandCards.every(
				(card) => card.card_type === selectedHandCards[0].card_type
			) && selectedHandCards.some((card) => card.card_type !== 'Camel')
		);
	};

	const validSwapSelection = () => {
		const extractedTableCards = selectedTableCards.map(
			(card) => card.card_type
		);
		const extractedHandCards = selectedHandCards.map(
			(card) => card.card_type
		);
		const arr1Set = [...new Set(extractedTableCards).values()];
		const arr2Set = [...new Set(extractedHandCards).values()];
		// console.log(arr1Set, arr2Set);
		return !arr2Set.some((x) => {
			console.log(arr1Set.includes(x), x);
			return arr1Set.includes(x);
		});
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
			selectedHandCards.length > 1 &&
			selectedHandCards.length === selectedTableCards.length &&
			validSwapSelection()
		) {
			setAction('cardSwap');
			setPayload({
				handCards: selectedHandCards,
				tableCards: selectedTableCards,
			});
		} else if (handCardLength() >= 7) {
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
