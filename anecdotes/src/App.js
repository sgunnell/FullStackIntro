import logo from './logo.svg';
import './App.css';

import { useState } from 'react'


const Title = ({ element = "h2", title }) => {
  const Element = element;
  return <Element>{title}</Element>;
};


const Button = ({onClick,text}) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const DisplayVotes = ({index,votes})=>{
  return(
    <div>
    {` has ${votes[index]} votes`}
    </div>
  )
}

const MostVotesIdx = (votes) =>{
  const anecdote = votes.indexOf(Math.max(...votes));
  return(
    <div> anecdote</div>
  )

}

const MostVotes = ({votes})=>{
  const numMostVotes = Math.max(...votes)
  const idxMostVotes = votes.indexOf(numMostVotes)
  if (numMostVotes===0){
    return(
      <div> no votes yet</div>
    )
  }
  return(
    <div>
      <p> {anecdotes[idxMostVotes]}</p>
      <p> has {numMostVotes} votes </p>
    </div>
  )

}


const App = () => {
  

  //generate random idx
  const getRandomIdx = () => {
    return Math.floor(Math.random() * 6)
  };
  //get next new index for anecdote 
  const nextAnecdote = () => {
    let index;

    do{
      index = getRandomIdx()
    }while(index ===selected)
    setSelected(index)
  }
  
  const updateVote = () =>{
    const newVotes = [...votes];
    newVotes[selected]+=1;
    setVotes(newVotes);

  }

  const initialVotes = Array(7).fill(0);
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)
  

  return (
    <div className="App">
      <Title title = "Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <Button onClick = {updateVote} text = 'vote'/>
      <Button  onClick = {nextAnecdote} text = 'next anecdote'/>
      <DisplayVotes index = {selected} votes = {votes}/>

      <MostVotes votes = {votes}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]

export default App
