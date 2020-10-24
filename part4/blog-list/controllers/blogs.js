const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('comments', {
    date: 1,
    id: 1,
    comment: 1,
  })

  if (blog.comments) {
    response.json(blog.comments)
  } else {
    response.status(404).end()
  }
})

blogsRouter.get('/:id/comments/:commentid', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = await blog.comments.find(
    comment => comment.id === request.params.commentid
  )
  if (comment) {
    response.json(comment)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('req body',body)
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user,
    comments: body.comments || [],
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  console.log('request body', typeof request.body.comments.date)
  const blogId = request.params.id
  const comment = request.body.comments
  try {
    const blogObject = await Blog.findById(blogId)
    blogObject.comments.push(comment)
    const savedBlog = await blogObject.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const blogToRemove = await Blog.findById(request.params.id)
  const removeFromUser = user.blogs.filter(
    blog => blog.toString() !== request.params.id
  )
  if (blogToRemove === null) {
    if (user._id.toString() === blogToRemove.user.toString()) {
      response.json('unauthorized user')
    } else {
      user.blogs = removeFromUser
      await user.save()
      response.status(204).end()
      return
    }
  }
  if (user._id.toString() === blogToRemove.user.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = removeFromUser
    await user.save()
  } else {
    response.json('unauthorized user')
  }
  response.status(204).end()
})

blogsRouter.patch('/:id', async (request, response) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).send('content missing').end()
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true }
  )

  response.json(updatedBlog)
})

module.exports = blogsRouter
