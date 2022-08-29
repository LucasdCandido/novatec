const db = require('../config/mongo');
const mongoist = require('mongoist');


const repository = {
  count(query) {
    return db.collection('pokemon').count(query)
  },
  list(query) {
    return db.collection('pokemon').find(query)
  },
  byId(id) {
    return db.collection('pokemon').findOne({_id: mongoist.ObjectId(id)})
  },
  create(body) {
    console.log('body', body)
    return db.collection('pokemon').insert(body)
  },
  update(id, body) {
    return db.collection('pokemon').update({ _id: mongoist.ObjectId(id)}, {$set: body})
  },
  delete(id) {
    return db.collection('pokemon').remove({_id: mongoist.ObjectId(id)})
  }
}

module.exports = repository