import React from 'react'
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

export default function DisplayFreeSlots() {
  //todo: maybe change colors if free slots < 5 , < 10. < 15 ?
  return (
    <div style={containerStyles}>
      <Typography variant='h6' style={{ paddingRight: 15 }}>
        Free Slots
      </Typography>
      <Status>25</Status>
    </div>
  )
}
