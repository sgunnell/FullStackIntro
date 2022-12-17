import { useField } from "../hooks/index"
//import loginService from "../services/login"

//import { createNotification } from "../reducers/notificationReducer"
import { logUserIn } from "../reducers/loginReducer"
import { useDispatch } from "react-redux"

//import userService from "../services/users"


const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField("text")
  const { reset: resetPassword, ...password } = useField("password")

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = { username: username.value, password: password.value }
    dispatch(logUserIn(credentials))
    console.log("successfully logged in")
    resetUsername()
    resetPassword()
  }

  return(
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}



export default LoginForm