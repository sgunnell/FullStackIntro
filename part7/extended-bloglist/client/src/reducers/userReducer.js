import { createSlice } from "@reduxjs/toolkit"
import userService from "../services/users"

const userSlice = createSlice({
  name: "user",
  initialState: [],
  reducers:{
    setUsers(state,action){
      return action.payload
    },
  }
})

const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    console.log("logging initialize users in redux:",users)
    dispatch(setUsers(users))
  }
}

export default userSlice.reducer