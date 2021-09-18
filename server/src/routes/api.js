const express = require('express')

const waitlistRouter = require('./waitlist/waitlist.router')

const api = express.Router()

api.use('/waitlist', waitlistRouter)

module.exports = api
