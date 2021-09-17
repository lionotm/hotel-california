import * as React from 'react'
import clsx from 'clsx'
import { useWaitlist } from '../hooks/context'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 3),
  },
  button: {
    width: 150,
    padding: 10,
    marginTop: 10,
  },
  cancelBtn: {
    backgroundColor: 'white',
    border: '1px solid grey',
  },
}))

export default function DeleteCustomer({ ticketNumber }) {
  const classes = useStyles()
  const { removeCustomer } = useWaitlist()
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    console.log('deleted')
    removeCustomer(ticketNumber)
    setOpen(false)
  }

  const body = (
    <Paper className={classes.paper}>
      <Typography variant='h6' id='delete-customer-card' gutterBottom align='center'>
        Have you finished serving XX?
      </Typography>
      <Typography variant='body1' id='remove-customer-from-waitlist' gutterBottom align='center'>
        Time waited: XX mins
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Button
          className={clsx(classes.button, classes.cancelBtn)}
          variant='contained'
          size='large'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          className={classes.button}
          color='primary'
          variant='contained'
          size='large'
          onClick={handleDelete}
        >
          Done
        </Button>
      </div>
    </Paper>
  )
  console.log('rendered')
  return (
    <>
      <IconButton aria-label='delete' onClick={handleOpen}>
        <DeleteIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='delete-customer-card'
        aria-describedby='remove-customer-from-waitlist'
      >
        {body}
      </Modal>
    </>
  )
}
