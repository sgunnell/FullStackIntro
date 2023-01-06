import { useDispatch, useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { deleteBlog, likeBlog } from "../reducers/blogReducer"

import Comments from "./Comments"

const Blog = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.login)

  if (!blog) return null

  const handleLike = () => {
    const { id } = blog
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(likeBlog(id, blogToUpdate))
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog))
      navigate("/")
    }
  }

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} -{blog.author}
        </h2>

        <div className="blog-details">
          <a href={blog.url}> {blog.url} </a>
        </div>
        <div className="blog-details">
          <div>
            <span data-cy="likes">
              {blog.likes} likes
            </span>
            <button id="like-btn" onClick={handleLike}>
              like
            </button>{" "}
          </div>
          <div>added by {blog.user.username}</div>
          {blog.user.username === user.username && (
            <button id="delete-btn" onClick={handleDelete}>
              delete
            </button>
          )}
          <Comments blog={blog}/>
        </div>
      </div>
    </div>
  )
}

export default Blog
