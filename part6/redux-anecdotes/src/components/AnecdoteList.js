
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { orderBy } from "lodash"
import { createNotification } from '../reducers/notificationReducer'

/*const Anecdote = ({ anecdote, handleClick }) =>{
    return(
        <ul key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </ul>
    )
}*/



const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector((state) =>
    state.filter
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
        )
      : state.anecdotes
  )
    
    const handleVote = (anecdote) => {
        dispatch(voteAnecdote(anecdote.id));
        dispatch(createNotification(`You voted '${anecdote.content}'`, 5));
      }
    
    const sortedAnecdotes = orderBy(anecdotes, ["votes"], ["desc"])
    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map(anecdote =>
            
            <ul key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
        </ul>
            )}
        </div>
    )
   
}

export default AnecdoteList