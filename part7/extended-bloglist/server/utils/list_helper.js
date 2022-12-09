const lodash = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0 
    ? 0
    : blogs.reduce((sum,blog) => sum +blog.likes,0)

}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const mostLiked = blogs.reduce((prev,curr) =>{
    return prev.likes > curr.likes ? prev : curr
  })

  return {
    title: mostLiked.title,
    author: mostLiked.author,
    likes: mostLiked.likes,
  }
}
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = lodash.countBy(blogs, 'author')

  const mostAuthored = Object.keys(authorCount).reduce((most,curr)=>{
    return authorCount[most] > authorCount[curr] ? most : curr
  })

  return {
    author: mostAuthored,
    blogs: authorCount[mostAuthored]
  }

}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  
  const authorLikes = lodash(blogs).groupBy('author').map((objs,key) =>({
    author:key,
    likes: lodash.sumBy(objs,'likes')
  })).value()

  
  return authorLikes.reduce((a,b)=>{
    return a.likes > b.likes ? a : b
  })

  
  
  

}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}