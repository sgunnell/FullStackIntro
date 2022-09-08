const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({})
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

blogsRouter.post('/', async (req, res, next) => {
  const { title, author, url, likes, userId } = req.body

  const user = await User.findById(userId)

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
    user: user._id
  })
  
  try{
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  } catch(exception){
    next(exception)
  }
})

blogsRouter.delete('/:id', async (req, res, next)=> {
  try{
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const {body} = req
  const { id } = req.params
  
  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id,blog, {new: true})

  if (updatedBlog) {
    res.status(200).json(updatedBlog.toJSON())
  } else{
    res.status(404).end()
  }

})

module.exports = blogsRouter