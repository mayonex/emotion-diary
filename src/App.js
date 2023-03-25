import React, { useReducer, useRef, useState } from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
// components
import { Button } from "./components/Button";
import { Header } from "./components/Header";
// pages
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import New from "./pages/New";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item) =>
        item.id === action.data.id ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export const handleEditContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const [info, setInfo] = useState({});
  const dateId = useRef(0);
  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dateId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dateId.current += 1;
  };
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };
  //DEIT
  const onEdit = (id, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };
  const setEditInfo = (dataId, date, content, emotion) => {
    const info = {
      dataId,
      date,
      content,
      emotion,
    };
    setInfo(info);
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            <handleEditContext.Provider value={{ setEditInfo, info }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/new" element={<New />} />
                <Route path="/diary" element={<Diary />} />
              </Routes>
            </handleEditContext.Provider>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
