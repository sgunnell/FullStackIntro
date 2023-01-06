import { useDispatch } from "react-redux"
import { useField } from "../hooks/index"
import { createComment } from "../reducers/blogReducer"
import validator from "validator"
import { Button, Grid, TextField } from "@mui/material"


const Comments = ( { blog } ) => {

  const dispatch = useDispatch()
  const { reset: resetComment, ...comment } = useField("text")

  const validate = (inputText) => {
    console.log(validator.trim(inputText))
    return validator.trim(inputText)
  }


  const { id, comments } = blog

  const handleAddComment = (event) => {
    event.preventDefault()

    if(!(validate(comment.value))) return

    dispatch(createComment(id, validate(comment.value)))
    resetComment()
  }

  return (
    <div className="comments">
      <h3> comments </h3>
      <form onSubmit={handleAddComment}>
        <Grid container>
          <Grid item>
            <TextField label="write a comment" size="small" {...comment} />
          </Grid>
          <Grid item alignItems="stretch" style={{ display: "flex" }}>
            <Button variant="contained" color="primary" type="submit">
              add comment
            </Button>
          </Grid>
        </Grid>
      </form>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment, i) => (
            <li key={i}>{comment}</li>
          ))}
        </ul>
      ) : (
        <p>no comments yet...</p>
      )}
    </div>
  )
}

export default Comments
