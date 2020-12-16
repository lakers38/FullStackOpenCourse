import React, {useState} from 'react'
import ReactDOM from 'react-dom'



const Button = ({text, clickHandler}) => {
  return (
    <button onClick = {clickHandler}>
      {text}
    </button>
  )
}





const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  console.log(votes)
  
  const vote = () => {
    const copy = [...votes]
    const s = selected
    copy[s] = copy[s] + 1
    setVotes(copy)
  }

  return (
    <div> 
      <h1>Anecdote of the day</h1>
      <h3>{props.anecdotes[selected]}</h3>
      <h4>Has {votes[selected]} votes</h4>
      <Button text = 'next anecdote' clickHandler = {() => setSelected(Math.floor(Math.random() * anecdotes.length) )}/>
      <Button text = 'vote' clickHandler = {vote}/>
      <h1>Anecdote with most votes</h1>
      <h3>{anecdotes[votes.indexOf(Math.max(...votes))]}</h3>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
    document.getElementById('root')
  
)