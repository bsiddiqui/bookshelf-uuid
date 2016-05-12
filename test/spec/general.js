'use strict'

let co = require('co')
let lab = exports.lab = require('lab').script()
let expect = require('code').expect

let valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
let db = require('../db')
let User = db.bookshelf.model('User')

lab.experiment('general tests', () => {
  lab.beforeEach(co.wrap(function * () {
    yield db.reset()
    yield db.knex.seed.run()
  }))

  lab.test('should work', co.wrap(function * () {
    let user = yield User
      .forge({ name: 'Hello World', email: 'hello@world.com' })
      .save()

    expect(user.id).to.match(valid)
  }))

  lab.test('should not interfere with queries', co.wrap(function * () {
    let user = yield User.forge({ email: 'Brandyn_Collier44@yahoo.com' }).fetch()
    expect(user.id).to.equal('6b7a192f-6e1c-4dcb-8e57-14ab16d5fdf4')
  }))

  lab.test('should generate a new UUID for each insert', co.wrap(function * () {
    let users = yield [
      User
        .forge({ name: 'Hello World', email: 'hello@world.com' })
        .save(),
      User
        .forge({ name: 'Foo Bar', email: 'foo@bar.com' })
        .save()
    ]

    expect(users[0].id).to.match(valid)
    expect(users[1].id).to.match(valid)
    expect(users[0].id).to.not.equal(users[1].id)
  }))

  lab.test('should not modify the original defaults', co.wrap(function * () {
    let user = yield User
      .forge({ name: 'Hello World', email: 'hello@world.com' })
      .save()

    expect(user.id).to.match(valid)
    expect(user.get('bio')).to.equal('No bio')
    expect(User.prototype.defaults).to.deep.equal({ bio: 'No bio' })
  }))

  lab.test('should merge defaults even if it\'s a function', co.wrap(function * () {
    let Model = db.bookshelf.Model.extend({
      uuid: true,
      tableName: 'users',
      defaults: () => {
        return { bio: 'new bio' }
      }
    })

    let user = yield Model
      .forge({ name: 'Hello World', email: 'hello@world.com' })
      .save()

    expect(user.id).to.match(valid)
    expect(user.get('bio')).to.equal('new bio')
    expect(Model.prototype.defaults()).to.deep.equal({ bio: 'new bio' })
  }))

  lab.test('should not override when ID is explicit', co.wrap(function * () {
    let user = yield User
      .forge({
        id: 'lol-this-isnt-guid',
        name: 'Hello World',
        email: 'hello@world.com'
      })
      .save(null, { method: 'insert' })

    expect(user.id).to.equal('lol-this-isnt-guid')
  }))

  lab.test('should be disabled by default', co.wrap(function * () {
    let Model = db.bookshelf.Model.extend({
      tableName: 'users'
    })

    let user = yield Model
      .forge({
        name: 'Hello World',
        email: 'hello@world.com'
      })
      .save()

    expect(user.id).to.be.a.number()

    // Enable it again
    Model.prototype.uuid = true

    user = yield Model
    .forge({
      name: 'Foo Bar',
      email: 'foo@bar'
    })
    .save()

    expect(user.id).to.match(valid)
  }))

  lab.test('should be able to define own function', co.wrap(function * () {
    let bookshelf = require('bookshelf')(db.knex)
    bookshelf.plugin(require('../../'), {
      type: function (attr, options) {
        expect(this.uuid).to.be.true()
        expect(attr).to.deep.equal({
          name: 'Hello World',
          email: 'hello@world.com'
        })
        expect(options).to.deep.equal({ custom: 'param' })

        return 'hello-world'
      }
    })

    let Model = bookshelf.Model.extend({
      tableName: 'users',
      uuid: true
    })

    let user = yield Model
      .forge({
        name: 'Hello World',
        email: 'hello@world.com'
      }, { custom: 'param' })
      .save()

    expect(user.id).to.be.equal('hello-world')
  }))
})

