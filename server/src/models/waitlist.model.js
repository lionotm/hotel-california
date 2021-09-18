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
]

const history = [
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
      deleted: false,
    },
  },
]

const maxSlots = 25

function getWaitlist() {
  return waitlist.filter((customer) => customer.metaData.endTime === '')
}

function saveCustomer(customerData) {
  customerData.metaData.startTime = new Date().toUTCString()
  customerData.metaData.ticketNumber = uuidv4()
  console.info('Customer added to waitlist', customerData)
  waitlist.push(customerData)
}

function existsWithTicketNumber(ticketNumber, list) {
  let customer
  switch (list) {
    case 'history':
      customer = history.filter(
        (customer) => customer.metaData.ticketNumber.toString() === ticketNumber.toString()
      )
      break

    default:
      customer = waitlist.filter(
        (customer) => customer.metaData.ticketNumber.toString() === ticketNumber.toString()
      )
      break
  }
  return customer.length > 0
}

function removeCustomer(ticketNumber) {
  const customer = waitlist.filter(
    (customer) => customer.metaData.ticketNumber.toString() === ticketNumber
  )
  customer[0].metaData.endTime = new Date().toUTCString()
  customer[0].metaData.deleted = false
  console.info('Customer removed from waitlist', customer[0])
  history.push(customer[0])
}

function getHistory() {
  return history.filter((customer) => customer.metaData.deleted === false)
}

function removeHistory(ticketNumbers) {
  for (const customer of history) {
    if (ticketNumbers.indexOf(customer.metaData.ticketNumber) !== -1) {
      customer.metaData.deleted = true
    }
  }
}

module.exports = {
  maxSlots,
  getWaitlist,
  saveCustomer,
  existsWithTicketNumber,
  removeCustomer,
  getHistory,
  removeHistory,
}
