/* eslint-disable no-use-before-define */
import * as React from 'react'

import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    width: '100%',
    padding: '10px 0',
    [theme.breakpoints.up('sm')]: {
      width: '40%',
    },
  },
}))

export default function Search(props) {
  const classes = useStyles()
  return (
    <TextField
      className={classes.root}
      variant='outlined'
      margin='normal'
      placeholder='Search'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  )
}
