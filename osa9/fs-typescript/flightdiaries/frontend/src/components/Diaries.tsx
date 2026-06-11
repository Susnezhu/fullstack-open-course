import type {DiaryEntry} from '../../../backend/src/types'

interface DiariesProps {
  diaries: DiaryEntry[]
};

const Diaries = ({diaries}: DiariesProps) => {

  return (
    <div>
      <h2>Diary entries</h2>
      <li key="header"><strong>date - weather - visibility</strong></li>
      {diaries.map(diary => (
        <li key={diary.id}>{diary.date} - {diary.weather} - {diary.visibility}</li>
      ))}
    </div>
  )
};

export default Diaries;