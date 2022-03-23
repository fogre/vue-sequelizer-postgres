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
  up: async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkInsert('readinglists', entrys)
  },

  down: async ({ context: sequelize }) => {
    await sequelize.getQueryInterface().bulkDelete('readinglists', { id:  entrys.map(i => i.id) })
  }
}