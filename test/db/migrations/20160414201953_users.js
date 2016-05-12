'use strict'

exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.uuid('id').primary()
  table.string('name')
  table.string('email')
  table.string('bio')
  table.timestamps()
})

exports.down = (knex) => knex.schema.dropTable('users')
