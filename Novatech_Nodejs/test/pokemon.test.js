const app = require('../src/app');
const { update } = require('../src/repository/pokemon');


jest.mock('../src/config/mongo', () => {
  return {
    collection() {
      return{
        async count() {
          return 2
        },
        async find() {
          return [{ name: 'mock'}]
        },
        async insert() {
          return { _id: '000999'}
        },
        async findOne() {
          return { _id: 'aaaaaaaaaaaaaaaaaaaaaaaa', name: 'mock'}
        },
        async update() {
          return {ok: 1, n: 1}
        },
        async remove() {
          return {ok: 1}
        }
      }
    }
  }
})
const ID_MOCK = 'aaaaaaaaaaaaaaaaaaaaaaaa'
describe('GET Routes', () => {
  it('GET / pokemon', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/pokemon'
    })
    const body = JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(body.total).toBe(2)
  })
  
  it('GET / pokemon/:id', async () => {
    const response = await app.inject({
      method: 'GET',
      url: `/pokemon/${ID_MOCK}`,
    })
    const body =  JSON.parse(response.body)
    expect(response.statusCode).toBe(200)
    expect(body.name).toBe('mock')
    expect(body).toEqual({_id: ID_MOCK, name: 'mock'})
  })
})

it('POST / pokemon', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/pokemon',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name: 'JaneDoe'})
  })
  const body = JSON.parse(response.body)
  expect(response.statusCode).toBe(201)
  expect(body._id).toBeDefined()
})
it('PUT / pokemon', async () => {
  const response = await app.inject({
    method: 'PUT',
    url: `/pokemon/${ID_MOCK}`
  })
  const body = JSON.parse(response.body)
  expect(response.statusCode).toBe(200)
  expect(body).toEqual({ ok: 1, n: 1})
})
it('DELETE / pokemon', async () => {
  const response = await app.inject({
    method: 'DELETE',
    url: `/pokemon/${ID_MOCK}`
  })
  expect(response.statusCode).toBe(204)
})