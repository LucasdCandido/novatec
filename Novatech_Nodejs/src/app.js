const fastify = require('fastify');
const app = fastify();
const controller = require('./controller/pokemon');
const hpController = require('./controller/hp')
const loginController = require('./controller/login');



app.register(require('@fastify/multipart'))

app.post('/upload', async (req, res) => {
  const file = await req.file()

  console.log('file', file)
  res.send('')
})


/**
 * processo de autenticação
 */
app.post('/login', {
  handler: loginController.login,
  schema: {
    body: {
      type: 'object',
      properties: {
        username: {type: 'string'},
        password: {type: 'string'}
      },
      required: ['username', 'password']
    }
  }
})



app.get('/', (req, res) => res.send('pong'))
app.get('/pokemon', {
  preHendler: loginController.auth,
  handler: controller.list
})
app.get('/pokemon/:id', controller.byId)
app.post('/pokemon', controller.create)
app.put('/pokemon/:id', controller.update)
app.delete('/pokemon/:id', controller.delete)

app.get('/harry-potter', {
  preHendler: loginController.auth,
  handler: hpController.list,
  schema: {
    response: { 
      200: {
        type: 'array',
        items:
        {  type: 'object',
          properties: {
            name: {type: 'string'},
            gender: {type: 'string'}
          }}}
    }
  }
})


// procurar ajv para continuar custumizando validação


app.setNotFoundHandler((req, res) => {
  res.status(404).send('Not Found')
})

app.setErrorHandler((error, req, res) => {
  console.error(error)
  res.status(error.status || error.statusCode || 500)
  res.send(error.message || 'alguma coisa errada')
})

module.exports = app


// wbruno