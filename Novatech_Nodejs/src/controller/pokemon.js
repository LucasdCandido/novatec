
const { request } = require('http');
const repository = require('../repository/pokemon');
const controller = {
  //criando uma forma de promice
  async list(req, res) {
    /** @type {import { 'fastify' }.RouteHandlerMethod} */
    const query = req.query
    try {  const [items, total] = await Promise.all([
        repository.list(query),
        repository.count(query)
      ])
      // const items = await repository.list(query)
      // const total = await repository.count(query)
      res.send({
        total,
        items
      })
    } catch(e) {
      console.log(e)
      throw new Error('Deu Ruim')
    }
  },
  byId(req, res) {
    //criando outra forma de promise
    const id = req.params.id
    return repository.byId(id)
      .then(result => {
        res.send(result)
      })
  },
  create(req, res) {
    return repository.create(req.body)
      .then(result => {
        console.log('result', result)
        res.status(201)
        res.send(result)
      })
  },
  update(req, res) {
    const id = req.params.id
    const body = req.body
    return repository.update(id, body)
      .then(result => res.send(result))
  },
  delete(req, res) {
    const id = req.params.id

    return repository.delete(id)
      .then((result) => {
        res.status(204)
        res.send('')
      })
  }
};

module.exports = controller