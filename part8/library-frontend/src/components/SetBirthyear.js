import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthyear = ( {names, setError} ) =>{
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ {query: ALL_AUTHORS} ],
        onError: (error) => {
            console.log("error with EditAuthor QL Error:", error.graphQLErrors[0].message)
            console.log("error with EditAuthor:", error.message)
            error.graphQLErrors > 0
              ? setError(error.graphQLErrors[0].message)
              : setError(error.message)
        }
    })

    const submit = async (event) => {
        event.preventDefault()
        editAuthor({ variables: {name, setBornTo: parseInt(born) } })
        setBorn("")
        setName("")
    }

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
          setError("Author not found");
        }
      }, [result.data]); // eslint-disable-line

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