const mongoose = require('mongoose')

async function clearDb() {
  const collections = await mongoose.connection.db.collections()

  for (const collection of collections) {
    await collection.deleteMany()
  }
}

module.exports = {
  setupHooks(dbName) {
    beforeAll(async () => {
      await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      })
    }),
      afterEach(async () => {
        await clearDb()
      }),
      afterAll(async () => {
        await mongoose.connection.db.dropDatabase()
        await mongoose.connection.close()
      })
  },
  randomDocId() {
    return mongoose.Types.ObjectId()
  },
  toJsonComparable(models) {
    return models.map(model => {
      const doc = Object.assign({}, model._doc)
      doc._id = doc._id.toString()
      return doc
    })
  },
}
