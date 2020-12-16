import React, { useState, usestate } from 'react';
import ReactDOM from 'react-dom';


const Heading = ({text}) => {
    return (
      <div>
        <h1>{text}</h1>
      </div>
    )
}

const Button = ({handleClick, text}) => {
  return ( 
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tr> 
      {text} {value}
    </tr>
  )
}

const Statistics = (props) =>  {
  let good = props.good
  let neutral = props.neutral
  let bad = props.bad
  let all = good + neutral + bad
  let average  = (good - bad)/all
  let positive = (good/all) * 100 + '%'
  if (all > 0) {
  return (
   <div>
    <table>
      <Statistic text = 'good' value = {good}/>
      <Statistic text = 'neutral' value = {neutral}/>
      <Statistic text = 'bad' value = {bad}/>
      <Statistic text = 'all' value = {all}/>
      <Statistic text = 'average' value = {average}/>
      <Statistic text = 'positive' value = {positive}/>
    </table>
   </div>
  )
  }
  return (
    <div>
      No feedback given
    </div>
  )
}



const App = () => {
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  


  return (
    <div>
      <Heading text = 'Give Feedback' />
      <Button handleClick = {() => setGood(good + 1)} text = 'Good'/>
      <Button handleClick = {() => setNeutral(neutral+ 1)} text = 'Neutral'/>
      <Button handleClick = {() => setBad(bad + 1)} text = 'Bad'/>
      <Heading text = 'Statistics' />
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>

  )
}

ReactDOM.render(<App/>, document.getElementById('root'))
