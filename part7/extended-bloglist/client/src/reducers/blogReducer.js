import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name: "blog",
    initialState: [],
    reducers:{
        appendBlog(state, action){
            state.push(action.payload)
        }
    }
})

const { appendBlog } = blogSlice.actions


export const createBlog = (blog)=> {
    return async (dispatch)
    try{
      if (!title || !author || !url){
        setMessage({ text: "Please fill in all fields", type: "error" })
        console.log("fill in all fields")
        return
      }
      const blog = await blogService.create({
        title,
        author,
        url,
      })
      setBlogs(blogs.concat(blog))
      setMessage({ text: `A new blog ${title} by ${author} added`, type: "notification" })
      console.log("Successfully added new blog")
    }catch(exception){
      setMessage({ text: "Error Adding Blog", type: "error" })
      console.log("adding blog failed")
    }
  }