const { DataTypes } = require('sequelize')

module.exports = {
  up: async({ context: queryInterface }) => {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    })

    await queryInterface.createTable('blogs', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author: {
        type: DataTypes.TEXT,
      },
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      }
    })

    await queryInterface.addColumn('blogs', 'user_id', {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    })
  },

  down: async({ context: queryInterface }) => {
    await queryInterface.dropTable('users')
    await queryInterface.dropTables('blogs')
  },
}