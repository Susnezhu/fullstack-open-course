
const Course = ({course}) => {

  return (
    <div>
      <Header header={course.name}/>

      <Content parts={course.parts}/>

      <Total parts={course.parts}/>
    </div>
  )
}

const Header = ({header}) => {
  return (
    <h1>{header}</h1>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Total = ({parts}) => {
  let total = 0;

  parts.map(part => (
    total += part.exercises
  ))

  return (
    <div>
      <p>total of {total} exercises</p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App