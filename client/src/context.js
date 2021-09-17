import * as React from 'react'

const WaitlistContext = React.createContext()
WaitlistContext.displayName = 'WaitlistContext'

function WaitlistProvider({ children }) {
  const [waitlist, setWaitlist] = React.useState([
    {
      firstName: 'Jon',
      lastName: 'Snow',
      contactNumber: 123456789,
      startTime: 'Fri Sep 17 2021 00:00:00 GMT+0800',
      endTime: '',
      ticketNumber: 999999999,
      notes: 'Hi Snow',
      metaData: {
        avatarColor: 0,
      },
    },
    {
      firstName: 'Sponge',
      lastName: 'Bob',
      contactNumber: 987654321,
      startTime: 'Fri Sep 19 2021 00:00:00 GMT+0800',
      endTime: 'Fri Sep 19 2021 02:00:00 GMT+0800',
      ticketNumber: 1111111111,
      notes: 'Hi Bob',
      metaData: {
        avatarColor: 2,
      },
    },
  ])
  const value = [waitlist, setWaitlist]

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>
}

function useWaitlist() {
  const context = React.useContext(WaitlistContext)
  if (!context) {
    throw new Error(`useWaitlist must be used within the WaitlistProvider`)
  }
  return context
}

export { WaitlistProvider, useWaitlist }
