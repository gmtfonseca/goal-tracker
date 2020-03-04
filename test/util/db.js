const mongoose = require('mongoose')
const fs = require('fs')
const util = require('util')
const path = require('path')
const readDir = util.promisify(fs.readdir)

function toTitleCase(str) {
  return str.replace(/\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

async function seedDb() {
  const seedsPath = path.join(__dirname, '..', 'seeds')
  const dir = await readDir(seedsPath)
  const seedFiles = dir.filter(f => f.endsWith('.seed.js'))

  for (const file of seedFiles) {
    const fileName = file.split('.seed.js')[0]
    const modelName = toTitleCase(fileName)
    const model = mongoose.models[modelName]

    if (!model) throw new Error(`Cannot find Model '${modelName}'`)

    const seed = require(path.join(seedsPath, file))
    await model.insertMany(seed)
  }
}

async function clearDb() {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany()
  }
}

module.exports = {
  setup(dbName) {
    beforeAll(async () => {
      await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
    }),
      beforeEach(async () => {
        await clearDb()
        await seedDb()
      }),
      afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
      })
  },
}
