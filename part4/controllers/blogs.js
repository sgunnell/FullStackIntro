const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/', async (req, res, next) => {
  const { title,author,url,likes} = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  })
  
  try{
    const savedBlog = await blog.save()
    res.status(201).json(savedBlog)
  } catch(exception){
    next(exception)
  }
})

module.exports = blogsRouter