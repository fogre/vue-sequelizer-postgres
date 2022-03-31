const { sequelize } = require('../database/sequelize')

//drop database after testing
module.exports = async () => {
  try {
    console.log('Dropping tables after tests')
    await sequelize.getQueryInterface().dropAllTables()
    process.exit(0)
  } catch(e) {
    console.log('Error dropping database: ', e)
    process.exit(1)
  }
}