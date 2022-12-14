import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { useField } from "../hooks/index"

const BlogForm = ({ togglableRef }) => {
  const dispatch = useDispatch()
  const { reset: resetTitle, ...title } = useField("text")
  const { reset: resetAuthor, ...author } = useField("text")
  const { reset: resetUrl, ...url } = useField("text")



  const handleCreateBlog = (event) => {
    event.preventDefault()
    togglableRef.current.toggleVisibility()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value,
    }

    dispatch(createBlog(newBlog))
    dispatch(createNotification(`created new blog: ${newBlog.title}`, 5))
  }


  const handleReset = (e) => {
    e.preventDefault()
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form>
        <div>
            title
          <input {...title} />
        </div>
        <div>
            author
          <input {...author} />
        </div>
        <div>
            url for more info
          <input {...url} />
        </div>
        <button onClick={handleCreateBlog}>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )
}

export default BlogForm