import { useField } from "../hooks/qustomQuery"
import diaryService from "../services/diaryService";

import axios from "axios";

import type { Visibility, Weather, DiaryEntry } from '../../../backend/src/types'

type Props = {
  diaries: DiaryEntry[]
  setDiaries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>
  showMessage: (message: string[]) => void
}

const AddDiary = ({diaries, setDiaries, showMessage}: Props) => {
  const { reset: resetDate, ...date } = useField('date')
  const { reset: resetVisibility, ...visibility } = useField('visibility')
  const { reset: resetWeather, ...weather } = useField('weather')
  const { reset: resetComment, ...comment } = useField('comment')

  const VISIBILITY = ["great", "good", "ok", "poor"];
  const WEATHER = ["sunny", "rainy", "cloudy", "stormy", "windy"];

  const resetFunc = () => {
    resetDate();
    resetVisibility();
    resetWeather();
    resetComment();
  };

  const handleNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    try {
      const returnedDiary = await diaryService.create(
        {date: date.value,
        visibility: visibility.value as Visibility,
        weather: weather.value as Weather,
        comment: comment.value
      })
        
      setDiaries(diaries.concat(returnedDiary))

      resetFunc();
    } catch (error) {
      if (axios.isAxiosError(error)) {
      const data = error.response?.data?.error

      const message = Array.isArray(data)
      ? data.map((e) => e.message)
      : ["Unknown error"]
      
      console.log(message)
      showMessage(message)
      } else {
        showMessage(["Unknown error"])
      }
    }
  }

  return (
  <div>
    <form onSubmit={handleNewDiary} style={{display:"flex", flexDirection: "column", marginTop: "50px"}}>
      <h2>Add new Diary Entry</h2>
      
      <label> Date: 
        <input {...date} type="date"/>
      </label>

      <div style={{flexDirection: "row"}}>
        {VISIBILITY.map(v => (
          <label key={v}>
            {v}
            <input
              style={{marginRight: "20px"}}
              type="radio"
              name={visibility.name}
              value={v}
              checked={visibility.value === v}
              onChange={visibility.onChange}
            />
          </label>
        ))}
      </div>
      <div style={{flexDirection: "row"}}>
        {WEATHER.map(v => (
          <label key={v}>
            {v}
            <input
              style={{marginRight: "20px"}}
              type="radio"
              name={weather.name}
              value={v}
              checked={weather.value === v}
              onChange={weather.onChange}
            />
          </label>
        ))}
      </div>

      <label> Comment: 
        <input {...comment} />
      </label>

        <button type='submit' style={{maxWidth: "50px"}}>add</button>
      </form>
  </div>
  )
}

export default AddDiary