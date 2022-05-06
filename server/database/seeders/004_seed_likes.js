const likelist = [
  { user_id: 1, blog_id: 1 },
  { user_id: 1, blog_id: 3 },
  { user_id: 2, blog_id: 4 },
  { user_id: 2, blog_id: 3 },
  { user_id: 2, blog_id: 1 },
  { user_id: 3, blog_id: 3 }
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('likes', likelist)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('likelist', { id: likelist.map((l, i) => i) })
  }
}