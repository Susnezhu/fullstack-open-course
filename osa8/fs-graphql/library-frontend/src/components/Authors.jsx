import { useQuery } from '@apollo/client/react'
import { useMutation } from '@apollo/client/react'
import { useState } from 'react'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../../queries'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)

  const [selected, setSelected] = useState('')
  const [birthYear, setBirthYear] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [
      { query: ALL_AUTHORS }
    ],
  })

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <p>loading...</p>
  }

  const submitChanges = (event) => {
    event.preventDefault()

    if (!selected) {
      return null
    }

    editAuthor({ variables: { name: selected, setBornTo: Number(birthYear) } })

    console.log('changes submitted', selected)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td><button onClick={() => setSelected(a.name)}>select</button>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div> {/* Maybe later I will add "hide and show" button*/}
        <h3>Change author</h3>

        <label>
          Selected author:
          <select 
            name="selectedAuthor" 
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
          <option disabled value="">
            Select author
          </option>

          {authors.data.allAuthors.map((a) => (
              <option value={a.name}>{a.name}</option>
          ))}
          </select>
        </label>


        

        <form onSubmit={submitChanges}>
          <div>
            born
            <input
              type="number"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          
          <button type="submit">Change author</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
