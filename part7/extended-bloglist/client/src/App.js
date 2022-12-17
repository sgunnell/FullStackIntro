import { useState, useEffect, useRef } from "react"

import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm  from "./components/BlogForm"
import Togglable from "./components/Togglable"


import blogService from "./services/blogs"

import { login, logout } from "./reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"

import userService from "./services/users"

const App = () => {
  const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

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
    const userInStorage = userService.getUser()
    if (userInStorage) {
      dispatch(login(userInStorage))
    }
  }, [])


  const handleLogout = () => {
    window.localStorage.clear()
    setMessage({ text: "Successfully Logged Out", type: "notification" })
    dispatch(logout(null))
  }

  return (
    <div>
      <h1 className="header-title">Blogs</h1>
      <Notification/>
      {user === null ?
        (
          <LoginForm/>
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
