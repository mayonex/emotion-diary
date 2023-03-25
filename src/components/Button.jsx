import React from "react";
import { Link } from "react-router-dom";

export const Button = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["Button", `Button_${type}`].join(" ")}
      onClick={onClick}
      type={type}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  type: "default",
};
