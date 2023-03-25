import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DiaryDispatchContext } from "../App";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Moods } from "../components/Moods";

export default function New() {
  const [mood, setMood] = useState(3);
  const [text, setText] = useState("");
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
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
    <div className="New">
      <Header
        headText={"새 일기쓰기"}
        leftChild={
          <Link to="/">
            <Button text={"< 뒤로가기"} type={"default"} />
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
            text={"작성완료"}
            type={"positive"}
            onClick={() => {
              dispatch.onCreate(date, text, mood);
            }}
          />
        </Link>
      </div>
    </div>
  );
}
