import React from 'react'
import Masonry from 'react-masonry-css'
import CustomerCard from '../components/CustomerCard'
import { useWaitlist } from '../context'

export default function DisplayCustomers() {
  const [waitlist] = useWaitlist()

  const handleDelete = () => {}

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return (
    <Masonry
      breakpointCols={breakpoints}
      className='my-masonry-grid'
      columnClassName='my-masonry-grid_column'
    >
      {waitlist.map((customer) => {
        const avatarColor = customer.metaData.avatarColor
        return (
          <div key={customer.ticketNumber}>
            <CustomerCard
              customer={customer}
              handleDelete={handleDelete}
              avatarColor={avatarColor}
            />
          </div>
        )
      })}
    </Masonry>
  )
}
