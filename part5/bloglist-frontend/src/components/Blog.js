import { useState } from "react"



const Blog = ({blog, updateLike, username}) => {
  const [visible, setVisible] = useState(false)
  
  const toggleVisibility = () => {
    setVisible(!visible);
  }
  const handleLike = () => {
    console.log("adding a like")
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    updateLike(blog.id,blogToUpdate)
  }

  const handleDelete = () => {
    console.log("deleting a post")
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }

    
  }

  return (
    <div className="blog">
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button>
      </div>
      {visible && (
        <div className="blog-details">
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button id="like-btn" onClick={handleLike}>
              like
            </button>{" "}
          </div>
          <div>{blog.user.username}</div>
          {blog.user.username === username && (
            <button id="delete-btn" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog
