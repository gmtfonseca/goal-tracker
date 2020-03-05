const faker = require('faker')

const goal = () => ({
  year: faker.random.number(9),
  title: faker.name.title(),
  overview: faker.random.words(),
})

module.exports = { goal }
