import { useState } from "react"
import { useDispatch } from "react-redux"
import { createNotification } from "../reducers/notificationReducer"

const Blog = ({ blog, updateLike, deleteBlog, username }) => {
  const dispatch = useDispatch()
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const handleLike = () => {
    dispatch(createNotification(`Added a like: ${blog.title}`, 5))
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateLike(blog.id,blogToUpdate)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(createNotification(`Blog Deleted: ${blog.title}`, 5))
      deleteBlog(blog.id)
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
