import { useQuery } from '@apollo/client/react'
import { ALL_BOOKS, ME } from '../../queries'

const Recommend = (props) => {
  const me = useQuery(ME)

  const favoriteGenre = me.data?.me?.favoriteGenre

  const books = useQuery(ALL_BOOKS, {
    variables: {
      genre: favoriteGenre || null 
    }
  })

  if (!props.show) {
    return null
  }

  if (books.loading || me.loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h2>recommendations</h2>

      <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '5px'}}>
        <p>books in your favorite genre: </p>
        <strong>{favoriteGenre}</strong>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.data.filtered
          .map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend