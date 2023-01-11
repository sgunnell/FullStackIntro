import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ( {names, setError} ) =>{
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ {query: ALL_AUTHORS} ],
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        }
    })

    const submit = async (event) => {
        event.preventDefault()
    
        console.log('updating author...')
        editAuthor({ variables: {name, setBornTo: Number(born) }})
    
        setBorn('')
        setName('')
      }

    return(
        <div>
            <h2>Set birthyear</h2>
            <form onSubmit={submit}>
                <div>
                <select value={name} onChange={({ target }) => setName(target.value)}>
                    {names.map((name, i) => (
                        <option key={i} value={name}>
                            {name}
                        </option>
                    ))}
                </select>
                </div>
                <div>
                born
                <input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    )
}

export default SetBirthyear