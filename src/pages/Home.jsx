import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryStateContext, handleEditContext } from "../App";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import MainList from "../components/MainList";

export default function Home() {
  const diaryList = useContext(DiaryStateContext);
  const [data, setData] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    if (diaryList && diaryList.length >= 1) {
      const firstDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).getTime();
      const lastDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, currentDate]);

  const handleIncreaseMonth = () => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      )
    );
  };
  const handleDecreaseMonth = () => {
    new Date(
      setCurrentDate(
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          currentDate.getDate()
        )
      )
    );
  };
  return (
    <div className="Home">
      <Header
        headText={`${currentDate.getFullYear()}년 ${
          currentDate.getMonth() + 1
        }월`}
        leftChild={
          <Button text={"<"} type={"default"} onClick={handleDecreaseMonth} />
        }
        rightChild={
          <Button text={">"} type={"default"} onClick={handleIncreaseMonth} />
        }
      />
      <div className="control-bar">
        <select className="option-date">
          <option value="최신순">최신순</option>
          <option value="오래된순">오래된순</option>
        </select>
        <select className="option-mood">
          <option value="모두">모두</option>
          <option value="좋은 기억만">좋은 기억만</option>
          <option value="안좋은 기억만">안좋은 기억만</option>
        </select>
        <Link to="/new">
          <Button
            type={"positive"}
            text={"새 일기쓰기"}
            className={"btn-create"}
          />
        </Link>
      </div>
      <ul className="lists">
        {data.map((item) => (
          <Link to="/diary">
            <MainList
              key={item.id}
              id={item.id}
              date={item.date}
              emotion={item.emotion}
              content={item.content}
            />
          </Link>
        ))}
      </ul>
    </div>
  );
}
