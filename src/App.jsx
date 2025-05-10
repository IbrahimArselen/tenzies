import React from "react";
import Die from "./components/Die";
import Confetti from "react-confetti";
import { nanoid } from "nanoid";

import "./App.css";

function App() {
  const [dice, setDice] = React.useState(() => generateAllNewDice());
  const buttonRef = React.useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  React.useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }
  function holdDice(id) {
    setDice((prevDice) =>
      prevDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }
  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      holdDice={() => holdDice(dieObj.id)}
    />
  ));

  function RollDice() {
    if (gameWon) {
      setDice(generateAllNewDice());
    } else {
      setDice((prevDice) =>
        prevDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    }
  }

  return (
    <main className="container-fluid">
      {gameWon && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="col-md-12-sm-12 dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={RollDice} ref={buttonRef}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
