import { useState, useEffect } from "react";
import type {DiaryEntry} from '../../backend/src/types'

import diaryService from "./services/diaryService";

import Diaries from "./components/Diaries";
import AddDiary from "./components/NewDiary";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [message, setMessage] = useState<string[]>([])

  const showMessage = (message: string[]) => {
    setMessage(message);

    setTimeout(() => {
      setMessage([])
    }, 5000);
  }

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <Diaries diaries={diaries}/>

      <ul>
        {message.map((m, index) => (
          <li key={index} style={{color: "red"}}>error: {m}</li>
        ))}
      </ul>

      <AddDiary diaries={diaries} setDiaries={setDiaries} showMessage={showMessage}/>
    </div>
  );
};

export default App;