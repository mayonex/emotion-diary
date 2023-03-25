import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleEditContext } from "../App";
import { Button } from "./Button";
import ListItem from "./ListItem";
import { Moods } from "./Moods";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];
const optionMoodList = [
  { value: "all", name: "모두" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];
const ConrolMenu = React.memo(({ value, onChange, optionList, className }) => {
  return (
    <select
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
});

export default function MainList({ diaryList }) {
  const [sortType, setSortType] = useState("latest");
  const [filterType, setFilterType] = useState("all");
  const getProcessedDiaryList = () => {
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };
    const copyList = JSON.parse(JSON.stringify(diaryList));
    const filterList = copyList.filter((item) => {
      if (filterType === "all") {
        return item;
      } else if (filterType === "good") {
        return parseInt(item.emotion) <= 3;
      } else if (filterType === "bad") {
        return parseInt(item.emotion) > 3;
      }
    });
    const sortedList = filterList.sort(compare);
    return sortedList;
  };
  return (
    <>
      <div className="control-bar">
        <ConrolMenu
          value={sortType}
          onChange={setSortType}
          optionList={sortOptionList}
          className={`select-date`}
        />
        <ConrolMenu
          value={filterType}
          onChange={setFilterType}
          optionList={optionMoodList}
          className={`select-mood`}
        />
        <Link to="/new">
          <Button
            type={"positive"}
            text={"새 일기쓰기"}
            className={"btn-create"}
          />
        </Link>
      </div>
      {getProcessedDiaryList().map((item, idx) => {
        return <ListItem item={item} idx={idx} />;
      })}
    </>
  );
}
