import { socket } from "../socket";

const GameOver = ({ score, usernames, gameOverReasonDisplay }) => {
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
    <div className="gameOverContainer">
      <p className="reasonText">{gameOverReasonDisplay}</p>
      {playerScore > opponentScore ? (
        <h2 className="winnerText">You won!</h2>
      ) : (
        <h2 className="winnerText">{opponent} won!</h2>
      )}{" "}
      <h2>
        {player}: {playerScore || 0}
      </h2>
      <h2>
        {opponent}: {opponentScore || 0}
      </h2>
    </div>
  );
};
export default GameOver;
