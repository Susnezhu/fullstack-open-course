import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS } from '../../queries'
import { useState } from 'react'

const Books = (props) => {
  const [genre, setGenre] = useState('')

  const books = useQuery(ALL_BOOKS, {
    variables: genre ? { genre } : undefined
  })

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <p>loading...</p>
  }


  const allGenres = [...new Set(books.data.all.map(book => book.genres).flat()) ]

  return (
    <div>
      <h2>books</h2>

      <p>in genre: <strong>{genre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {(genre ? books.data.filtered : books.data.all)?.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    {allGenres.map((g) => (
      <button key={g} onClick={ () => setGenre(g)}>{g}</button>
    ))}
    <button key={'allgenres'} onClick={() => setGenre('')}>all genres</button>
    </div>
  )
}

export default Books
