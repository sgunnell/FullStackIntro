import { useField } from "../hooks/index"
import { logUserIn } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"

import { TextField, Button } from "@mui/material"

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text")
  const { reset: resetPassword, ...password } = useField("password")

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username: username.value, password: password.value }
    dispatch(logUserIn(credentials))
    resetUsername()
    resetPassword()
  }

  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" {...username} variant="filled" required margin="dense"/>
        </div>
        <div>
          <TextField label="password" {...password} variant="filled" required margin="dense"/>
        </div>
        <Button variant="contained" color="primary" type="submit">
            login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm