const bcrypt = require('bcrypt')

//just for testing!
const getTestUsers = async () => {
  const passwordHash1 = await bcrypt.hash('1234', 10)
  const passwordHash2 = await bcrypt.hash('1234', 10)
  const passwordHash3 = await bcrypt.hash('1234', 10)

  return [
    {
      username: 'user1',
      name: 'Test User One',
      passwordHash: passwordHash1
    },
    {
      username: 'user2',
      name: 'Test User Two',
      passwordHash: passwordHash2
    },
    {
      username: 'user3',
      name: 'Test User Three',
      passwordHash: passwordHash3
    }
  ]
}

module.exports = { getTestUsers }
