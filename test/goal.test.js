const HttpStatus = require('http-status-codes')
const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
const db = require('./util/db')

db.setup('goal')

describe('POST /', () => {
  test('should return new document with correct properties and values', async () => {
    const body = {
      year: 2020,
      title: 'Gym',
      overview: 'Improve body',
    }
    const res = await request
      .post('/api/goal')
      .send(body)
      .expect(HttpStatus.CREATED)

    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('year', body.year)
    expect(res.body).toHaveProperty('title', body.title)
    expect(res.body).toHaveProperty('overview', body.overview)
  })
})

describe('GET /', () => {
  test('should return all goals properly', async () => {
    const res = await request.get('/api/goal').expect(HttpStatus.OK)
    expect(res.body).toHaveLength(3)
    expect(res.body[0]).toMatchObject({ year: 1987, title: 'Gym', overview: 'Improve body' })
  })
})
