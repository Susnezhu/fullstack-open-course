import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import { CREATE_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      { query: ALL_AUTHORS },
      {
        query: ALL_BOOKS,
        variables: {
          genre
        }
      }
    ],
  })


  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')

    try {
      await createBook({ 
        variables: { title, published, author, genres }, 
        context: {
          headers: {
          authorization: `Bearer ${props.token}`,
          },
        },
      })
      props.setPage('books')
      props.client.resetStore()
    } catch (error) {
      console.log(error)
      props.handleFail(error.message)
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            value={title}
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            value={author}
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <label htmlFor="published">published</label>
          <input
            type="number"
            id="published"
            value={published}
            onChange={({ target }) => setPublished(Number(target.value))}
          />
        </div>
        <div>
          <label htmlFor="genres"></label>
          <input
            id="genres"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
