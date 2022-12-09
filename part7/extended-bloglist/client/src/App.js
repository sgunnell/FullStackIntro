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

  const createBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    try{
      if (!title || !author || !url){
        setMessage({ text: "Please fill in all fields", type: "error" })
        console.log("fill in all fields")
        return
      }
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      setMessage({ text: `A new blog ${title} by ${author} added`, type: "notification" })
      console.log("Successfully added new blog")
    }catch(exception){
      setMessage({ text: "Error Adding Blog", type: "error" })
      console.log("adding blog failed")
    }
  }

  const updateLikes = async (id, blogToUpdate) => {
    console.log("updating likes in app.js")
    try{
      const updatedBlog = await blogService.update(id,blogToUpdate)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(newBlogs)
    } catch( exception){
      setMessage({ text: "Error updating likes", type: "error" })
    }

  }

  const deleteBlog = async (blogId) => {
    console.log("delete blog, app.js")
    try{
      await blogService.remove(blogId)

      const updatedBlogs = blogs.filter((blog) => blog.id !==blogId)
      setBlogs(updatedBlogs)
      setMessage({ text: "Blog Removed",type: "notification" })
    } catch( exception){
      setMessage({ text: "Error updating likes", type: "error" })
    }

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
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          <div className="blogs">
            {blogs
              .sort((a,b) => b.likes - a.likes)
              .map((blog) => (
                <Blog
                  username={user.username}
                  updateLike={updateLikes}
                  deleteBlog={deleteBlog}
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
