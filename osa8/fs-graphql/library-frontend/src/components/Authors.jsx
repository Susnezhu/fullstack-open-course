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

  const submitChanges = async (event) => {
    event.preventDefault()

    if (!selected) {
      return null
    }

    try {
      await editAuthor({ 
        variables: { name: selected, setBornTo: Number(birthYear) },
        context: {
          headers: {
            authorization: `Bearer ${props.token}`
          }
        }
      })
    } catch (error) {
      console.log(error)
      props.handleFail(error.message)
    }

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
              {props.token ? (
                <td><button onClick={() => setSelected(a.name)}>select</button>{a.name}</td>
              ) : (
                <td>{a.name}</td>
              )}
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {props.token ? (
      <div>
        <h3>Set birthyear</h3>

        <div>
          <select 
            name="name" 
            value={selected}
            onChange={e => setSelected(e.target.value)}
          >
          <option disabled value="" key={"disabled"}>
            Select author
          </option>

          {authors.data.allAuthors.map((a) => (
              <option value={a.name} key={a.id}>{a.name}</option>
          ))}
          </select>
        </div>


        

        <form onSubmit={submitChanges}>
          <div>
            <label htmlFor="born">born</label>
            <input
              id="born"
              type="number"
              value={birthYear}
              onChange={({ target }) => setBirthYear(target.value)}
            />
          </div>
          
          <button type="submit">update author</button>
        </form>
      </div>
      ): (
        <p>Log in to be able make changes</p>
      )}
    </div>
  )
}

export default Authors
