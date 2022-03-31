const { DataTypes } = require('sequelize')

module.exports = {
  up: async({ context: queryInterface }) => {
    await queryInterface.createTable('tags', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
      }
    })

    await queryInterface.createTable('taglists', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'blogs', key: 'id' }
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'tags', key: 'id' }
      }
    })
  },

  down: async({ context: queryInterface }) => {
    await queryInterface.dropTable('tags')
    await queryInterface.dropTable('taglists')
  }
}