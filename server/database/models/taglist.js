const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../sequelize')

class Taglist extends Model {}

Taglist.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tagId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'tags', key: 'id' }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'blogs', key: 'id' }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'taglist'
})

module.exports = Taglist