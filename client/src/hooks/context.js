import * as React from 'react'
import { useQuery, useMutation } from '@apollo/client'
import {
  WAITLIST,
  HISTORY,
  SAVE_CUSTOMER,
  REMOVE_CUSTOMER,
  REMOVE_HISTORY,
} from './graphql.queries'

import { pink, lime, indigo, orange, teal } from '@material-ui/core/colors'
const avatarColors = [pink[500], lime[500], indigo[500], orange[500], teal[500]]

const WaitlistContext = React.createContext()
WaitlistContext.displayName = 'WaitlistContext'

function WaitlistProvider({ children }) {
  const { data: waitlistData, refetch } = useQuery(WAITLIST)
  const { data: historyData } = useQuery(HISTORY)
  const [saveCustomer] = useMutation(SAVE_CUSTOMER, {
    refetchQueries: [WAITLIST, 'getWaitlist'],
  })
  const [deleteCustomer] = useMutation(REMOVE_CUSTOMER, {
    refetchQueries: [WAITLIST, 'getWaitlist', HISTORY, 'getHistory'],
  })
  const [deleteHistory] = useMutation(REMOVE_HISTORY, {
    refetchQueries: [HISTORY, 'getHistory'],
  })

  const waitlist = waitlistData?.waitlist || []
  const history = historyData?.history || []

  const addCustomer = React.useCallback(
    (formData) => {
      saveCustomer({
        variables: {
          customerData: formData,
        },
      })
      refetch()
    },
    [refetch, saveCustomer]
  )

  const removeCustomer = React.useCallback(
    async (ticketNumber) => {
      deleteCustomer({ variables: { ticketNumber: ticketNumber } })
    },
    [deleteCustomer]
  )

  const removeHistory = React.useCallback(
    async (ticketNumbers) => {
      deleteHistory({ variables: { ticketNumbers: ticketNumbers } })
    },
    [deleteHistory]
  )

  const value = { waitlist, history, addCustomer, removeCustomer, removeHistory }

  return <WaitlistContext.Provider value={value}>{children}</WaitlistContext.Provider>
}

function useWaitlist() {
  const context = React.useContext(WaitlistContext)
  if (!context) {
    throw new Error(`useWaitlist must be used within the WaitlistProvider`)
  }
  return context
}

export { WaitlistProvider, useWaitlist, avatarColors }
