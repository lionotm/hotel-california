import * as React from 'react'
import { useWaitlist } from '../hooks/context'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { styled } from '@material-ui/core/styles'

const Status = styled(Paper)(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.secondary.main,
  height: 40,
  width: 40,
  lineHeight: '40px',
  fontSize: 25,
  fontWeight: 600,
}))

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
}

const maxQueueLength = 25

export default function DisplayFreeSlots() {
  const [waitlist] = useWaitlist()
  //todo: maybe change colors if free slots < 5 , < 10. < 15 ?
  return (
    <div style={containerStyles}>
      <Typography variant='h6' style={{ paddingRight: 15 }}>
        Free Slots
      </Typography>
      <Status>{maxQueueLength - waitlist.length}</Status>
    </div>
  )
}
