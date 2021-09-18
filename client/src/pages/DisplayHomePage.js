import * as React from 'react'
import { useWaitlist } from '../hooks/context'
import Search from '../components/Search'

import Typography from '@material-ui/core/Typography'
import DisplayCustomers from '../components/DisplayCustomers'

export default function DisplayHomePage() {
  const { waitlist } = useWaitlist()
  const [value, setValue] = React.useState('')
  const [filter, setFilter] = React.useState([])

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  React.useEffect(() => {
    setFilter(
      waitlist.filter((customer) => {
        const { firstName, lastName, contactNumber, notes } = customer
        const name = firstName + ' ' + lastName
        const filterValue = value.toLowerCase().trim()

        return (
          name?.toString().toLowerCase().includes(filterValue) ||
          contactNumber?.toString().toLowerCase().includes(filterValue) ||
          notes?.toString().toLowerCase().includes(filterValue)
        )
      })
    )
  }, [waitlist, value])

  const text =
    waitlist.length === 1
      ? `There is ${waitlist.length} customer in queue.`
      : `There are ${waitlist.length} customers in queue.`

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          paddingBottom: '10px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant='h4' style={{ marginRight: '15px' }}>
            Welcome!
          </Typography>
          <Typography variant='body1'>{text}</Typography>
        </div>
        <Search
          value={value}
          onChange={handleChange}
          placeholder='Search by Name, Contact Number or Notes'
        />
      </div>
      <DisplayCustomers waitlist={filter} style={{ paddingTop: '10px' }} />
    </div>
  )
}
