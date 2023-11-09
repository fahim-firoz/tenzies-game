import React from "react";
import "./index.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceArray, setDiceArray] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = diceArray.every((data) => data.isHeld);
    const firstDie = diceArray[0];
    const allSameValue = diceArray.every(
      (data) => data.value === firstDie.value
    );
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [diceArray]);

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function rollDice() {
    if (!tenzies) {
      setDiceArray((prevState) =>
        prevState.map((data) => {
          return data.isHeld ? { ...data } : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDiceArray(allNewDice());
    }
  }

  function holdDice(id) {
    setDiceArray((prevState) =>
      prevState.map((data) => {
        return id === data.id ? { ...data, isHeld: !data.isHeld } : { ...data };
      })
    );
  }
  const dieElements = diceArray.map((data) => {
    return (
      <Die
        dieNumber={data.value}
        isHeld={data.isHeld}
        holdDice={() => holdDice(data.id)}
      ></Die>
    );
  });

  return (
    <main>
      <div className="container">
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">
          <span className="instruction-1">
            Roll until all dice are the same.
          </span>
          <br /> Click each die to freeze it at its current value between rolls.
        </p>
        <div className="dice-container">{dieElements}</div>
        <button className="roll-button" onClick={rollDice}>
          {tenzies ? "New Game" : "Roll"}
        </button>
      </div>
    </main>
  );
}
