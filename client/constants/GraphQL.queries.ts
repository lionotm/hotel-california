import { gql } from '@apollo/client'
export const SAVE_CUSTOMER = gql`
  mutation saveCustomer($customerData: customerInput) {
    saveCustomer(customerData: $customerData) {
      firstName
      lastName
    }
  }
`
