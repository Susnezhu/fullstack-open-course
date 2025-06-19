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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />

      <Content parts={[
        {name: part1.name, exercises: part1.exercises},
        {name: part2.name, exercises: part2.exercises},
        {name: part3.name, exercises: part3.exercises}
      ]} />

      <Total exercises={[part1.exercises,part2.exercises,part3.exercises]}/>
    </div>
  )
}

export default App