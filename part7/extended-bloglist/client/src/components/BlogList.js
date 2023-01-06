import { useRef } from "react"
import { orderBy } from "lodash"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Togglable from "./Togglable"
import BlogForm  from "./BlogForm"


import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"


const BlogList = () => {
  const blogFormRef = useRef()
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

  return (
    <div className="blogs">
      <h2> Blogs</h2>
      <Togglable buttonLabel = 'add blog' ref = {blogFormRef}>
        <BlogForm togglableRef={blogFormRef}/>
      </Togglable>

      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {sortedBlogs.map(blog => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} - {blog.author}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList
