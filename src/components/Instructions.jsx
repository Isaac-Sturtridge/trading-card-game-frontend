const Instructions = () => {
  return (
    <div>
      <h3>Welcome to Card Game</h3>
      <p>This is a 2-player game. You will be able to start your game when your opponent joins.</p>
      <p>You will have 1 action per turn. Avaliable actions per turn: </p>
      <ul>
        <li>Buy a single card from the table</li>
        <li>Sell a single TYPE of card(s) from your hand</li>
        <li>Swap cards from your hand with cards from the table</li>
      </ul>
      <p>To score points, you must sell cards from your hand</p>
      <p>Points per card type are as follows:</p>
      <ul>
        <li>Bronze = 6 points</li>
        <li>Silver = 8 points</li>
        <li>Gold = 10 points</li>
      </ul>
      <p>Additionally, you can gain BONUS points for selling multiple cards of the same type at once!</p>
      <p>Hit 'End Turn!' once you have made your action and think about what you want to do next, while your opponent makes their turn!</p>
      <p>Please note: You have a maximum card limit of 7</p>

    </div>
  );
};

export default Instructions;
