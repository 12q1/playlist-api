const Sequelize = require('sequelize')
const sequelize = require('../db')
const Playlists = require('../playlists/model.js')

const User = sequelize.define('users', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  timestamps: true,
  tableName: 'users'
})

User.hasMany(Playlists, {as: 'playlists', foreignKey: 'user_id'})

module.exports = User
