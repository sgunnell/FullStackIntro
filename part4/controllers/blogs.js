const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog
    .find({})
    .then(blogs => {
      res.json(blogs)
    })
})

blogsRouter.post('/', (req, res, next) => {
  const { title,author,url,likes} = req.body

  const blog = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  })

  blog
    .save()
    .then(result => {
      res.status(201).json(result.toJSON())
    })
    .catch(error=> next(error))
})

module.exports = blogsRouter