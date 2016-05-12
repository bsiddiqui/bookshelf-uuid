'use strict'

let db = require('../')

module.exports = db.bookshelf.model('User', {
  tableName: 'users',
  uuid: true,
  defaults: {
    bio: 'No bio'
  }
})
