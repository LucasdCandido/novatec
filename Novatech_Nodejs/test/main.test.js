const app = require('../src/app');


it('testa se é verdade', () => {
  expect(true).toBe(true)
  // throw new Error('errado')
})

it('GET / sholuld return pong', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })
  expect(response.statusCode).toBe(200)
  expect(response.body).toBe('pong')
})
it('GET /non-existent should return 404', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/banana'
  })
  expect(response.statusCode).toBe(404)
  expect(response.body).toBe('Not Found')
})