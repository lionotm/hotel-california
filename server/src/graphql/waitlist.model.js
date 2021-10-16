const { v4: uuidv4 } = require('uuid')
const waitlist = require('./waitlist.mongo')

const initialWaitlist = [
  {
    _id: '616aa5df3298a54fff44030c',
    firstName: 'Jon',
    lastName: 'Snow',
    contactNumber: 123456789,
    notes: 'Hi Snow',
    metaData: {
      avatarColor: 0,
      startTime: 'Fri Sep 17 2021 00:00:00 GMT',
      endTime: '',
      ticketNumber: '999999999',
    },
  },
  {
    _id: '616aa5df3298a54fff440316',
    firstName: 'Sponge',
    lastName: 'Bob',
    contactNumber: 987654321,
    notes: 'Hi Bob',
    metaData: {
      avatarColor: 2,
      startTime: 'Fri Sep 19 2021 00:00:00 GMT',
      endTime: 'Fri Sep 19 2021 02:00:00 GMT',
      ticketNumber: '1111111111',
      deleted: false,
    },
  },
]

async function loadInitialData() {
  for (const customer of initialWaitlist) {
    // upsert
    await waitlist.updateOne({ _id: customer._id }, customer, { upsert: true })
  }
}

async function getWaitlist() {
  return await waitlist.find({
    'metaData.endTime': '',
  })
}

async function getHistory(isDeleted = false) {
  return await waitlist.find({
    'metaData.endTime': { $ne: '' },
    'metaData.deleted': isDeleted,
  })
}

async function saveCustomer(customerData) {
  const { metaData } = customerData
  metaData.startTime = new Date().toUTCString()
  metaData.ticketNumber = uuidv4()
  waitlist.create(customerData)
  console.info('Customer added to waitlist', { customerData })
  return { ...customerData, ...metaData }
}

async function removeCustomer(ticketNumber) {
  const removedCustomer = await waitlist.updateOne(
    {
      'metaData.ticketNumber': ticketNumber,
    },
    {
      'metaData.endTime': new Date().toUTCString(),
      'metaData.deleted': false,
    },
    {
      upsert: true,
    }
  )
  console.info('Customer removed from waitlist', removedCustomer)
  return removedCustomer.acknowledged && removedCustomer.modifiedCount === 1
}

async function removeHistory(ticketNumbers) {
  const removedHistory = await waitlist.updateMany(
    {
      'metaData.ticketNumber': { $in: ticketNumbers },
    },
    {
      'metaData.deleted': true,
    }
  )
  console.info('Customer deleted from history', removedHistory)
  return removedHistory.acknowledged && removedHistory.modifiedCount === ticketNumbers.length
}

module.exports = {
  loadInitialData,
  getWaitlist,
  getHistory,
  saveCustomer,
  removeCustomer,
  removeHistory,
}
