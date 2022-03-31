const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../sequelize')

class Blog extends Model {}
Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT,
    notEmpty: true,
    validate: {
      len: [4,20]
    }
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    isUrl: {
      msg: 'Please enter valid url',
      fields: ['url']
    },
    unique: {
      msg: 'Url for this blog already exists',
      fields: ['url']
    }
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    notEmpty: true,
    unique: {
      msg: 'A blog with this title already exists',
      fields: ['title']
    },
    validate: {
      len: [4, 40]
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog