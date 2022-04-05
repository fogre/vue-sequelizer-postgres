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
    allowNull: false,
    validate: {
      len: [4,16],
      notEmpty: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  modelName: 'user',
  defaultScope: {
    attributes: { exclude: ['passwordHash', 'disabled', 'admin'] }
  },
  scopes: {
    withLogin: {
      attributes: { include: ['passwordHash', 'admin', 'disabled'] }
    },
    withAdmin: {
      attributes: { include: ['admin'] }
    }
  }
})

module.exports = User