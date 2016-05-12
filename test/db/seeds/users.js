'use strict'

exports.seed = (knex, Promise) => {
  let users = [
    {
      id: 'eca664f6-d9d9-498d-bfdc-75ee1fb7800c',
      name: 'Amira Dooley',
      email: 'Raina_Kunde14@hotmail.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '6b7a192f-6e1c-4dcb-8e57-14ab16d5fdf4',
      name: 'Joaquin Leffler',
      email: 'Brandyn_Collier44@yahoo.com',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: '3dd69846-a199-485d-b579-0c672e9006ec',
      name: 'Chaim Herman',
      email: 'Emmie.Stehr@yahoo.com',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]
  return Promise.join(
    knex('users').del(),
    knex('users').insert(users)
  )
}
