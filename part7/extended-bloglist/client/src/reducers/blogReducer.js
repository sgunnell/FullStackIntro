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
    setBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updateBlog = action.payload
      const { id } = updateBlog
      return state.map((blog) =>
        blog.id !== id ? blog : updateBlog)
    },
    removeBlog(state, action){
      return state.filter((blog) => blog.id !==action.payload )
    },
  }
})

export const { appendBlog, setBlogs, removeBlog, updateBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    console.log("Blogs in initialize blogs:", blogs)
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    try{
      const newBlog = await blogService.create(blog)
      dispatch(appendBlog(newBlog))
      dispatch(createNotification(
        {
          message: `A new blog ${blog.title} by ${blog.author} added`,
          type: "success",
        },
        5
      ))
    }catch(error){
      dispatch(createNotification(
        { message: error.response.data.error, type: "error" },5
      ))
      console.log("adding blog failed")
    }
  }
}

export const likeBlog = (id, blog) => {
  return async (dispatch) => {
    try{
      const likedBlog = await blogService.addLike(id, blog)
      dispatch(updateBlog(likedBlog))
      dispatch(createNotification(
        {
          message: `${blog.title} by ${blog.author} liked`,
          type: "success",
        },
        5
      ))
    }catch(error){
      dispatch(createNotification(
        { message: error.response.data.error, type: "error" },5
      ))
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
      dispatch(createNotification(
        {
          message: `${blog.title} by ${blog.author} removed`,
          type: "success",
        },
        5
      ))
    }catch(error){
      dispatch(createNotification(
        { message: error.response.data.error, type: "error" },5
      ))
      console.log("removing blog failed")
    }
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    try{
      console.log("testing comment parameters: ", { comment })
      const commentedBlog = await blogService.addComment(id, comment)
      console.log("testing comment parameters: ", { commentedBlog })
      dispatch(updateBlog(commentedBlog))
      dispatch(createNotification(
        {
          message: `Comment ${comment} added to ${commentedBlog.title}`,
          type: "success",
        },
        5
      ))
    }catch(error){
      dispatch(createNotification(
        { message: error.response.data.error, type: "error" },5
      ))
    }
  }
}

export default blogSlice.reducer