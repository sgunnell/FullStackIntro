import { createSlice } from "@reduxjs/toolkit"
import blogService from "../services/blogs"
import { createNotification } from "./notificationReducer"

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers:{
    appendBlog(state, action){
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updateBlog = action.payload
      const { id } = updateBlog
      return state.map((blog) =>
        blog.id !== id ? blog : updateBlog)
    },
    removeBlog(state, action){
      return state.filter((blog) => blog.id !==action.payload )
    }
  }
})

export const { appendBlog, removeBlog, updateBlog } = blogSlice.actions


export const createBlog = (blog) => {
  return async (dispatch) => {
    try{
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(createNotification(`A new blog ${blog.title} by ${blog.author} added`, 5))
      console.log("Successfully added new blog")
    }catch(error){
      dispatch(createNotification(error.response.data.error , 5))
      console.log("adding blog failed")
    }
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    try{
      const likedBlog = await blogService.update(id, blog)
      dispatch(updateBlog(likedBlog))
      dispatch(createNotification(`${blog.title} by ${blog.author} liked`,5))
    }catch(error){
      dispatch(createNotification(error.response.data.error , 5))
      console.log("liking blog failed")
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try{
      console.log(blog)
      await blogService.remove(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(createNotification(`${blog.title} by ${blog.author} removed`, 5))
    }catch(error){
      dispatch(createNotification(error.response.data.error , 5))
      console.log("removing blog failed")
    }
  }
}

export default blogSlice.reducer