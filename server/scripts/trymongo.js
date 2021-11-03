/* Standalone script to test mongoDB CRUD operations in Atlas, 
   actual schema used for waitlist app differs!
*/

const MONGO_URL =
  'mongodb+srv://hotel-cali-api:CQIwLidB9PWuihn1@cluster0.qyzpe.mongodb.net/hotelCali?retryWrites=true&w=majority'

const { MongoClient } = require('mongodb')

async function testWithAsync() {
  console.log('\n--- testCRUD ---')
  const client = new MongoClient(MONGO_URL, { useNewUrlParser: true })
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    const db = client.db()
    const collection = db.collection('employees')

    const employee = { id: 1, name: 'John. Snow', age: 25 }
    const result = await collection.insertOne(employee)
    console.log('C >>> Inserting new employee:\n', result.insertedId)

    const docs = await collection.find({ _id: result.insertedId }).toArray()
    console.log('R >>> Finding the inserted employe:\n', docs)

    const updated = await collection.updateOne({ id: 1 }, { $set: { name: 'Sponge Bob' } })
    const updatedResult = await collection.find({ _id: result.insertedId }).toArray()
    console.log('U >>> Updating the employee name:\n', updatedResult)

    const deleted = await collection.deleteOne({ id: 1 })
    console.log('D >>> Deleting the employee:\n', deleted)
  } catch (err) {
    console.log(err)
  } finally {
    client.close()
  }
}

testWithAsync()
