const Sequelize = require('sequelize')
const sequelize = require('../db')
const User = require('../users/model.js')
//const Songs = require('../songs/model.js')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'playlist_name',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id'
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.belongsTo(User)
//Playlist.hasMany(Songs)

module.exports = Playlist
