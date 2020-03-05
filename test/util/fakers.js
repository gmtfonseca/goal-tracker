const faker = require('faker')
const { randInt } = require('../../src/lib/math')

const goal = () => ({
  year: faker.random.number(9),
  title: faker.name.title(),
  overview: faker.random.words(),
})

const task = () => ({
  description: faker.random.words(),
  notes: faker.random.words(),
  done: faker.random.boolean(),
})

const work = () => ({
  date: faker.date.recent(),
  // eslint-disable-next-line
  tasks: new Array(randInt(1, 5)).fill(null).map(e => task()),
})

module.exports = { goal, work }
