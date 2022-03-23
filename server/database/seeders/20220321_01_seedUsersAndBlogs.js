const bcrypt = require('bcrypt')
const { DEFAULT_PASS } = require('../../utils/config')

const dateNow = new Date()

const createdAndUpdatedAt = {
  created_at: dateNow,
  updated_at: dateNow
}

const usersGenerator = async () => {
  const names = ['admin', 'root', 'defaultUser', 'testUser']
  const usersToFeed = []
  for (const name of names) {
    const hash = await bcrypt.hash(DEFAULT_PASS, 10)
    const u = {
      username: name,
      name: name,
      password_hash: hash,
      ...createdAndUpdatedAt
    }
    usersToFeed.push(u)
  }
  return usersToFeed
}

const blogBaseObject = {
  user_id: 3,
  url: 'https://fullstackopen.com',
  ...createdAndUpdatedAt
}

const blogs = [
  {
    title: 'Miksi minusta tuli niin komea',
    author: 'Fre Derik',
    likes: 12,
    ...blogBaseObject
  },
  {
    title: 'Love and Laces in literature',
    author: 'Ada Lovelace',
    likes: 4,
    ...blogBaseObject
  },
  {
    title: 'Why dont people believe I am a human?',
    author: 'NotATuring Machine',
    likes: 7,
    ...blogBaseObject
  },
  {
    title: 'Why not hee hee your whole life?',
    author: 'Michael Jackson',
    likes: 0,
    ...blogBaseObject
  }
]

module.exports = {
  up: async ({ context: sequelize }) => {
    const users = await usersGenerator()
    await sequelize.getQueryInterface().bulkInsert('users', users)
    await sequelize.getQueryInterface().bulkInsert('blogs', blogs)
  },

  down: async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('users', { id:  [1,2,3,4] })
    await sequelize.getQueryInterface().bulkDelete('blogs', { id: blogs.map((b,i) => i+1 })
  }
}