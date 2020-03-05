module.exports = {
  db: {
    uri: process.env.NODE_ENV === 'prod' ? process.env.DB_URL : process.env.DB_DEV_URL,
  },
}
