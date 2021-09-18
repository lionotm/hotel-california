import * as React from 'react'
import { useWaitlist } from '../hooks/context'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  form: {
    padding: '0% 10%',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    fontSize: 20,
  },
}))

const initialForm = {
  firstName: '',
  lastName: '',
  contactNumber: '',
  notes: '',
  metaData: {
    avatarColor: '',
    startTime: '',
    endTime: '',
    ticketNumber: '',
  },
}

const initialFill = {
  firstName: false,
  lastName: false,
  contactNumber: false,
}

const generateAvatarColor = () => {
  // return a random integer from 0 - 4 for avatarColors array in CustomerCard.js
  return Math.floor(Math.random() * 5)
}

export default function AddCustomer() {
  const classes = useStyles()
  const { maxSlots, waitlist, addCustomer } = useWaitlist()
  const [formData, setFormData] = React.useState(initialForm)
  const [isFilled, setIsFilled] = React.useState(initialFill)
  const [error, setError] = React.useState(false)
  const [isNoSlots, setIsNoSlots] = React.useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (waitlist.length > maxSlots) {
      setIsNoSlots(true)
      setTimeout(() => {
        setIsNoSlots(false)
      }, 5000)
      return
    }

    const error = Object.values(isFilled).some((field) => field === false)
    if (error) {
      setError(error)
      return
    }

    formData.metaData.avatarColor = generateAvatarColor()
    addCustomer(formData)

    // re-initialise
    setFormData(initialForm)
    setIsFilled(initialFill)
    setError(false)
  }

  const handleChange = (e) => {
    const value = e.target.value
    switch (e.target.id) {
      case 'firstName':
        setFormData({ ...formData, firstName: value })
        setIsFilled({ ...isFilled, firstName: !!value })
        break

      case 'lastName':
        setFormData({ ...formData, lastName: value })
        setIsFilled({ ...isFilled, lastName: !!value })
        break

      case 'contact':
        setFormData({ ...formData, contactNumber: value })
        setIsFilled({ ...isFilled, contactNumber: !!value })
        break

      case 'notes':
        setFormData({ ...formData, notes: value })
        setIsFilled({ ...isFilled, notes: !!value })
        break

      default:
        break
    }
  }

  return (
    <Container className={classes.container}>
      <Typography variant='h4' gutterBottom>
        Add a Customer to the Waitlist ⌛️
      </Typography>
      {isNoSlots && (
        <Typography variant='body1' color='secondary'>
          There are no more free slots! Please attend to existing customers first.
        </Typography>
      )}
      <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
          id='firstName'
          label='First Name'
          variant='outlined'
          fullWidth
          required
          error={error && !isFilled.firstName}
          helperText={error && !isFilled.firstName && 'This field is required!'}
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          id='lastName'
          label='Last Name'
          variant='outlined'
          fullWidth
          required
          error={error && !isFilled.lastName}
          helperText={error && !isFilled.lastName && 'This field is required!'}
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextField
          id='contact'
          label='Contact Number'
          variant='outlined'
          fullWidth
          required
          error={error && !isFilled.contactNumber}
          helperText={error && !isFilled.contactNumber && 'This field is required!'}
          value={formData.contactNumber}
          onChange={handleChange}
        />
        <TextField
          id='notes'
          label='Notes'
          variant='outlined'
          multiline
          rows={4}
          fullWidth
          value={formData.notes}
          onChange={handleChange}
        />

        <Button
          className={classes.button}
          type='submit'
          color='primary'
          variant='contained'
          size='large'
          startIcon={<KeyboardArrowLeftIcon />}
          endIcon={<KeyboardArrowRightIcon />}
        >
          Add
        </Button>
      </form>
    </Container>
  )
}
