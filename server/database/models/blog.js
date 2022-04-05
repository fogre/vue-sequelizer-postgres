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
    validate: {
      len: [4,20],
      notEmpty: true
    }
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: {
      msg: 'Url for this blog already exists',
      fields: ['url']
    },
    validate: {
      isUrl: {
        msg: 'Please enter valid url',
        fields: ['url']
      },
      notEmpty: true,
    }
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: {
      msg: 'A blog with this title already exists',
      fields: ['title']
    },
    validate: {
      len: [4, 40],
      notEmpty: true
    }
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'blog'
})

module.exports = Blog