import { useDispatch } from "react-redux"
import { createBlog } from "../reducers/blogReducer"
import { createNotification } from "../reducers/notificationReducer"
import { useField } from "../hooks/index"
import { TextField, Button } from "@mui/material"

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
    dispatch(
      createNotification(
        {
          message: `created new blog: ${newBlog.title}`,
          type: "success",
        },
        5
      ))
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
        <Button onClick={handleCreateBlog} variant="contained" color="primary" size="small" type="submit">
          create
        </Button>
        <Button onClick={handleReset} variant="contained" color="secondary" size="small" type="submit">
          reset
        </Button>
        <div>
          <TextField label="title" {...title} />
        </div>
        <div>
          <TextField label="author" {...author} />
        </div>
        <div>
          <TextField label="url" {...url} />
        </div>


      </form>
    </div>
  )
}

export default BlogForm