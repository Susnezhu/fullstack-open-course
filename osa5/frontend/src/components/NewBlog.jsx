import { useState } from 'react'
import blogService from '../services/blogs'

const CreateNewBlog = ({ showMessage, getAllBlogFunc, formsRef }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = async (event) => {
    event.preventDefault()

    formsRef.current.toggleVisibility() // piilottaa kentän blogin lisämiseen

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    setTitle('')
    setAuthor('')
    setUrl('')

    try {
      const response = await blogService.createNewBlog(newBlog) //lisää blogin

      if (response) {
        showMessage(`A new blog "${title}" by "${author}" added`, 'green')
      }

      // Hakee kaikki blogit uudestan
      getAllBlogFunc()

    } catch (error) {
      console.log('adding new blog error: ', error)
      showMessage('Adding new blog went wrong', 'red')
    }

  }

  return (
    <div>
      <h2>Create new</h2>
      <form>
        <label>
          Title:
          <input type="text" value={title} onChange={(({ target }) => setTitle(target.value))} ></input>
        </label>
        <br/>
        <label>
          Author:
          <input type="text" value={author} onChange={(({ target }) => setAuthor(target.value))} ></input>
        </label>
        <br/>
        <label>
          Url:
          <input type="text" value={url} onChange={(({ target }) => setUrl(target.value))} ></input>
        </label>
        <br/>
        <button onClick={handleNewBlog} id="create-blog-btn">create</button>
      </form>
    </div>
  )
}

export default CreateNewBlog