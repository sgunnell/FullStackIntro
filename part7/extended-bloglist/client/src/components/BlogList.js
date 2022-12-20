import { orderBy } from "lodash"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material"


const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log("Bloglist accessing blogs from redux:",blogs)
  const sortedBlogs = orderBy(blogs, ["likes"], ["desc"])

  return (
    <div className="blogs">
      <h2> Blogs</h2>

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
