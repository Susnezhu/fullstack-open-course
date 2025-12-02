import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  author: 'test author',
  id: '0000000000000',
  likes: 0,
  title: 'Test Title',
  url: 'url',
  user: {
    id: '111111111111',
    name: 'user test name',
    username: 'testUsername'
  }
}

const user = {
  id: '111111111111',
  name: 'user test name',
  username: 'testUsername',
  token: 'testingToken12345678'
}

// const showMessage = (message, color) => {
//   console.log('this message:', message, 'has color:', color)
// }

test('render only title and author', async () => {

  render(<Blog blog={blog} user={user} />)

  screen.getByText('Test Title', { exact: false })
  screen.getByText('test author', { exact: false })
})

test('render url, user and likes', async () => {

  render(<Blog blog={blog} user={user} />)

  const userClicked = userEvent.setup()
  const button = screen.getByText('Test Title - test author', { exact: false })
  await userClicked.click(button)

  screen.getByText('url', { exact: false })
  screen.getByText('likes', { exact: false })
  screen.getByText('user', { exact: false })
})

// test('like button was pushed two times', async () => {

//   render(<Blog blog={blog} user={user} showMessage={showMessage}/>) //ei ole likes propsia tehdä tehtävä 5.15 ja 5.16

//   const userClicked = userEvent.setup()
//   const button = screen.getByText('Test Title - test author', { exact: false })
//   await userClicked.click(button)

//   const likeBtn = await screen.getByRole('button', { name: /send like/i, exact: false }).click()
//   userClicked.click(likeBtn)
//   await userClicked.click(button)
//   userClicked.click(likeBtn)
//   await userClicked.click(button)

//   screen.debug()

//   // screen.getByText('likes: 2', { exact: false })
// })