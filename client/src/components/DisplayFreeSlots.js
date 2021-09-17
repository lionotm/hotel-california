import * as React from 'react'
import { useWaitlist } from '../hooks/context'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const statusColors = {
  lull: '#00897b',
  lessBusy: '#7cb342',
  busy: '#fdd835',
  veryBusy: '#fb8c00',
  maxed: '#e53935',
}

const useStyles = makeStyles((theme) => ({
  paper: {
    textAlign: 'center',
    backgroundColor: ({ status }) => {
      return statusColors[status]
    },
    height: 40,
    width: 40,
    lineHeight: '40px',
    fontSize: 25,
    fontWeight: 600,
  },
}))

const containerStyles = {
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',
}

const maxQueueLength = 25

export default function DisplayFreeSlots() {
  const { waitlist } = useWaitlist()
  const freeSlots = maxQueueLength - waitlist.length

  const status =
    freeSlots < 6
      ? 'maxed'
      : freeSlots < 11
      ? 'veryBusy'
      : freeSlots < 16
      ? 'busy'
      : freeSlots < 21
      ? 'lessBusy'
      : 'lull'
  const classes = useStyles({ status })

  return (
    <div style={containerStyles}>
      <Typography variant='h6' style={{ paddingRight: 15 }}>
        Free Slots
      </Typography>
      <Paper className={classes.paper}>{freeSlots}</Paper>
    </div>
  )
}
