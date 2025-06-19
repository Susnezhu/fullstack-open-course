const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.name} {props.exercise}</p>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  let total = 0;
  for (let i = 0; i < props.exercises.length; i++) {
    total += props.exercises[i];
  }

  return (
    <div>
      <p>Number of exercises {total}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />

      <Content parts={[
        {name: parts[0].name, exercises: parts[0].exercises},
        {name: parts[1].name, exercises: parts[1].exercises},
        {name: parts[2].name, exercises: parts[2].exercises}
      ]} />

      <Total exercises={[parts[0].exercises,parts[1].exercises,parts[2].exercises]}/>
    </div>
  )
}

export default App