import React from "react";

export const Moods = ({ mood, text, handleMoodsToggle, is_selected }) => {
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <div
      onClick={(e) => {
        handleMoodsToggle(e, mood);
      }}
      className={
        is_selected
          ? `mood_default mood_active_${mood}`
          : `mood_default mood_default_${mood}`
      }
    >
      <img src={process.env.PUBLIC_URL + `/assets/emotion${mood}.png`} />
      <span>{text}</span>
    </div>
  );
};
