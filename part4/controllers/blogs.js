const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')




blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username:1, name:1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  try{
    const blog = await Blog.findById(req.params.id)
    if (blog){
      res.json(blog.toJSON())
    } else{
      res.status(404).end()
    }
  } catch(exception){
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  
  const token = request.token

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  
  const user = await User.findById(decodedToken.id)

  const blog = await new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  }).populate('user', {username:1,name:1})
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
  
})

blogsRouter.delete('/:id', async (request, response)=> {
  const { id } = request.params

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  
  const blog = await Blog.findById(id)
  const user = await User.findById(decodedToken.id)


  if (blog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: id })
    response.sendStatus(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized operation' })
  }

})

blogsRouter.put('/:id', async (req, res) => {
  const {body} = req
  const { id } = req.params
  
  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id,blog, {new: true}).populate('user',{ username:1, name:1})

  if (updatedBlog) {
    res.status(200).json(updatedBlog.toJSON())
  } else{
    res.status(404).end()
  }

})

module.exports = blogsRouter