const HttpStatus = require('http-status-codes')
const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
const factory = require('./util/factory')
const fakers = require('./util/fakers')
const db = require('./util/db')
const { withoutKey } = require('../src/lib/object')

db.setupHooks('work')

describe('POST /', () => {
  test('should return new work', async () => {
    const goal = await factory.create('Goal')
    const work = fakers.work()
    const res = await request
      .post(`/api/goal/${goal.id}/work`)
      .send(work)
      .expect(HttpStatus.CREATED)

    expect(res.body).toHaveProperty('goal', goal.id)
    expect(res.body).toHaveProperty('date')
    expect(Date.parse(res.body.date)).toEqual(Number(work.date))
    expect(res.body).toHaveProperty('tasks')
    expect(res.body.tasks).toHaveLength(work.tasks.length)
  })
})

describe('GET /', () => {
  test('should return works', async () => {
    const docNumber = 3
    const goal = await factory.create('Goal')
    await factory.createMany('Work', docNumber, { goal: goal.id })
    const res = await request
      .get(`/api/goal/${goal.id}/work`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveLength(docNumber)
    expect(res.body[0]).toHaveProperty('goal')
    expect(res.body[0]).toHaveProperty('date')
    expect(res.body[0]).toHaveProperty('tasks')
  })
})

describe('GET BY ID /', () => {
  test('should return work details', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', {
      goal: goal.id,
    })
    const res = await request
      .get(`/api/goal/${goal.id}/work/${work.id}`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('date')
    expect(Date.parse(res.body.date)).toEqual(Number(work.date))
    expect(res.body).toHaveProperty('tasks')
    expect(res.body.tasks).toHaveLength(work.tasks.length)
  })
})

describe('PUT /', () => {
  test('should update work', async () => {
    const goal = await factory.create('Goal')
    const originalWork = await factory.create('Work', {
      goal: goal.id,
    })
    const updatedWork = fakers.work()
    const res = await request
      .put(`/api/goal/${originalWork.goal}/work/${originalWork.id}`)
      .send(updatedWork)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('date')
    expect(Date.parse(res.body.date)).toEqual(Number(updatedWork.date))
    expect(res.body).toHaveProperty('tasks')
    expect(res.body.tasks.map(t => withoutKey(t, '_id'))).toEqual(updatedWork.tasks)
  })
})

describe('DELETE /', () => {
  test('should remove work', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', {
      goal: goal.id,
    })
    const res = await request.delete(`/api/goal/${work.goal}/work/${work.id}`).expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('_id', work.id)
  })
})
