const express = require('express')

const { getWaitlist } = require('./waitlist.controller')

const waitlistRouter = express.Router()

waitlistRouter.get('/waitlist', getWaitlist)

module.exports = waitlistRouter
