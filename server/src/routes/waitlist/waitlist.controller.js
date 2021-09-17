const {
  getWaitlist,
  saveCustomer,
  existsWithTicketNumber,
  removeCustomer,
} = require('../../models/waitlist.model')

function httpGetWaitlist(req, res) {
  const waitlist = getWaitlist()
  return res.status(200).json(waitlist)
}

function httpAddCustomer(req, res) {
  const customerData = req.body

  if (!customerData.firstName || !customerData.lastName || !customerData.contactNumber) {
    return res.status(400).json({
      error: 'Missing required fields',
    })
  }

  saveCustomer(customerData)
  return res.status(201).json(customerData)
  console.log(customerData)
}

function httpRemoveCustomer(req, res) {
  const ticketNumber = req.params.ticketNumber.toString()
  const existsTicket = existsWithTicketNumber(ticketNumber)
  if (!existsTicket) {
    return res.status(404).json({
      error: 'Ticket not found',
    })
  }
  removeCustomer(ticketNumber)
  return res.status(200).json({
    ok: true,
  })
}

module.exports = {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
}
