require('dotenv').config()
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')
const { PubSub } = require('graphql-subscriptions')


const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const pubsub = new PubSub()

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root,args) => {
      if (args.genre) {
        return await Book.find({genres: args.genre})
      }

      return await Book.find({})
    },
    allAuthors: async (root, args) => {
      return await Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Author: {
    bookCount: async (root) => {
      return (await Book.find({author: root.id})).length}
  },

  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          }
        })
      }

      let author = await Author.findOne({ name: args.author })

      if (!author) {
        author = new Author({
          name: args.author,
          born: null
        })

        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError(`Saving author failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args,
              error: error.message
            }
          })
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author: author._id,
        genres: args.genres || [],
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError(`Saving book failed: ${error.message}`, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error: error.message
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
  
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
          }
        })
      }

      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }

      author.born = args.setBornTo

      await author.save()

      return author
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return await user.save()
        .catch(error => {
          throw new GraphQLError(`Creating the user failed: ${error.message}`, {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('Login failed', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return {value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    },
    _resetDatabase: async () => {
      if (process.env.NODE_ENV !== 'test') {
        throw new GraphQLError('_resetDatabase is only available in test mode')
      }
      await Author.deleteMany({})
      await Book.deleteMany({})
      await User.deleteMany({})
      return true
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
}





const emptyDb = async () => {
  await Book.deleteMany({})
  await Author.deleteMany({})
  await User.deleteMany({})

  console.log('database cleared')
}

const recreateDatabase = async () => {

  await emptyDb()

  const martin = new Author({
    name: 'Robert Martin',
    born: 1900,
    bookCount: 0,
  })

  const timber = new Author({
    name: 'Timber Lui',
    born: 1800,
    bookCount: 0,
  })

  await martin.save()
  await timber.save()

  await Book.create({
    title: 'Clean Code',
    author: martin._id,
    published: 1920,
    genres: ['coding']
  })

  await Book.create({
    title: 'Little mistake',
    author: timber._id,
    published: 1850,
    genres: ['fantasy']
  })

  const user = new User({ username: 'Admin', favoriteGenre: 'fantasy'})

  await user.save()

  console.log('database recreated')
}

// recreateDatabase()

module.exports = resolvers