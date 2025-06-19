import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Task2 = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1>

      <Button onClick={() => setGood(good + 1)} text="Good"/>
      <Button onClick={() => setNeutral(neutral +1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <h2>statistics:</h2>

      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>

    </div>
  );
}

export default Task2;