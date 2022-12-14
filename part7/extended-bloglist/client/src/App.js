import { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm  from "./components/BlogForm"
import Togglable from "./components/Togglable"


import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs( blogs ))
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 5000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
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
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setMessage({ text: "Successfully Logged In", type: "notification" })
      console.log("successfully logged in")
    } catch (err) {
      setMessage({ text: "Invalid Credentials", type: "error" })
      console.log("error logging in")
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setMessage({ text: "Successfully Logged Out", type: "notification" })
    setUser(null)
  }

  return (
    <div>
      <h1 className="header-title">Blogs</h1>
      <Notification/>
      {user === null ?
        (
          <LoginForm handleLogin={handleLogin} />
        )
        :
        <div>

          <span>{user.name} {" "} {user.username} </span> logged in{" "}
          <button id="logout-btn" onClick={handleLogout}>
              logout
          </button>
          <Togglable buttonLabel = 'add blog' ref = {blogFormRef}>
            <BlogForm togglableRef={blogFormRef}/>
          </Togglable>
          <div className="blogs">
            {blogs
              .sort((a,b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  username={user.username}

                  key={blog.id}
                  blog={blog}
                />
              ))}
          </div>
        </div>
      }
    </div>
  )
}

export default App
