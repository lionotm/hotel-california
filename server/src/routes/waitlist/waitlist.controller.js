const {
  maxSlots,
  getWaitlist,
  saveCustomer,
  existsWithTicketNumber,
  removeCustomer,
  getHistory,
  removeHistory,
} = require('../../models/waitlist.model')

function httpGetMaxSlots(req, res) {
  return res.status(200).json(maxSlots)
}

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
}

function httpRemoveCustomer(req, res) {
  const ticketNumber = req.params.ticketnumber.toString()
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

function httpGetHistory(req, res) {
  const history = getHistory()
  return res.status(200).json(history)
}

function httpRemoveHistory(req, res) {
  const ticketNumbers = req.body
  let existsTicket = true
  for (const ticket of ticketNumbers) {
    if (!existsWithTicketNumber(ticket, 'history')) {
      existsTicket = false
      break
    }
  }
  if (!existsTicket) {
    return res.status(404).json({
      error: 'Ticket not found',
    })
  }

  removeHistory(ticketNumbers)
  return res.status(200).json({
    ok: true,
  })
}

module.exports = {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
  httpGetMaxSlots,
}
