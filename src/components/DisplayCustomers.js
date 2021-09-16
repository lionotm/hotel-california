import React from 'react'
import Masonry from 'react-masonry-css'
import CustomerCard from '../components/CustomerCard'
import Container from '@material-ui/core/Container'

export default function DisplayCustomers() {
  const waitlist = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

  const handleDelete = () => {}

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Container>
      <Masonry breakpointCols={breakpoints} className='my-masonry-grid' columnClassName='my-masonry-grid_column'>
        {waitlist.map((customer) => (
          <div key={customer.id}>
            <CustomerCard customer={customer} handleDelete={handleDelete} avatarColor={1} />
          </div>
        ))}
      </Masonry>
    </Container>
  )
}
