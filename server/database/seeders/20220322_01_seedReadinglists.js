const entrys = [
  {
    user_id: 3,
    blog_id: 1
  },
  {
    user_id: 3,
    blog_id: 2
  },
]

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.bulkInsert('readinglists', entrys)
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.bulkDelete('readinglists', { id:  entrys.map(i => i.id) })
  }
}