import React from 'react'
import clsx from 'clsx'
import DeleteCustomer from './DeleteCustomer'

import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Collapse from '@material-ui/core/Collapse'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { pink, lime, indigo, orange, teal, grey } from '@material-ui/core/colors'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ContactPhoneIcon from '@material-ui/icons/ContactPhone'
import NotesIcon from '@material-ui/icons/Notes'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
    '&:hover': {
      backgroundColor: grey[50],
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  expandText: {
    marginLeft: '68%',
  },
  avatar: {
    backgroundColor: (colors) => {
      return colors[Math.floor(Math.random() * colors.length)]
    },
  },
}))

function createData(key, value) {
  return { key, value }
}

const rows = [
  createData('Time Start', 159),
  createData('Time End', 237),
  createData('Waiting Time', 262),
  createData('Ticket no.', 305),
]

export default function RecipeReviewCard() {
  //Todo: assign a randomcolor during card creation and read from customer metadata
  const colors = [pink[500], lime[500], indigo[500], orange[500], teal[500]]
  const classes = useStyles(colors)
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card className={classes.root} elevation={1}>
      <CardHeader
        avatar={
          <Avatar aria-label='recipe' className={classes.avatar}>
            R
          </Avatar>
        }
        action={<DeleteCustomer />}
        title='ABC 123'
        subheader='Date'
      />
      <CardContent style={{ paddingBottom: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px' }}>
          <ContactPhoneIcon style={{ marginLeft: 7 }} />
          <Typography variant='body2' style={{ marginLeft: 24 }}>
            Phone Number
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NotesIcon style={{ marginLeft: 7 }} />
          <Typography variant='body2' style={{ marginLeft: 24 }}>
            Notes...
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant='body2' className={classes.expandText}>
          Details
        </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Metric</TableCell>
                  <TableCell align='right'>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component='th' scope='row'>
                      {row.key}
                    </TableCell>
                    <TableCell align='right'>{row.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Collapse>
    </Card>
  )
}
