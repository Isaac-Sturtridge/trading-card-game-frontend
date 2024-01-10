import OpponentCard from "./OpponentCard";

const OpponentCards = ({ opponentHand }) => {
  return (
    <div className="opponentCardArea">
      {Array.from({ length: opponentHand }, (_, i) => (
        <div className="opponentCardBack"></div>
      ))}
    </div>
  );
};

export default OpponentCards;
