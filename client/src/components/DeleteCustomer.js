import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

export default function DeleteCustomer() {
  const handleDelete = () => {}

  return (
    <>
      <IconButton aria-label='delete' onClick={() => handleDelete}>
        <DeleteIcon />
      </IconButton>
    </>
  )
}
