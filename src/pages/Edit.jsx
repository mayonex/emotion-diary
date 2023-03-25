import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryDispatchContext, handleEditContext } from "../App";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Moods } from "../components/Moods";

export default function Edit() {
  const editInfo = useContext(handleEditContext);
  const data = editInfo.info;
  const [mood, setMood] = useState(data.emotion);
  const [text, setText] = useState(data.content);
  const initialDate = new Date(data.date);
  const year = initialDate.getFullYear();
  const month = initialDate.getMonth() + 1;
  const day = initialDate.getDate();
  const dateValue = `${year}-${month >= 10 ? month : "0" + month}-${
    day >= 10 ? day : "0" + day
  }`;
  const [date, setDate] = useState(dateValue);
  const emotionList = [
    {
      emotion_mood: 1,
      emotion_text: "완전 좋음",
    },
    {
      emotion_mood: 2,
      emotion_text: "좋음",
    },
    {
      emotion_mood: 3,
      emotion_text: "그럭저럭",
    },
    {
      emotion_mood: 4,
      emotion_text: "나쁨",
    },
    {
      emotion_mood: 5,
      emotion_text: "끔찍함",
    },
  ];
  const handleMoodsToggle = (e, mood) => {
    setMood(mood);
  };
  const dispatch = useContext(DiaryDispatchContext);
  return (
    <div className="Edit">
      <Header
        headText={"일기 수정하기"}
        leftChild={
          <Link to="/">
            <Button text={"< 뒤로가기"} type={"default"} />
          </Link>
        }
        rightChild={
          <Link to="/">
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={() => {
                dispatch.onRemove(data.dataId);
                alert("정말로 삭제하실 겁니까?");
              }}
            />
          </Link>
        }
      />
      <section className="New__date">
        <h4>오늘은 언제인가요?</h4>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </section>
      <section className="New__mood">
        <h4>오늘의 감정</h4>
        <div className="moods">
          {emotionList.map((item, index) => {
            return (
              <Moods
                key={index}
                handleMoodsToggle={handleMoodsToggle}
                mood={item.emotion_mood}
                text={item.emotion_text}
                is_selected={item.emotion_mood === mood}
              />
            );
          })}
        </div>
      </section>
      <section className="New__text">
        <h4>오늘의 일기</h4>
        <textarea
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
        ></textarea>
      </section>
      <div className="New__btn">
        <Link to="/">
          <Button text={"취소하기"} type={"default"} />
        </Link>
        <Link to="/">
          <Button
            text={"수정완료"}
            type={"positive"}
            onClick={() => {
              dispatch.onEdit(data.dataId, date, text, mood);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
