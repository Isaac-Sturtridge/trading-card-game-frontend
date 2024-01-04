const Header = ({ score, setInstructions }) => {
  const handleInstructionsClick = () => {
    setInstructions((instructions) => {
      console.log(instructions);
      return !instructions;
    });
  };

  return (
    <>
      <h2>Player 1: {score[0]}</h2>
      <h2>Player 2: {score[1]}</h2>
      <div id="instructionsButton">
        <button onClick={handleInstructionsClick}>Instructions</button>
        <p></p>
      </div>
    </>
  );
};

export default Header;
