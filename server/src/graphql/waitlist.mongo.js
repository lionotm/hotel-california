const mongoose = require('mongoose')

const waitlistSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    contactNumber: {
      type: Number,
      required: true,
    },
    notes: String,
    metaData: {
      avatarColor: Number,
      startTime: String,
      endTime: String,
      ticketNumber: String,
      deleted: Boolean,
    },
  },
  { collection: 'waitlist' }
)

module.exports = mongoose.model('waitlist', waitlistSchema)
