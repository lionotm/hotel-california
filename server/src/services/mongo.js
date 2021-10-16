const mongoose = require('mongoose')

const MONGO_URL =
  process.env.MONGO_URL ||
  'mongodb+srv://hotel-cali-api:CQIwLidB9PWuihn1@cluster0.qyzpe.mongodb.net/hotelCali?retryWrites=true&w=majority'

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!')
})

mongoose.connection.once('error', (err) => {
  console.error(err)
})

async function mongoConnect() {
  await mongoose.connect(MONGO_URL)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect,
}
