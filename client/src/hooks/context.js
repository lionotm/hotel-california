import * as React from 'react'
import { httpGetWaitlist } from './requests'

const WaitlistContext = React.createContext()
WaitlistContext.displayName = 'WaitlistContext'

function WaitlistProvider({ children }) {
  const [waitlist, setWaitlist] = React.useState([])

  const getWaitlist = React.useCallback(async () => {
    const fetchedWaitlist = await httpGetWaitlist()
    setWaitlist(fetchedWaitlist)
  }, [])

  React.useEffect(() => {
    getWaitlist()
  }, [getWaitlist])

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
