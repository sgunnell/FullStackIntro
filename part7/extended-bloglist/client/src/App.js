import { useEffect, useRef } from "react"

import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm  from "./components/BlogForm"
import Togglable from "./components/Togglable"
import { Routes, Route } from "react-router-dom"

import Users from "./components/Users"
import User from "./components/User"
import { login, logout } from "./reducers/loginReducer"
import { useDispatch, useSelector } from "react-redux"
import { initializeUsers } from "./reducers/userReducer"
import { initializeBlogs } from "./reducers/blogReducer"

import { Container } from "@mui/material"

import userService from "./services/users"

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.login)

  useEffect(() => {
    const userInStorage = userService.getUser()
    if (userInStorage) {
      dispatch(login(userInStorage))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, [])


  const handleLogout = () => {
    window.localStorage.clear()
    dispatch(logout(null))
  }

  return (
    <Container>
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

            <Routes>
              <Route path="/" element={<BlogList/>}/>
              <Route path="/blogs/:id" element={<Blog/>}/>
              <Route path="/users" element={<Users/>} />
              <Route path="/users/:id" element={<User />}/>
            </Routes>
          </div>
        }
      </div>
    </Container>
  )
}

export default App
