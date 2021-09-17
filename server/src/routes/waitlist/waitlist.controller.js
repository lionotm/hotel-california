const waitlist = require('../../models/waitlist.model')

function getWaitlist(req, res) {
  return res.status(200).json(waitlist)
}

module.exports = {
  getWaitlist,
}
