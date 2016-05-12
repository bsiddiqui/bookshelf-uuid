'use strict'

let uuid = require('uuid')
let merge = require('lodash.merge')
let result = require('lodash.result')

module.exports = (bookshelf, settings) => {
  // Add default settings
  settings = merge({
    type: 'v4'
  }, settings)

  // Store prototypes for later
  let modelPrototype = bookshelf.Model.prototype

  // Extends the default model class
  bookshelf.Model = bookshelf.Model.extend({
    initialize: function (attributes, options) {
      modelPrototype.initialize.call(this)

      if (this.uuid) {
        this.defaults = merge({
          [this.idAttribute]: typeof settings.type === 'string'
            ? uuid[settings.type]() : settings.type.call(this, attributes, options)
        }, result(this, 'defaults'))
      }
    }
  })
}

