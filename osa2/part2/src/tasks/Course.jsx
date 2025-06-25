const Course = ({courses}) => {

  return (
    <div>
      <h1>Web development curriculum</h1>

      {courses.map(course => (
        <div key={course.id}>
          <Header header={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </div>
  )
}

const Header = ({header}) => {
  return (
    <h2>{header}</h2>
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
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);
  
  return (
    <div>
      <p>total of {total} exercises</p>
    </div>
  )
}


export default Course