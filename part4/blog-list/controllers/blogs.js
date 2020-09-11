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

blogsRouter.post('/', async (request, response) => {
  const body = request.body
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
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
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

blogsRouter.put('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes + 1,
    user: user,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

/* blogsRouter.patch('/:id', async (request, response) => {
  if (Object.keys(request.body).length === 0) {
    return response.status(400).send('content missing').end()
  }

  let blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  console.log('blog', blog)

  blog = blog.toObject()
  Object.keys(blog).forEach(key => {
    let value = request.body[key]
    if (value) {
      blog[key] = value
    }
  })

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })
  console.log('updatedBlog', updatedBlog)
  response.json(updatedBlog)
}) */

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
