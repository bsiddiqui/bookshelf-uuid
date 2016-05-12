# bookshelf-uuid
[![Build Status](https://circleci.com/gh/estate/bookshelf-uuid.svg?style=shield)](https://circleci.com/gh/estate/bookshelf-uuid)
[![Code Climate](https://codeclimate.com/github/estate/bookshelf-uuid/badges/gpa.svg)](https://codeclimate.com/github/estate/bookshelf-uuid)
[![Test Coverage](https://codeclimate.com/github/estate/bookshelf-uuid/badges/coverage.svg)](https://codeclimate.com/github/estate/bookshelf-uuid/coverage)
[![Version](https://badge.fury.io/js/bookshelf-uuid.svg)](http://badge.fury.io/js/bookshelf-uuid)
[![Downloads](http://img.shields.io/npm/dm/bookshelf-uuid.svg)](https://www.npmjs.com/package/bookshelf-uuid)

Automatically generate UUIDs for your models

### Installation

After installing `bookshelf-uuid` with `npm i --save bookshelf-uuid`,
all you need to do is add it as a bookshelf plugin and enable it on your models.

```javascript
let knex = require('knex')(require('./knexfile.js').development)
let bookshelf = require('bookshelf')(knex)

// Add the plugin
bookshelf.plugin(require('bookshelf-uuid'))

// Enable it on your models
let User = bookshelf.Model.extend({ tableName: 'users', uuid: true })
```

### Usage

Nothing fancy here, just keep using bookshelf as usual.

```javascript
// This user is indestructible
let user = yield User.forge({ email: 'foo@bar' }).save()
console.log(user.id) // 6b7a192f-6e1c-4dcb-8e57-14ab16d5fdf4
```

### Settings

`bookshelf-uuid` generates UUIDs v4 by default, but you can easily switch to
v1 UUIDs or a custom generator.

```javascript
bookshelf.plugin(require('bookshelf-uuid'), {
  type: 'v1' // Or your own function
})
```

### Testing

```bash
git clone git@github.com:estate/bookshelf-uuid.git
cd bookshelf-uuid && npm install && npm test
```
