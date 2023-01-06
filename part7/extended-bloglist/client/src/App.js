import { useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Container } from "@mui/material"

import BlogList from "./components/BlogList"
import Blog from "./components/Blog"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import NavBar from  "./components/NavBar"
import Users from "./components/Users"
import User from "./components/User"

import { login } from "./reducers/loginReducer"
import { initializeUsers } from "./reducers/userReducer"
import { initializeBlogs } from "./reducers/blogReducer"

import userService from "./services/users"

const App = () => {
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


  if (user === null ){
    return(
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <NavBar username ={user.name}/>
      <Notification/>
      <Routes>
        <Route path="/" element={<BlogList/>}/>
        <Route path="/blogs/:id" element={<Blog/>}/>
        <Route path="/users" element={<Users/>} />
        <Route path="/users/:id" element={<User />}/>
      </Routes>
    </Container>
  )
}

export default App
