import { useState } from "react"
import { useDispatch } from "react-redux"
//import { useNavigate } from "react-router-dom"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, username }) => {
  const dispatch = useDispatch()
  //const navigate = useNavigate()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    const { id } = blog
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(id, blogToUpdate))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log(blog)
      dispatch(deleteBlog(blog))
      //navigate("/")
    }
  }

  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "view"}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            <span data-cy="likes">
              Likes: {blog.likes}
            </span>
            <button id="like-btn" onClick={handleLike}>
              like
            </button>{" "}
          </div>
          <div>{blog.user.username}</div>
          {blog.user.username === username && (
            <button id="delete-btn" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
