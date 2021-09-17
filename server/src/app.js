const path = require('path')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const waitlistRouter = require('./routes/waitlist/waitlist.router')

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.use(morgan('tiny'))
app.use(express.json())
app.use(waitlistRouter)
app.use(express.static(path.join(__dirname, '..', 'public')))

app.get('/*', (req, res) => {
  res.sendFile(express.static(path.join(__dirname, '..', 'public', 'index.html')))
})

module.exports = app
