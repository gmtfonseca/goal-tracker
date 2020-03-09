const HttpStatus = require('http-status-codes')
const app = require('../src/server')
const supertest = require('supertest')
const request = supertest(app)
const factory = require('./util/factory')
const fakers = require('./util/fakers')
const db = require('./util/db')

db.setupHooks('task')

describe('POST /', () => {
  test('should create task', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', {
      goal: goal.id,
    })
    const task = fakers.task()
    const res = await request
      .post(`/api/goal/${goal.id}/work/${work.id}/task`)
      .send(task)
      .expect(HttpStatus.CREATED)

    expect(res.body).toHaveProperty('_id', work.id)
    expect(res.body).toHaveProperty('goal', goal.id)
    expect(res.body.tasks).toEqual(expect.arrayContaining([expect.objectContaining(task)]))
  })

  test('should not create task with invalid work', async () => {
    const goal = await factory.create('Goal')
    const invalidWorkId = db.randomDocId()
    const task = fakers.task()
    const res = await request
      .post(`/api/goal/${goal.id}/work/${invalidWorkId}/task`)
      .send(task)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('PUT', () => {
  test('should update task', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', {
      goal: goal.id,
    })
    const firstTask = work.tasks[0]
    const updatedTask = fakers.task()
    const res = await request
      .put(`/api/goal/${work.goal}/work/${work.id}/task/${firstTask.id}`)
      .send(updatedTask)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('_id', work.id)
    expect(res.body).toHaveProperty('goal', goal.id)
    expect(res.body.tasks).toEqual(expect.arrayContaining([expect.objectContaining(updatedTask)]))
  })

  test('should not update task with invalid work', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', {
      goal: goal.id,
    })
    const firstTask = work.tasks[0]
    const updatedTask = fakers.task()
    const invalidWorkId = db.randomDocId()
    const res = await request
      .put(`/api/goal/${work.goal}/work/${invalidWorkId}/task/${firstTask.id}`)
      .send(updatedTask)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})

describe('DELETE /', () => {
  test('should delete task', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', { goal: goal.id })
    const firstTask = work.tasks[0]
    const res = await request
      .delete(`/api/goal/${goal.id}/work/${work.id}/task/${firstTask.id}`)
      .expect(HttpStatus.OK)

    expect(res.body).toHaveProperty('_id', work.id)
    expect(res.body).toHaveProperty('goal', goal.id)
    expect(res.body.tasks).not.toEqual(expect.arrayContaining([expect.objectContaining(firstTask)]))
  })

  test('should not delete task with invalid goal', async () => {
    const goal = await factory.create('Goal')
    const work = await factory.create('Work', { goal: goal.id })
    const firstTask = work.tasks[0]
    const invalidWorkId = db.randomDocId()
    const res = await request
      .delete(`/api/goal/${goal.id}/work/${invalidWorkId}/task/${firstTask.id}`)
      .expect(HttpStatus.BAD_REQUEST)

    expect(res.body).toHaveProperty('error')
  })
})
