import { createSlice } from "@reduxjs/toolkit"
import { createNotification } from "./notificationReducer"

import userService from "../services/users"
import loginService from "../services/login"

const loginSlice = createSlice({
  name: "login",
  initialState: null,
  reducers: {
    login(state, action){
      return action.payload
    },
    logout(state, action){
      return action.payload
    }
  }
})

export const { login, logout } = loginSlice.actions

export const logUserIn = (credentials) => {
  return async dispatch => {
    const { username, password } = credentials
    try{
      const user = await loginService.login({ username, password })
      userService.setUser(user)
      dispatch(login(user))
      dispatch(
        createNotification(
          `Welcome ${user.name}!`, 5
        )
      )
    }catch(error){
      dispatch(
        createNotification(
          error.response.data.error , 5
        )
      )
      console.log("login failed")
    }
  }
}
export const logUserOut = () => {
  return async (dispatch) => {
    userService.clearUser()
    dispatch(logout(null))
  }
}

export default loginSlice.reducer