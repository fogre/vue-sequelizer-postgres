const { Sequelize } = require('sequelize')
const { Umzug, SequelizeStorage } = require('umzug')

const { DATABASE_URL, ENV } = require('../utils/config')

const logQueries = ENV === 'development' ? true : false

const sequelize = new Sequelize(DATABASE_URL, {
  logging: logQueries
})

const migrationConf = {
  migrations: {
    glob: ['migrations/*.js', { cwd: __dirname }]
  },
  storage: new SequelizeStorage({
    sequelize, tableName: 'migrations'
  }),
  context: sequelize.getQueryInterface(),
  logger: console
}

const seedingConf = {
  migrations: {
    glob: ['seeders/*.js', { cwd: __dirname }],
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({
    sequelize, tableName: 'seeder_meta',
  }),
  logger: console,
}

const seedDatabase = async () => {
  if (ENV === 'development' || ENV === 'test') {
    const uzmug = new Umzug(seedingConf)
    const seedings = await uzmug.up()
    console.log('Seedings up to date', {
      files: seedings.map(seed => seed.name)
    })
  }
  return null
}

const rollbackSeeding = async () => {
  try {
    await sequelize.authenticate()
    const uzmug = new Umzug(seedingConf)
    await uzmug.down()
  } catch(e) {
    console.log('Migration rollback failed: ', e)
    return process.exit(1)
  }
}

const runMigrations = async () => {
  const uzmugMigrator = new Umzug(migrationConf)
  const migrations = await uzmugMigrator.up()
  console.log('Migrations up to date', {
    files: migrations.map(mig => mig.name)
  })
}

const rollbackMigration = async () => {
  try {
    await sequelize.authenticate()
    const uzmugMigrator = new Umzug(migrationConf)
    await uzmugMigrator.down()
  } catch(e) {
    console.log('Migration rollback failed: ', e)
    return process.exit(1)
  }
}

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    await seedDatabase()
    console.log('database connected')
  } catch (e) {
    console.log('connecting database failed', e)
    return process.exit(1)
  }
  return null
}

module.exports = {
  sequelize,
  connectToDatabase,
  rollbackSeeding,
  rollbackMigration
}