import { gql } from '@apollo/client'

export const WAITLIST = gql`
  query getWaitlist {
    waitlist {
      firstName
      lastName
      notes
      contactNumber
      metaData {
        avatarColor
        startTime
        endTime
        ticketNumber
        deleted
      }
    }
  }
`
export const HISTORY = gql`
  query getHistory($isDeleted: Boolean) {
    history(isDeleted: $isDeleted) {
      firstName
      lastName
      notes
      contactNumber
      metaData {
        avatarColor
        startTime
        endTime
        ticketNumber
        deleted
      }
    }
  }
`

export const SAVE_CUSTOMER = gql`
  mutation saveCustomer($customerData: customerInput) {
    saveCustomer(customerData: $customerData) {
      firstName
      lastName
    }
  }
`

export const REMOVE_CUSTOMER = gql`
  mutation removeCustomer($ticketNumber: String) {
    removeCustomer(ticketNumber: $ticketNumber)
  }
`

export const REMOVE_HISTORY = gql`
  mutation removeHistory($ticketNumbers: [String]) {
    removeHistory(ticketNumbers: $ticketNumbers)
  }
`
