import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { handleEditContext } from "../App";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Moods } from "../components/Moods";

export default function Diary() {
  const handleInfo = useContext(handleEditContext);
  const info = handleInfo.info;
  const date = new Date(info.date);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return (
    <div className="Diary">
      <Header
        leftChild={
          <Link to="/">
            <Button type="default" text="< 뒤로가기" />
          </Link>
        }
        headText={`${year}-${month >= 10 ? month : "0" + month}-${
          day >= 10 ? day : "0" + day
        } 기록`}
        rightChild={
          <Link to="/edit">
            <Button
              type="default"
              text="수정하기"
              onClick={() => {
                handleInfo.setEditInfo(
                  info.dataId,
                  info.date,
                  info.content,
                  info.emotion
                );
              }}
            />
          </Link>
        }
      />
      <section className="diary__mood">
        <div>오늘의 감정</div>
        <Moods mood={info.emotion} />
      </section>
      <section className="diary__content">
        <div className="content-title">오늘의 일기</div>
        <div className="content">{info.content}</div>
      </section>
    </div>
  );
}
