import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleEditContext } from "../App";
import { Button } from "./Button";
import { Moods } from "./Moods";

export default function MainList({ id, date, emotion, content }) {
  const pastDate = new Date(date);
  const setInfo = useContext(handleEditContext);
  const handleEdit = () => {
    setInfo.setEditInfo(id, date, content, emotion);
  };

  return (
    <li className="list" onClick={handleEdit}>
      <div className="list-img">
        <Moods mood={emotion} />
      </div>
      <div className="list-content">
        <div className="content">
          <div className="content-date">
            {`${pastDate.getFullYear()}. ${
              pastDate.getMonth() + 1
            } .${pastDate.getDate()}`}
          </div>
          <div className="content-text">{content}</div>
        </div>
        <div className="content-edit-btn">
          <Link to="/edit">
            <Button text={"수정하기"} type={"default"} onClick={handleEdit} />
          </Link>
        </div>
      </div>
    </li>
  );
}
