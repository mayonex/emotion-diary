import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { handleEditContext } from "../App";
import { Button } from "./Button";
import { Moods } from "./Moods";

function ListItem({ item, idx }) {
  const setInfo = useContext(handleEditContext);
  const handleEdit = (item) => {
    setInfo.setEditInfo(item.id, item.date, item.content, item.emotion);
  };
  return (
    <Link to="/diary">
      <li
        key={idx}
        className="list"
        onClick={() => {
          handleEdit(item);
        }}
      >
        <div className="list-img">
          <Moods mood={item.emotion} />
        </div>
        <div className="list-content">
          <div className="content">
            <div className="content-date">
              {`${new Date(item.date).getFullYear()}. ${
                new Date(item.date).getMonth() + 1
              } .${new Date(item.date).getDate()}`}
            </div>
            <div className="content-text">{item.content.slice(0, 25)}</div>
          </div>
          <div className="content-edit-btn">
            <Link to="/edit">
              <Button text={"수정하기"} type={"default"} onClick={handleEdit} />
            </Link>
          </div>
        </div>
      </li>
    </Link>
  );
}
export default React.memo(ListItem);
