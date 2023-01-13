const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const { UserInputError, } = require("apollo-server")
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

const config = require('./utils/config')



mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })



/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = []

const typeDefs = gql`

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }


  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation { 
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allAuthors: async () => {
      books = await Book.find()
      return Author.find({})
    },
    allBooks: async (root, args) => {
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        return Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author")
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        return Book.find({ author: { $in: author.id } }).populate("author")
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate("author")
      }

      return Book.find({}).populate("author");
    },
    
  },
  Author: {
    bookCount: async (root) => {
      return books.filter((b) => String(b.author) === String(root.id)).length
    },
  },

  Mutation : {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({ name: args.author})

        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, { invalidArgs: args })
        }
      }

      const book = new Book({ ...args, author })

      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args });
      }

      console.log("book added")

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      author.set
    }
  }
  
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})