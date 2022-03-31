const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../sequelize')

class Tag extends Model {}

Tag.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    notEmpty: true,
    unique: {
      msg: 'Tag with this name already exists',
      fields: ['name']
    },
    validate: {
      len: [2,10]
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'tag'
})

module.exports = Tag