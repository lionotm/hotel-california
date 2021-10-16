const waitlistModel = require('./waitlist.model')

module.exports = {
  Query: {
    // default args: parent, args, context, info
    waitlist: async () => {
      return waitlistModel.getWaitlist()
    },
    history: async (_, args) => {
      return waitlistModel.getHistory(args.isDeleted)
    },
  },
  Mutation: {
    // default args: parent, args, context, info
    saveCustomer: async (_, args) => {
      return waitlistModel.saveCustomer(args.customerData)
    },
    removeCustomer: async (_, args) => {
      return waitlistModel.removeCustomer(args.ticketNumber)
    },
    removeHistory: async (_, args) => {
      return waitlistModel.removeHistory(args.ticketNumbers)
    },
  },
}
