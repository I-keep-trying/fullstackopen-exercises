import React from 'react'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper
} from '@material-ui/core'

const BlogLink = ({ blog }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          <TableRow key={blog.id}>
            <TableCell>
              <Link blog={blog} to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>{' '}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BlogLink
