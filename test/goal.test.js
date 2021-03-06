const HttpStatus = require('http-status-codes')
const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
const factory = require('./util/factory')
const db = require('./util/db')

db.setupHooks('goal')

describe('POST /', () => {
  test('should create goal', async () => {
    const goal = await factory.attrs('Goal')
    const res = await request
      .post('/api/goal')
      .send(goal)
      .expect(HttpStatus.CREATED)

    expect(res.body).toHaveProperty('_id')
    expect(res.body).toHaveProperty('year', goal.year)
    expect(res.body).toHaveProperty('title', goal.title)
    expect(res.body).toHaveProperty('overview', goal.overview)
  })
})

describe('GET /', () => {
  test('should return goals', async () => {
    const docNumber = 3
    const goals = await factory.createMany('Goal', docNumber)
    const res = await request
      .get('/api/goal')
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveLength(docNumber)
    expect(res.body).toEqual(db.toJsonComparable(goals))
  })
})

describe('GET BY ID /', () => {
  test('should return goal details', async () => {
    const goal = await factory.create('Goal')
    const res = await request
      .get(`/api/goal/${goal.id}`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('year', goal.year)
    expect(res.body).toHaveProperty('title', goal.title)
    expect(res.body).toHaveProperty('overview', goal.overview)
  })
})

describe('PUT /', () => {
  test('should update goal', async () => {
    const originalGoal = await factory.create('Goal')
    const updatedGoal = await factory.attrs('Goal')
    const res = await request
      .put(`/api/goal/${originalGoal.id}`)
      .send(updatedGoal)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('year', updatedGoal.year)
    expect(res.body).toHaveProperty('title', updatedGoal.title)
    expect(res.body).toHaveProperty('overview', updatedGoal.overview)
  })
})

describe('DELETE /', () => {
  test('should delete goal', async () => {
    const goal = await factory.create('Goal')
    const res = await request.delete(`/api/goal/${goal.id}`).expect(HttpStatus.OK)
    expect(res.body).toHaveProperty('_id', goal.id)
  })
})
