import * as React from 'react'
import Masonry from 'react-masonry-css'
import CustomerCard from '../components/CustomerCard'

export default function DisplayCustomers({ waitlist }) {
  const handleDelete = () => {}

  const breakpoints = {
    default: 6,
    2500: 5,
    1900: 4,
    1500: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {waitlist?.map((customer) => {
        return (
          <div key={customer.metaData.ticketNumber}>
            <CustomerCard customer={customer} handleDelete={handleDelete} />
          </div>
        )
      })}
    </Masonry>
  )
}
