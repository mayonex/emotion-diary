import React from "react";

export const Header = ({ leftChild, headText, rightChild }) => {
  return (
    <div className="Header">
      <div className="Header__leftChild">{leftChild}</div>
      <div className="Header__text">{headText}</div>
      <div className="Header__rightChild">{rightChild}</div>
    </div>
  );
};

Header.defaultProps = {
  leftChild: "",
  Text: "",
  rightChild: "",
};
