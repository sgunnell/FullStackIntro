import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import { useApolloClient  } from '@apollo/client'
import Recommend from './components/Recommend'


const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <span>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage("login")}>login</button>
        )}
        
      </div>

      <Notify message={errorMessage} />
      <Authors show={page === 'authors'} setError={notify} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} setError={notify} />
      <LoginForm show={page === "login"} setToken={setToken} setError={notify} setPage={setPage} />
      <Recommend show={page === "recommend"} />
    </div>
  )
}

export default App
