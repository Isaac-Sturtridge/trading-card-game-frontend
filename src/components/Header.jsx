import { useState } from "react";
import Instructions from "./Instructions";
import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Header = ({ score }) => {
  const [instructions, setInstructions] = useState(false);

  const handleInstructionsClick = (event) => {
    setInstructions((instructions) => {
      console.log(instructions);
      return !instructions;
    });
  };

  return (
    <header className="headerArea">
      <div className="scores">
        <h2>Player 1: {score.player1}</h2>
        <h2>Player 2: {score.player2}</h2>
      </div>
      <div className="titleContainer">
        <h1 className="title">Card Game</h1>
      </div>
      <div>
        <Popup
          trigger={<button className="instructionsButton">Instructions</button>}
          modal
          nested
        >
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
