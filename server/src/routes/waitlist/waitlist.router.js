const express = require('express')

const {
  httpGetMaxSlots,
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
} = require('./waitlist.controller')

const waitlistRouter = express.Router()

waitlistRouter.get('/maxslots', httpGetMaxSlots)
waitlistRouter.get('/', httpGetWaitlist)
waitlistRouter.post('/', httpAddCustomer)
waitlistRouter.delete('/:ticketnumber', httpRemoveCustomer)
waitlistRouter.get('/history', httpGetHistory)
waitlistRouter.post('/history', httpRemoveHistory)

module.exports = waitlistRouter
