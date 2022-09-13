import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm  from './components/BlogForm'


import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    };
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {  
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user)) 
      blogService.setToken(user.token)
      setUser(user)
    
      setMessage({text: 'Successfully Logged In', type: 'notification'})
      console.log("successfully logged in")
    } catch (err) {
      setMessage({text: 'Invalid Credentials', type: 'error'})
      console.log("error logging in")
    }
  } 

  const handleLogout = () => {
    window.localStorage.clear();
    setMessage({text: 'Successfully Logged Out', type: 'notification'})
    setUser(null);
  }

  const createBlog = async (title, author, url) => {
    try{
      if (!title || !author || !url){
        setMessage({text: 'Please fill in all fields', type: 'error'})
        console.log('fill in all fields')
        return
      }
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      setMessage({text: `A new blog ${title} by ${author} added`, type: 'notification'})
      console.log("Successfully added new blog")
    }catch(exception){
      setMessage({text: 'Error Adding Blog', type: 'error'})
      console.log("adding blog failed")
    }
  }

  return (
    <div>
      {user === null ? <h2> log in to application</h2> : <h2> blogs</h2>}
      <Notification message={message} />
      {user === null ?
        <LoginForm handleLogin={handleLogin}/> :
        <div>
          
          <span>{user.name}</span> logged in{" "}
            <button  onClick={handleLogout}>
              logout
            </button>
          
          <BlogForm createBlog={createBlog}/>
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                username={user.username}
              />
            ))
          }
        </div>
      }
    </div>
  )
}

export default App
