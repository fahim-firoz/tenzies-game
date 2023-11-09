import React from "react";

export default function Die(props) {
  const styles = {
    backgroundColor /*need to use camel case */: props.isHeld
      ? "rgb(70, 214, 70)"
      : "white",
  };
  return (
    <div className="die-face" style={styles} onClick={props.holdDice}>
      <h2>{props.dieNumber}</h2>
    </div>
  );
}
