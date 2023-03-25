import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryStateContext, handleEditContext } from "../App";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import MainList from "../components/MainList";

export default function Home() {
  const [data, setData] = useState([]);
  const diaryList = useContext(DiaryStateContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [filter, setFilter] = useState("");
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
        0,
        23,
        59,
        59
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
      <ul className="lists">
        <MainList diaryList={data} />
      </ul>
    </div>
  );
}
