import logo from './logo.svg';
import './App.css';
import { useState } from 'react'


const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}
const Button = ({onClick,text})=> {
  return ( 
    <button onClick = {onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({text,counter}) => {
  return (
  
    <tr>
      <td>{text}</td>
      <td> {counter}</td>
    </tr>
    

  
  )
}

const Statistics = ({good,neutral,bad}) => {
  const total = good+neutral+bad;
  if(total===0){
    return(
      <p> no feedback given</p>
    )
  }
  return(
    <div>
      <table> 
        <tbody>
          <StatisticsLine text = "good" counter = {good} />
          <StatisticsLine text = "neutral" counter = {neutral} />
          <StatisticsLine text = "bad" counter = {bad} />
          <StatisticsLine text = "total" counter = {total} />
          <StatisticsLine text = "average" counter = {(good-bad)/total} />
          <StatisticsLine text = "postive" counter = {`${(good/total)*100} %`} />
        </tbody>
      </table>
    </div>
  )
}

function App() {

  const [ goodCounter, setGoodCounter ] = useState(0)
  const [ neutralCounter, setNeutralCounter ] = useState(0)
  const [ badCounter, setBadCounter ] = useState(0)
  const [ totalCounter, setTotalCounter ] = useState(0)

  const incGood = () => setGoodCounter(goodCounter+1)
  const incNeutral = () => setNeutralCounter(neutralCounter+1)
  const incBad = () => setBadCounter(badCounter+1)
  
  const title = "give feedback"
  const subtitle = "statistics"

  return (
    <div className="App">
      <Header title = {title}/>
      <Button 
        onClick={incGood}
        text = 'good'
      />
      <Button 
        onClick={incNeutral}
        text = 'neutral'
      />
      <Button 
        onClick={incBad}
        text = 'bad'
      />
      <Header title = {subtitle}/>
      <Statistics good = {goodCounter} neutral = {neutralCounter} bad = {badCounter}/>
      
    </div>
  );
}

export default App;
