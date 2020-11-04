import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../reducers/blogsReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])
  const blogs = useSelector((state) => {
    console.log('state',state)
    return state.blogs.blogs
  })

  return blogs.map((blog) => {
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
  })
}

export default Blogs
