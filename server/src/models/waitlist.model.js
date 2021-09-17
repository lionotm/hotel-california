const { v4: uuidv4 } = require('uuid')

// hardcoded, can be on Mongo instead
const waitlist = [
  {
    firstName: 'Jon',
    lastName: 'Snow',
    contactNumber: 123456789,
    notes: 'Hi Snow',
    metaData: {
      avatarColor: 0,
      startTime: 'Fri Sep 17 2021 00:00:00 GMT+0800',
      endTime: '',
      ticketNumber: 999999999,
    },
  },
  {
    firstName: 'Sponge',
    lastName: 'Bob',
    contactNumber: 987654321,
    notes: 'Hi Bob',
    metaData: {
      avatarColor: 2,
      startTime: 'Fri Sep 19 2021 00:00:00 GMT+0800',
      endTime: 'Fri Sep 19 2021 02:00:00 GMT+0800',
      ticketNumber: 1111111111,
    },
  },
]

function getWaitlist() {
  return waitlist.filter((customer) => customer.metaData.endTime === '')
}

function saveCustomer(customerData) {
  customerData.metaData.startTime = new Date().toUTCString()
  customerData.metaData.ticketNumber = uuidv4()
  waitlist.push(customerData)
}

function existsWithTicketNumber(ticketNumber) {
  for (const customer of waitlist) {
    if (customer.metaData.ticketNumber.toString() === ticketNumber) return true
  }
  return false
}

function removeCustomer(ticketNumber) {
  const customer = waitlist.filter(
    (customer) => customer.metaData.ticketNumber.toString() === ticketNumber
  )
  customer[0].metaData.endTime = new Date().toUTCString()
}

module.exports = { getWaitlist, saveCustomer, existsWithTicketNumber, removeCustomer }
