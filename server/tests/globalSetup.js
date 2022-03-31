const { connectToDatabase } = require('../database/sequelize')

//Run migrations and seeds before testing (and test that they are working!)
//docker-compose.dev.yml needs to be running!
module.exports = async () => {
  await connectToDatabase()
}