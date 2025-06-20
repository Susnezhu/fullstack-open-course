import { useState } from 'react'


const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const Sum = (props) => {
  let summary = props.a + props.b + props.c;

  return (
    <div>
      <p>All: {summary}</p>
    </div>
  );
};

const Average = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  let summary = a + b + c;

  if (summary === 0) {
    return <p>Average: 0</p>;
  }

  let average = (a * 1 + b * 0 + c * (-1)) / summary

  return (
    <div>
      <p>Average: {average}</p>
    </div>
  )
}

const Positive = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  let summary = a + b + c;
  let prosent = (a / summary) * 100;

  if (summary === 0) {
    return <p>Positive: 0 %</p>;
  }

    return (
        <div>
            <p>Positive: {prosent} %</p>
        </div>
    )
}

const Statistics = (props) => {
  const a = props.a;
  const b = props.b;
  const c = props.c;

  return (
  <div>
    <p>Good: {a}</p>
    <p>Neutral: {b}</p>
    <p>Bad: {c}</p>

    <br />

    <Sum a={a} b={b} c={c} />
    <Average a={a} b={b} c={c}/>
    <Positive a={a} b={b} c={c}/>
  </div>
  )


}

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

      <Statistics a={good} b={neutral} c={bad} />
    </div>
  );
}

export default Task2;