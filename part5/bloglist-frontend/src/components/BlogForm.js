import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" })

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const handleCreateBlog = (event) => {
    event.preventDefault()
    try{
      createBlog(newBlog.title,newBlog.author, newBlog.url)
      setNewBlog({ title: "", author: "", url: "" })
    }catch( exception ){
      console.log("error creating blog")
    }
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
            title
          <input
            id="title"
            name="title"
            type="text"
            value={newBlog.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
            author
          <input
            id="author"
            name="author"
            type="text"
            value={newBlog.author}
            onChange={handleInputChange}
          />
        </div>
        <div>
            url
          <input
            id="url"
            name="url"
            type="text"
            value={newBlog.url}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">
            create
        </button>
      </form>
    </div>
  )
}

export default BlogForm