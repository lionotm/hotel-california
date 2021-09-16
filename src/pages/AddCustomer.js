import React from 'react'
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

export default function AddCustomer() {
  const classes = useStyles()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('submitted')
  }
  //todo: add error prop & helperText for validation
  return (
    <Container className={classes.container}>
      <Typography variant='h4' gutterBottom>
        Add a Customer to the Waitlist ⌛️
      </Typography>
      <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField id='firstName' label='First Name' variant='outlined' fullWidth required />
        <TextField id='lastName' label='Last Name' variant='outlined' fullWidth required />
        <TextField id='contact' label='Contact Number' variant='outlined' fullWidth required />
        <TextField id='notes' label='Notes' variant='outlined' multiline rows={4} fullWidth />

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
