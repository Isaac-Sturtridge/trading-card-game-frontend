import OpponentCard from "./OpponentCard";

const OpponentCards = ({ opponentHand }) => {
  return (
    <div className="opponentCardArea">
      {Array.from({ length: opponentHand }, (_, i) => (
        <div className="opponentCardBack" key={i}></div>
      ))}
    </div>
  );
};

export default OpponentCards;
