import * as React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import DisplayCustomers from '../components/DisplayCustomers'
import { useWaitlist } from '../hooks/context'

export default function DisplayHomePage() {
  const { waitlist } = useWaitlist()

  return (
    <Container>
      <Container style={{ display: 'flex', alignItems: 'center', padding: 0 }}>
        <Typography variant='h5' gutterBottom style={{ marginRight: '15px' }}>
          Welcome!
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          There are {waitlist.length} customers in queue.
        </Typography>
      </Container>
      <DisplayCustomers />
    </Container>
  )
}
