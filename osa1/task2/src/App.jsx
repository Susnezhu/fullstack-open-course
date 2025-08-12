import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Sum = (props) => {
  let summary = props.a + props.b + props.c;

  return (
    summary
  );
};

const Average = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  let summary = a + b + c;

  if (summary === 0) {
    return 0;
  }

  let average = (a * 1 + b * 0 + c * (-1)) / summary

  return (
    average
  )
}

const Positive = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  let summary = a + b + c;
  let prosent = (a / summary) * 100;

  if (summary === 0) {
    return "0%"
  }

    return (
        prosent + "%"
    )
}

const StatisticLine = (props) => {

  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

const Statistics = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  return (
   <table>
      <tbody>
        <StatisticLine text="good" value ={a} />
        <StatisticLine text="neutral" value ={b} />
        <StatisticLine text="bad" value ={c} />

        <StatisticLine text="All" value ={<Sum a={a} b={b} c={c} />} />
        <StatisticLine text="Average" value ={<Average a={a} b={b} c={c}/>} />
        <StatisticLine text="Positive" value ={<Positive a={a} b={b} c={c}/>} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let feedbackGiven = false;
  if (good > 0 || neutral > 0 || bad > 0) {
    feedbackGiven = true;
  }

  return (
    <div>
      <h1>Give feedback!</h1>

      <Button onClick={() => setGood(good + 1)} text="Good"/>
      <Button onClick={() => setNeutral(neutral +1)} text="Neutral" />
      <Button onClick={() => setBad(bad + 1)} text="Bad" />

      <h2>statistics:</h2>

      {feedbackGiven && <Statistics a={good} b={neutral} c={bad} />}
      
    </div>
  );
}

export default App;