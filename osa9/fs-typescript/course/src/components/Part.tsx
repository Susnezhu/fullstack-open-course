import { type CoursePart } from "../courseData/courseParts";

interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      console.log(part.kind, part.name, part.exerciseCount, part.description)
      return <p>{part.description}</p>
    case "group":
      console.log(part.kind, part.name, part.exerciseCount, part.groupProjectCount)
      return <p>project exercises: {part.groupProjectCount}</p>
    case "background":
      console.log(part.kind, part.name, part.exerciseCount, part.description, part.backgroundMaterial)
      return <p>{part.description} <br/> submit to: {part.backgroundMaterial}</p>
    case "special":
      console.log((part.kind, part.name, part.exerciseCount, part.description, part.requirements))
      return <p>{part.description} <br/> require skills: {part.requirements.join(", ")}</p>
    default:
      break;
  }
}


export default Part;