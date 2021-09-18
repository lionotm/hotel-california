import React from 'react'
import Search from '../components/Search'
import { useWaitlist, avatarColors } from '../hooks/context'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',

    backgroundColor: theme.palette.background.paper,
  },
  title: {
    alignSelf: 'center',
  },
  button: {
    height: 54,
    width: '100%',
    alignSelf: 'center',
    [theme.breakpoints.up('md')]: {
      width: '20%',
    },
  },
}))

export default function History() {
  const classes = useStyles()
  const [checked, setChecked] = React.useState([])
  const { history, removeHistory } = useWaitlist()
  const [value, setValue] = React.useState('')
  const [filter, setFilter] = React.useState([])

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleChange = (e) => {
    setValue(e.target.value)
  }

  const handleRemoveHistory = (e) => {
    if (checked.length === 0) return
    removeHistory(checked)
  }

  React.useEffect(() => {
    setFilter(
      history.filter((customer) => {
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
  }, [history, value])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingBottom: '10px',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant='h4' className={classes.title}>
          Waitlist History
        </Typography>
        <Search
          value={value}
          onChange={handleChange}
          placeholder='Search by Name, Contact Number or Notes'
        />
        <Button
          className={classes.button}
          color='secondary'
          variant='contained'
          size='large'
          onClick={handleRemoveHistory}
        >
          Delete
        </Button>
      </div>
      {filter.length > 0 && (
        <List dense className={classes.root}>
          {filter.map((customer) => {
            const { firstName, lastName, contactNumber, notes, metaData } = customer
            const { startTime, endTime, ticketNumber, avatarColor } = metaData
            const startDate = new Date(startTime)
            const endDate = new Date(endTime)
            const waitingTime = Math.round((endDate - startDate) / 1000 / 60)
            const labelId = `checkbox-list-label-${customer.metaData.ticketNumber}`
            return (
              <ListItem key={ticketNumber} button>
                <ListItemAvatar>
                  <Avatar
                    aria-label='customer'
                    style={{ backgroundColor: avatarColors[avatarColor] }}
                  >
                    {firstName.toString()[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  id={labelId}
                  primary={`${firstName} ${lastName} - Ticket no. ${ticketNumber} `}
                  secondary={`Waited: ${waitingTime} mins | Start: ${startDate.toLocaleString()} | End: ${endDate.toLocaleString()} | Contact Number: ${contactNumber} | Notes: ${
                    notes || '-'
                  }`}
                />
                <ListItemSecondaryAction>
                  <Checkbox
                    edge='end'
                    onChange={handleToggle(ticketNumber)}
                    checked={checked.indexOf(ticketNumber) !== -1}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      )}
    </>
  )
}
