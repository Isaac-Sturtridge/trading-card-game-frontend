const Instructions = () => {
	return (
		<div>
			<h3>Welcome to Card Game</h3>
			<p>
				This is a 2-player game. You will be able to start your game
				when your opponent joins.
			</p>
			<p>You will have 1 action per turn. Avaliable actions per turn: </p>
			<p>
				<b>GOAL: </b> The goal is to earn more points than your opponent{' '}
				<b>BEFORE</b> you run out of buyers for 3 types of resourse, or
				the deck runs out!
			</p>
			<ul>
				<li>Buy a single card from the table</li>
				<li>Sell a single TYPE of card(s) from your hand</li>
				<li>Swap cards from your hand with cards from the table</li>
			</ul>
			<p>
				To score points, you must sell cards from your hand. The faster
				you sell them, the more their worth!
			</p>
			<p>
				There are only a certain amount of buyers per resource, and once
				they're gone, theyre gone! You will receive a number of points
				per resource you sell starting from the left-most side. However,
				once there are no more buyers, you can no longer receive points
				for this resource.
			</p>
			<p>
				<b>For example: </b>You have 4 Diamonds in your hand. You sell
				all of them as your action. You will receive: 7 + 7 + 5 + 5 = 24
				points{' '}
				<i>
					(Not including any extra's you get for selling 4 cards at a
					time!)
				</i>
			</p>
			<ul>
				<pre>
					<li>Diamond: [7, 7, 5, 5, 5]</li>
					<li>Gold: [6, 6, 5, 5, 5]</li>
					<li>Silver: [5, 5, 5, 5, 5]</li>
					<li>Textile: [5, 3, 3, 2, 2, 1, 1]</li>
					<li>Spice: [5, 3, 3, 2, 2, 1, 1]</li>
					<li>Bronze: [4, 3, 2, 1, 1, 1, 1, 1, 1]</li>
				</pre>
			</ul>
			<p>
				Additionally, you can gain <b>BONUS</b> points for selling
				multiple cards of the same type at once!
			</p>
			<p>
				Once you have made your action, this will end your turn and move
				to your opponent&apos;s turn.
			</p>
			<p>
				<i>Please note: You have a maximum card limit of 7</i>
			</p>
		</div>
	);
};

export default Instructions;
