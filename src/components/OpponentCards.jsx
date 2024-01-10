const OpponentCards = ({ opponentHand }) => {
  return (
    <div className="opponentCardArea">
      {Array.from({ length: opponentHand }, (_, i) => (
        <div className="opponentCardBack" key={i}>
          <p className="cardBackText">Resource</p>
          <p className="cardBackText">Rivals</p>
        </div>
      ))}
    </div>
  );
};

export default OpponentCards;
