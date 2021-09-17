const express = require('express')

const { httpGetWaitlist, httpAddCustomer, httpRemoveCustomer } = require('./waitlist.controller')

const waitlistRouter = express.Router()

waitlistRouter.get('/waitlist', httpGetWaitlist)
waitlistRouter.post('/waitlist', httpAddCustomer)
waitlistRouter.delete('/waitlist/:ticketNumber', httpRemoveCustomer)

module.exports = waitlistRouter
