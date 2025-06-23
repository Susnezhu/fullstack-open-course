import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>{props.text}</button>
)

const RandomNum = () => {
    const random = Math.floor(Math.random() * 8);

    return random
}

const ShowVotes = (props) => {
    return (
      <p>has {props.allVotes[props.select]} votes</p>
    )
}

const PopularVote  = (props) => {
    let maxVotes = 0
    let maxIndex = 0

  props.votes.forEach((vote, i) => {
    if (vote > maxVotes) {
      maxVotes = vote;
      maxIndex = i;
    }
  });

  if (maxVotes === 0) {
    return <p>No votes yet</p>
  }

  return (
    <div>
    <p>{props.anecdotes[maxIndex]}</p>
    </div>
  )
}

const Task3 = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const voteForAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>

      {anecdotes[selected]}
    
      <ShowVotes allVotes={votes} select={selected}/>

      <br />

      <Button onClick={() => setSelected(RandomNum())} text="Next anecdote"/>
    
      <Button onClick={voteForAnecdote} text="Vote" />

      <h1>Anecdote with most votes</h1>

      <PopularVote votes={votes} anecdotes={anecdotes}/>

    </div>
  )
}

export default Task3;