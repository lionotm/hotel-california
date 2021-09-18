import * as React from 'react'
import {
  httpGetWaitlist,
  httpAddCustomer,
  httpRemoveCustomer,
  httpGetHistory,
  httpRemoveHistory,
  httpGetMaxSlots,
} from './requests'

import { pink, lime, indigo, orange, teal } from '@material-ui/core/colors'
const avatarColors = [pink[500], lime[500], indigo[500], orange[500], teal[500]]

const WaitlistContext = React.createContext()
WaitlistContext.displayName = 'WaitlistContext'

function WaitlistProvider({ children }) {
  const [waitlist, setWaitlist] = React.useState([])
  const [maxSlots, setMaxSlots] = React.useState(25)
  const [history, setHistory] = React.useState([])

  const getMaxSlots = React.useCallback(async () => {
    const fetchedMaxSlots = await httpGetMaxSlots()
    setMaxSlots(fetchedMaxSlots)
  }, [])

  const getWaitlist = React.useCallback(async () => {
    const fetchedWaitlist = await httpGetWaitlist()
    setWaitlist(fetchedWaitlist)
  }, [])

  const addCustomer = React.useCallback(
    async (formData) => {
      await httpAddCustomer(formData)
      getWaitlist()
    },
    [getWaitlist]
  )

  const removeCustomer = React.useCallback(
    async (ticketNumber) => {
      await httpRemoveCustomer(ticketNumber)
      getWaitlist()
    },
    [getWaitlist]
  )

  const getHistory = React.useCallback(async () => {
    const fetchedHistory = await httpGetHistory()
    setHistory(fetchedHistory)
  }, [])

  const removeHistory = React.useCallback(
    async (ticketNumbers) => {
      await httpRemoveHistory(ticketNumbers)
      getHistory()
    },
    [getHistory]
  )

  React.useEffect(() => {
    getMaxSlots()
  }, [getMaxSlots])

  React.useEffect(() => {
    getWaitlist()
  }, [getWaitlist])

  React.useEffect(() => {
    getHistory()
  }, [getHistory, waitlist])

  const value = { maxSlots, waitlist, history, addCustomer, removeCustomer, removeHistory }

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
