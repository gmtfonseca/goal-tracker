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
  test('should create work', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.attrs('Work')
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

  test('should not create work with invalid goal', async () => {
    const invalidGoalId = db.randomDocId()
    const work = await factory.attrs('Work')
    const res = await request
      .post(`/api/goal/${invalidGoalId}/work`)
      .send(work)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('GET /', () => {
  const numDocs = 3
  let goal

  beforeAll(async () => {
    goal = await factory.create('Goal')
    await factory.createMany('Work', numDocs, { goal: goal.id })
  })

  test('should return works', async () => {
    const res = await request
      .get(`/api/goal/${goal.id}/work`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveLength(numDocs)
    expect(res.body[0]).toHaveProperty('goal')
    expect(res.body[0]).toHaveProperty('date')
    expect(res.body[0]).toHaveProperty('tasks')
  })

  test('should not return works with invalid goal', async () => {
    const invalidGoalId = db.randomDocId()
    const res = await request
      .get(`/api/goal/${invalidGoalId}/work`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('GET BY ID /', () => {
  let goal, work

  beforeAll(async () => {
    goal = await factory.create('Goal')
    work = await factory.create('Work', {
      goal: goal.id,
    })
  })

  test('should return work details', async () => {
    const res = await request
      .get(`/api/goal/${goal.id}/work/${work.id}`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('date')
    expect(Date.parse(res.body.date)).toEqual(Number(work.date))
    expect(res.body).toHaveProperty('tasks')
    expect(res.body.tasks).toHaveLength(work.tasks.length)
  })

  test('should not return work details with invalid goal', async () => {
    const invalidGoalId = db.randomDocId()
    const res = await request
      .get(`/api/goal/${invalidGoalId}/work/${work.id}`)
      .expect('Content-Type', /json/)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('PUT /', () => {
  let goal, originalWork, updatedWork

  beforeAll(async () => {
    goal = await factory.create('Goal')
    originalWork = await factory.create('Work', {
      goal: goal.id,
    })
    updatedWork = fakers.work()
  })

  test('should update work', async () => {
    const res = await request
      .put(`/api/goal/${originalWork.goal}/work/${originalWork.id}`)
      .send(updatedWork)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('date')
    expect(Date.parse(res.body.date)).toEqual(Number(updatedWork.date))
    expect(res.body).toHaveProperty('tasks')
    expect(res.body.tasks.map(t => withoutKey(t, '_id'))).toEqual(updatedWork.tasks)
  })

  test('should not update work with invalid goal', async () => {
    const invalidGoalId = db.randomDocId()
    const res = await request
      .put(`/api/goal/${invalidGoalId}/work/${originalWork.id}`)
      .send(updatedWork)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('DELETE /', () => {
  let goal, work

  beforeAll(async () => {
    goal = await factory.create('Goal')
    work = await factory.create('Work', {
      goal: goal.id,
    })
  })

  test('should remove work', async () => {
    const res = await request.delete(`/api/goal/${work.goal}/work/${work.id}`).expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('_id', work.id)
  })

  test('should not remove work with invalid goal', async () => {
    const invalidGoalId = db.randomDocId()
    const res = await request
      .delete(`/api/goal/${invalidGoalId}/work/${work.id}`)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})
