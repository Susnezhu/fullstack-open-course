import type {CoursePart} from '../courseData/courseParts'
import Part from './Part';

interface CoursePartsProps {
  parts: CoursePart[];
}

const Content = ({parts}: CoursePartsProps) => {
  return (
    <div>
      {parts.map(part => (
        <div key={part.name} style={{marginBottom: "80px"}}>
          <strong>{part.name} {part.exerciseCount}</strong>
          <Part part={part}/>
        </div>
      ))}
    </div>
  );
};

export default Content;