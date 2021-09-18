const express = require('express')

const {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
} = require('./waitlist.controller')

const waitlistRouter = express.Router()

waitlistRouter.get('/waitlist', httpGetWaitlist)
waitlistRouter.post('/waitlist', httpAddCustomer)
waitlistRouter.delete('/waitlist/:ticketNumber', httpRemoveCustomer)
waitlistRouter.get('/waitlist/history', httpGetHistory)
waitlistRouter.post('/waitlist/history', httpRemoveHistory)

module.exports = waitlistRouter
