const tags = [
  { name: 'AI' },
  { name: 'Celebrity' },
  { name: 'Gossip' },
  { name: 'Music' }
]

const taglists = [
  { tag_id: 1, blog_id: 1 },
  { tag_id: 4, blog_id: 4 },
  { tag_id: 3, blog_id: 4 },
  { tag_id: 3, blog_id: 3 }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('tags', tags)
    await queryInterface.bulkInsert('taglists', taglists)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('taglists', { id: [1,2,3,4] })
    await queryInterface.bulkDelete('tags', { id:  [1,2,3,4] })
  }
}