const bcrypt = require('bcrypt')
const { DEFAULT_PASS } = require('../../utils/config')

const dateNow = new Date()

const createdAndUpdatedAt = {
  created_at: dateNow,
  updated_at: dateNow
}

const usersGenerator = async () => {
  const names = ['admin', 'root', 'defaultUser', 'testUser', 'disabledUser']
  const usersToFeed = []
  const hash = await bcrypt.hash(DEFAULT_PASS, 10)
  for (const name of names) {
    const u = {
      username: name,
      name: name,
      password_hash: hash,
      ...createdAndUpdatedAt
    }
    usersToFeed.push(u)
  }
  usersToFeed[usersToFeed.length-1].disabled = true
  usersToFeed[0].admin = true
  return usersToFeed
}

const blogBaseObject = {
  user_id: 3,
  ...createdAndUpdatedAt
}

const blogs = [
  {
    title: 'Miksi minusta tuli niin komea',
    author: 'Fre Derik',
    url: 'https://fullstackopen.com/1',
    ...blogBaseObject
  },
  {
    title: 'Love and Laces in literature',
    author: 'Ada Lovelace',
    url: 'https://fullstackopen.com/2',
    ...blogBaseObject
  },
  {
    title: 'Why dont people believe I am a human?',
    author: 'NotATuring Machine',
    url: 'https://fullstackopen.com/3',
    ...blogBaseObject
  },
  {
    title: 'Why not hee hee your whole life?',
    author: 'Michael Jackson',
    url: 'https://fullstackopen.com/4',
    ...blogBaseObject
  }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    const users = await usersGenerator()
    await queryInterface.bulkInsert('users', users)
    await queryInterface.bulkInsert('blogs', blogs)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('blogs', { id: [1,2,3,4] })
    await queryInterface.bulkDelete('users', { id:  [1,2,3,4, 5] })
  }
}