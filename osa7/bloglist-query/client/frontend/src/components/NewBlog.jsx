import blogService from "../services/blogs";
import { useField } from "../hooks/customQuery"
import styles from "../styles/default"

const CreateNewBlog = ({ formsRef, handleNewBlog }) => {
  const { reset: resetTitle, ...title } = useField('title')
  const { reset: resetAuthor, ...author } = useField('author')
  const { reset: resetUrl, ...url } = useField('url')

  const cleanFields = () => {
    resetTitle,
    resetAuthor,
    resetUrl
  }

  const newBlog = async (event) => {
    event.preventDefault()

    handleNewBlog(formsRef, title, author, url)
    cleanFields()
  };

  return (
    <div>
      <h2>Create new</h2>
      <form>
        <label>
          Title:
          <input {...title} />
        </label>
        <br />
        <label>
          Author:
          <input {...author} />
        </label>
        <br />
        <label>
          Url:
          <input {...url} />
        </label>
        <br />
        <button onClick={newBlog} id="create-blog-btn" style={styles.lightBtn}>
          create
        </button>
      </form>
    </div>
  );
};

export default CreateNewBlog;
