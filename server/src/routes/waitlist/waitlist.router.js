const express = require('express')

const {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
} = require('./waitlist.controller')

const waitlistRouter = express.Router()

waitlistRouter.get('/', httpGetWaitlist)
waitlistRouter.post('/', httpAddCustomer)
waitlistRouter.delete('/:ticketNumber', httpRemoveCustomer)
waitlistRouter.get('/history', httpGetHistory)
waitlistRouter.post('/history', httpRemoveHistory)

module.exports = waitlistRouter
