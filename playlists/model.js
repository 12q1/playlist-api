const Sequelize = require('sequelize')
const sequelize = require('../db')
const Songs = require('../songs/model.js')

const Playlist = sequelize.define('playlists', {
  name: {
    type: Sequelize.STRING,
    field: 'playlist_name',
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    field: 'user_id',
    allowNull: false
  }
}, {
  timestamps: false,
  tableName: 'playlists'
})

Playlist.hasMany(Songs, {as: 'songs', foreignKey: 'playlist_id'})

module.exports = Playlist
