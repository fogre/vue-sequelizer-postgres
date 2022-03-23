const { Model, DataTypes } = require('sequelize')

const { sequelize } = require('../sequelize')

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: {
      msg: 'This username is already taken.',
      fields: ['username']
    },
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['passwordHash'] }
  },
  scopes: {
    withHash: {
      attributes: { include: ['passwordHash'] }
    }
  }
})

module.exports = User